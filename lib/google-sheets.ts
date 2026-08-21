// Escritura en Google Sheets con una service account, sin dependencias
// externas (googleapis pesa mucho para un solo append). Firmamos un JWT
// RS256 con node:crypto, lo cambiamos por un access token OAuth y llamamos
// al endpoint REST de Sheets. Solo funciona en el runtime Node (no Edge),
// por eso el route handler declara `runtime = "nodejs"`.

import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

interface ServiceAccount {
  email: string;
  privateKey: string;
}

function getServiceAccount(): ServiceAccount {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // La private key en Vercel se guarda con los saltos de línea escapados
  // como "\n"; hay que restaurarlos para que crypto la acepte.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error(
      "Faltan GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_PRIVATE_KEY en el entorno.",
    );
  }
  return { email, privateKey };
}

// Cambia el JWT firmado por un access token OAuth de corta duración.
async function getAccessToken(nowSeconds: number): Promise<string> {
  const { email, privateKey } = getServiceAccount();

  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: nowSeconds,
    exp: nowSeconds + 3600,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(claims),
  )}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(privateKey);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Google OAuth falló (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google OAuth no devolvió access_token.");
  }
  return data.access_token;
}

/**
 * Agrega una fila al final de la pestaña indicada de una hoja de cálculo.
 * Los valores se escriben tal cual (valueInputOption RAW).
 *
 * @param values  Celdas de la fila, en orden de columna (A, B, C, ...).
 */
export async function appendSheetRow(values: (string | number)[]): Promise<void> {
  const spreadsheetId = process.env.ASOFOM_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta ASOFOM_SHEET_ID en el entorno.");
  }
  // Pestaña destino; por defecto "Registros". El rango A1 hace que la API
  // localice la tabla existente y agregue después de la última fila.
  const tab = process.env.ASOFOM_SHEET_TAB || "Registros";

  const nowSeconds = Math.floor(Date.now() / 1000);
  const accessToken = await getAccessToken(nowSeconds);

  const range = encodeURIComponent(`${tab}!A1`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}` +
    `/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Google Sheets append falló (${res.status}): ${detail}`);
  }
}

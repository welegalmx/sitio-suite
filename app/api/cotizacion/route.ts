import { appendSheetRow } from "@/lib/google-sheets";
import { MODULOS, VOLUMEN_MAX, VOLUMENES } from "@/lib/cotizacion";

// node:crypto (firma del JWT de la service account) solo existe en el
// runtime Node, no en Edge.
export const runtime = "nodejs";
// Nunca cachear: cada POST escribe una solicitud nueva.
export const dynamic = "force-dynamic";

type CotizacionBody = Record<string, unknown>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Vacío o ausente cuenta como 0. Devuelve null si no es un entero válido.
function cantidad(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return 0;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  if (!Number.isInteger(n) || n < 0 || n > VOLUMEN_MAX) return null;
  return n;
}

export async function POST(request: Request) {
  let body: CotizacionBody;
  try {
    body = (await request.json()) as CotizacionBody;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  // Trampa anti-spam: respondemos 200 para no darle pistas al bot, pero
  // no escribimos nada.
  if (clean(body.sitio_web)) {
    return Response.json({ ok: true });
  }

  const nombre = clean(body.nombre, 120);
  const correo = clean(body.correo, 160);
  // Aceptamos espacios/guiones al teclear, pero guardamos solo dígitos.
  const whatsapp = clean(body.whatsapp, 40).replace(/\D/g, "");
  const empresa = clean(body.empresa, 160);

  const faltantes: string[] = [];
  if (!nombre) faltantes.push("nombre");
  if (!correo) faltantes.push("correo");
  if (!whatsapp) faltantes.push("WhatsApp");
  if (!empresa) faltantes.push("empresa");
  if (faltantes.length > 0) {
    return Response.json(
      { error: `Faltan campos requeridos: ${faltantes.join(", ")}.` },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(correo)) {
    return Response.json(
      { error: "El correo no tiene un formato válido." },
      { status: 400 },
    );
  }
  if (whatsapp.length !== 10) {
    return Response.json(
      { error: "El WhatsApp debe tener 10 dígitos." },
      { status: 400 },
    );
  }

  const volumenes: number[] = [];
  for (const campo of VOLUMENES) {
    const n = cantidad(body[campo.name]);
    if (n === null) {
      return Response.json(
        { error: `"${campo.label}" debe ser un número entero entre 0 y ${VOLUMEN_MAX.toLocaleString("es-MX")}.` },
        { status: 400 },
      );
    }
    volumenes.push(n);
  }

  const modulos: string[] = [];
  for (const modulo of MODULOS) {
    const valor = body[modulo.name];
    if (valor !== "si" && valor !== "no") {
      return Response.json(
        { error: `Indica si quieres incluir ${modulo.label} en la propuesta.` },
        { status: 400 },
      );
    }
    modulos.push(valor === "si" ? "Sí" : "No");
  }

  // Columnas: ver COTIZACION_COLUMNAS en lib/cotizacion.ts.
  const fecha = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });

  try {
    await appendSheetRow(
      [fecha, nombre, correo, whatsapp, empresa, ...volumenes, ...modulos],
      {
        // Por defecto, una pestaña "Cotizaciones" en la misma hoja de ASOFOM.
        spreadsheetId: process.env.COTIZACION_SHEET_ID || process.env.ASOFOM_SHEET_ID,
        tab: process.env.COTIZACION_SHEET_TAB || "Cotizaciones",
      },
    );
  } catch (err) {
    console.error("[cotizacion] no se pudo guardar la solicitud:", err);
    return Response.json(
      { error: "No pudimos guardar tu solicitud. Intenta de nuevo." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

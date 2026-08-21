import { appendSheetRow } from "@/lib/google-sheets";

// node:crypto (firma del JWT de la service account) solo existe en el
// runtime Node, no en Edge.
export const runtime = "nodejs";
// Nunca cachear: cada POST escribe un registro nuevo.
export const dynamic = "force-dynamic";

interface RegistroBody {
  nombre?: string;
  empresa?: string;
  whatsapp?: string;
  correo?: string;
  necesidad?: string;
  // Honeypot: campo oculto que un humano nunca llena. Si viene con texto,
  // asumimos bot y descartamos en silencio.
  sitio_web?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: RegistroBody;
  try {
    body = (await request.json()) as RegistroBody;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  // Trampa anti-spam: respondemos 200 para no darle pistas al bot, pero
  // no escribimos nada.
  if (clean(body.sitio_web)) {
    return Response.json({ ok: true });
  }

  const nombre = clean(body.nombre, 120);
  const empresa = clean(body.empresa, 160);
  const whatsapp = clean(body.whatsapp, 40);
  const correo = clean(body.correo, 160);
  const necesidad = clean(body.necesidad, 1000);

  const faltantes: string[] = [];
  if (!nombre) faltantes.push("nombre");
  if (!empresa) faltantes.push("empresa");
  if (!whatsapp) faltantes.push("whatsapp");
  if (!correo) faltantes.push("correo");
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

  // Columnas de la hoja (ver header sugerido en README):
  // A Fecha | B Nombre | C Empresa/SOFOM | D WhatsApp | E Correo |
  // F Necesidad | G Origen
  const fecha = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });

  try {
    await appendSheetRow([
      fecha,
      nombre,
      empresa,
      whatsapp,
      correo,
      necesidad,
      "ASOFOM 20° Convención Nacional",
    ]);
  } catch (err) {
    console.error("[asofom] no se pudo guardar el registro:", err);
    return Response.json(
      { error: "No pudimos guardar tu registro. Intenta de nuevo." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

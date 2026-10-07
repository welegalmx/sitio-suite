// Definición única del formulario de cotización (/cotizacion). La usan el
// componente (para pintar los campos) y el route handler (para validar y
// armar la fila de la hoja). El orden de VOLUMENES/MODULOS es el del
// formulario; el de las columnas en la hoja va aparte (ORDEN_HOJA). Si
// agregas o mueves un campo, actualiza también el encabezado de la pestaña
// (ver COTIZACION_COLUMNAS).

export interface VolumenCampo {
  name: string;
  label: string;
  hint?: string;
}

// Cantidades mensuales. Todas opcionales: vacío cuenta como 0.
export const VOLUMENES: VolumenCampo[] = [
  { name: "documentos_corporativos", label: "Documentos corporativos", hint: "Actas, poderes, asambleas" },
  { name: "contratos", label: "Contratos", hint: "Elaboración y revisión" },
  { name: "litigios", label: "Litigios", hint: "Asuntos activos a seguir" },
  { name: "permisos_tramites", label: "Permisos y trámites", hint: "Licencias, avisos, renovaciones" },
  { name: "dictamenes_ia", label: "Dictámenes legales IA", hint: "Opiniones generadas con IA" },
  { name: "firmas", label: "Firmas electrónicas", hint: "Documentos enviados a firma" },
  { name: "biometricos", label: "Validación de biométricos", hint: "Por persona validada" },
];

// Perfil de la empresa. Las opciones son las de la pestaña "Inputs" del
// Pricing Model (Clasificación de clientes), que alimentan las listas
// desplegables de Tamaño e Industria en "Clientes". Si cambian allá,
// actualízalas aquí: la API rechaza cualquier valor fuera de estas listas.
export const TAMANOS: { value: string; detalle: string }[] = [
  { value: "Micro", detalle: "0 a 10" },
  { value: "Pequeña", detalle: "11 a 50" },
  { value: "Mediana", detalle: "51 a 250" },
  { value: "Grande", detalle: "Más de 250" },
];

export const INDUSTRIAS = [
  "Servicios financieros",
  "Inmobiliaria",
  "Manufactura",
  "Salud",
  "Retail",
  "Construcción",
  "Energía",
  "Logística y transporte",
  "Tecnologia",
  "Educación",
  "Agroindustria",
  "Aseguradoras",
  "Turismo y hotelería",
  "Servicios profesionales",
];

// Cantidades obligatorias del perfil (mínimo 1).
export const CUENTAS: VolumenCampo[] = [
  { name: "workspaces", label: "Workspaces", hint: "Uno por empresa o razón social" },
  { name: "usuarios", label: "Usuarios", hint: "Personas que usarán la plataforma" },
];

export interface ModuloCampo {
  name: string;
  label: string;
  descripcion: string;
}

// Módulos especiales: respuesta Sí / No obligatoria (marcados en Sí por defecto).
export const MODULOS: ModuloCampo[] = [
  { name: "flow", label: "Flow", descripcion: "Ciclo de vida del contrato" },
  { name: "docroom", label: "DocRoom", descripcion: "Comparación en rejilla" },
  { name: "norma", label: "Norma", descripcion: "Políticas corporativas" },
];

// Orden de los volúmenes en la hoja: el mismo de la pestaña "Clientes" del
// Pricing Model (K Dictamen legal IA … O Permisos y trámites, luego W Firmas
// y X KYC), para poder copiar el bloque de un solo pegado. Es independiente
// del orden en que se muestran en el formulario.
export const ORDEN_HOJA: { name: string; columna: string }[] = [
  { name: "dictamenes_ia", columna: "Dictamen legal IA" },
  { name: "documentos_corporativos", columna: "Documentos Corporativos" },
  { name: "litigios", columna: "Litigios" },
  { name: "contratos", columna: "Contratos" },
  { name: "permisos_tramites", columna: "Permisos y trámites" },
  { name: "firmas", columna: "Firmas" },
  { name: "biometricos", columna: "KYC" },
];

// Encabezado de la pestaña de la hoja (fila 1). Tamaño, Industria, Referido
// por y Usuarios siguen el orden de "Clientes" (E, F, G, J) y Usuarios queda
// pegado al bloque de volúmenes (K…O).
export const COTIZACION_COLUMNAS = [
  "Fecha",
  "Cliente",
  "Nombre",
  "Correo",
  "WhatsApp",
  "Tamaño",
  "Industria",
  "Referido por",
  ...CUENTAS.map((c) => c.label),
  ...ORDEN_HOJA.map((c) => c.columna),
  ...MODULOS.map((m) => m.label),
];

// Tope por campo: evita que un número absurdo rompa la calculadora.
export const VOLUMEN_MAX = 1_000_000;

// Copy centralizado del sitio de marketing de we.legal Suite.
// Fuente: welegal-contenido-sitio.md

export type BadgeColor = "red" | "amber" | "green";

export interface Badge {
  text: string;
  color: BadgeColor;
}

export interface MockupItem {
  label: string;
  detail: string;
  badge: Badge;
}

export interface Link {
  label: string;
  href: string;
}

// --- NAV ---------------------------------------------------------------

export const nav = {
  logo: "we.legal suite",
  links: [
    { label: "Módulos", href: "#modulos" },
    { label: "Abogado AI", href: "#abogado-ai" },
    { label: "Por qué we.legal", href: "#por-que-welegal" },
  ] satisfies Link[],
  cta: { label: "Agenda tu demo →", href: "#demo" } satisfies Link,
};

// --- HERO ----------------------------------------------------------------

export const hero = {
  headlineLines: ["La operación legal", "de tu empresa,", "toda en un solo lugar."],
  headlineHighlight: "un solo lugar",
  subtitle:
    "Contratos, documentos corporativos, equipo, litigios y un Abogado AI que conoce tu empresa por dentro. Sin carpetas dispersas. Sin vencimientos perdidos. Sin incertidumbre.",
  ctaPrimary: { label: "Agenda tu demo gratis →", href: "#demo" } satisfies Link,
  ctaSecondary: { label: "Ver la plataforma", href: "#modulos" } satisfies Link,
};

// --- 4 PILARES -------------------------------------------------------------

export const pillarsSection = {
  eyebrow: "Cómo funciona",
  headline: "La plataforma, en cuatro ideas",
};

export interface Pillar {
  id: string;
  title: string;
  copy: string;
}

export const pillars: Pillar[] = [
  {
    id: "ai-native",
    title: "AI Native",
    copy: "Tu empresa tiene información valiosa dispersa en contratos, expedientes y documentos. El Abogado AI de we.legal conoce todo tu workspace y la hace accesible al instante — sin buscar, sin depender de otra persona, desde el chat o desde WhatsApp.",
  },
  {
    id: "ocr-ai",
    title: "Extracción inteligente de documentos",
    copy: "Sube cualquier documento legal — contratos, actas, expedientes, permisos, leyes o reformas — y we.legal extrae la información relevante automáticamente. Tecnología OCR combinada con IA para que ningún dato quede atrapado en un PDF.",
  },
  {
    id: "firma-electronica",
    title: "Firma electrónica avanzada NOM-151",
    copy: "Firma integrada con DigiD México. Cumple NOM-151 con plena validez legal. Seguimiento por firmante en tiempo real — pendiente, firmado o rechazado — sin salir de la plataforma.",
  },
  {
    id: "alertas",
    title: "Cero vencimientos desapercibidos",
    copy: "Alertas automáticas por email con tiempos configurables y destinatarios específicos. Contratos, permisos, trámites y litigios con seguimiento activo para que tu equipo actúe antes, no después.",
  },
];

// --- MÓDULOS ---------------------------------------------------------------

export const modulesSection = {
  eyebrow: "La plataforma",
  headline: "Seis módulos core. Tres funcionalidades premium. Una sola plataforma.",
  subtitle: "Cada módulo habla con los demás. El Abogado AI los conoce a todos.",
};

export interface CoreModule {
  id: string;
  name: string;
  phrase: string;
  description: string;
  capabilities: string[];
  mockups: MockupItem[];
}

export const coreModules: CoreModule[] = [
  {
    id: "contratos",
    name: "Contratos",
    phrase:
      "Gestiona y analiza todos tus contratos con IA — del borrador a la firma, con control total del ciclo de vida.",
    description:
      "Creación, versionado, análisis con IA (score de riesgo 0–100, cláusulas faltantes, penas convencionales), firma electrónica NOM-151 y alertas automáticas de vencimiento.",
    capabilities: [
      "Análisis IA con score de riesgo 0–100",
      "Detección de cláusulas faltantes y penas convencionales",
      "Versionado con historial completo de cambios",
      "Firma electrónica avanzada NOM-151 integrada",
      "Alertas automáticas de vencimiento por email",
      "Expedientes de contrapartes con KYC",
      "Renovación automática configurable",
    ],
    mockups: [
      {
        label: "Arrendamiento Oficinas Polanco",
        detail: "Inmobiliaria Norte SA · Vence 15 sep",
        badge: { text: "3 días", color: "red" },
      },
      {
        label: "Servicio de Mantenimiento",
        detail: "Ing. Torres · Vence 02 oct",
        badge: { text: "12 días", color: "amber" },
      },
      {
        label: "NDA Proveedor Gamma",
        detail: "Score riesgo 62/100",
        badge: { text: "28 días", color: "green" },
      },
    ],
  },
  {
    id: "documentos-corporativos",
    name: "Documentos corporativos",
    phrase: "Toda la estructura legal de tu empresa, siempre accesible.",
    description:
      "Razón social, RFC, objeto social, capital social, accionistas con porcentajes, consejo de administración, comisarios, representantes legales, poderes notariales y actas de asamblea. Todo en un solo lugar, sin depender del despacho externo.",
    capabilities: [
      "Estructura accionaria con porcentajes y series",
      "Consejo de administración y comisarios",
      "Poderes notariales y representantes legales",
      "Actas de asamblea ordinarias y extraordinarias",
      "Estatutos y reformas corporativas",
      "Cumplimiento LGSM",
    ],
    mockups: [
      {
        label: "Acta Asamblea Extraordinaria",
        detail: "Aumento de capital · 12 mar 2026",
        badge: { text: "Protocolizada", color: "green" },
      },
      {
        label: "Poder Notarial — Dir. General",
        detail: "Poder amplio de administración",
        badge: { text: "Vigente", color: "green" },
      },
      {
        label: "Reforma de Estatutos",
        detail: "Pendiente de protocolización",
        badge: { text: "Pendiente", color: "amber" },
      },
    ],
  },
  {
    id: "equipo-rrhh",
    name: "Equipo / RRHH",
    phrase: "Toda la información laboral de tu equipo, accesible y completa.",
    description:
      "Expediente digital completo de cada empleado — datos personales, laborales y de nómina. Portal del empleado con acceso a sus documentos y solicitudes. Importación masiva desde Excel.",
    capabilities: [
      "CURP, RFC, NSS, datos de contacto y beneficiarios",
      "Puesto, departamento, fecha de ingreso, tipo de contrato",
      "Salario, SBC, CLABE, banco y prestaciones",
      "Portal del empleado con centro de solicitudes",
      "Importación masiva desde Excel",
      "Cumplimiento LFT e IMSS",
    ],
    mockups: [
      {
        label: "García López, Mariana",
        detail: "Gerente Legal · RFC faltante",
        badge: { text: "Incompleto", color: "red" },
      },
      {
        label: "Torres Ruiz, Carlos",
        detail: "Analista Corporativo · Expediente completo",
        badge: { text: "Completo", color: "green" },
      },
      {
        label: "Sánchez Vega, Ana",
        detail: "Dir. Contratos · NSS por validar",
        badge: { text: "En revisión", color: "amber" },
      },
    ],
  },
  {
    id: "permisos-tramites",
    name: "Permisos y Trámites",
    phrase: "Ningún permiso vence sin que lo sepas.",
    description:
      "Gestión de expedientes ante autoridades federales y locales. Seguimiento por etapas, alertas automáticas de vencimiento y archivo completo de documentos del expediente.",
    capabilities: [
      "SEMARNAT, STPS, SAT, Protección Civil, COFEPRIS y más",
      "Seguimiento por etapas del trámite",
      "Alertas automáticas de vencimiento configurables",
      "Archivo de documentos por expediente",
      "Historial completo de actualizaciones",
    ],
    mockups: [
      {
        label: "Licencia Ambiental SEMARNAT",
        detail: "Vence 30 jul 2026",
        badge: { text: "Vencido", color: "red" },
      },
      {
        label: "Registro STPS — Capacitación",
        detail: "Vence 15 oct 2026",
        badge: { text: "45 días", color: "amber" },
      },
      {
        label: "Opinión de Cumplimiento SAT",
        detail: "Emitida 01 jul 2026",
        badge: { text: "Positiva", color: "green" },
      },
    ],
  },
  {
    id: "litigios",
    name: "Litigios",
    phrase: "Todos tus procedimientos legales activos, con visibilidad ejecutiva.",
    description:
      "Gestión de procedimientos judiciales y extrajudiciales. Actos procesales, cuantía reclamada, provisión contable y evaluación de riesgo. Para que la dirección sepa en todo momento cuál es la exposición legal de la empresa.",
    capabilities: [
      "Procedimientos judiciales y extrajudiciales",
      "Registro de actos procesales y fechas críticas",
      "Cuantía reclamada y provisión contable",
      "Evaluación de riesgo por expediente",
      "Visibilidad ejecutiva de la exposición total",
    ],
    mockups: [
      {
        label: "Juicio Laboral — Ex Empleado",
        detail: "$180,000 MXN · Riesgo alto",
        badge: { text: "Audiencia 22 ago", color: "red" },
      },
      {
        label: "Controversia Mercantil",
        detail: "$520,000 MXN · Riesgo medio",
        badge: { text: "En curso", color: "amber" },
      },
    ],
  },
  {
    id: "firma-electronica",
    name: "Firma electrónica",
    phrase: "Firma con validez legal desde la plataforma, sin salir de ella.",
    description:
      "Integración con DigiD México. Firma electrónica avanzada con plena validez legal en México bajo NOM-151. Seguimiento por firmante en tiempo real, integrada en el flujo de contratos.",
    capabilities: [
      "Firma electrónica avanzada — DigiD México",
      "Cumplimiento NOM-151",
      "Tracking por firmante: pendiente / firmado / rechazado",
      "Integrada en el flujo de contratos",
      "Notificación automática al completarse",
    ],
    mockups: [],
  },
];

export interface PremiumModule {
  id: string;
  name: string;
  phrase: string;
  description: string;
  capabilities: string[];
  note?: string;
}

export const premiumModules: PremiumModule[] = [
  {
    id: "abogado-ai",
    name: "Abogado AI",
    phrase: "Tu información legal, siempre accesible.",
    description:
      "Consulta contratos, expedientes, documentos y trámites de tu empresa al instante, sin buscar ni depender de nadie. Disponible en la plataforma y por WhatsApp. Sube cualquier documento legal externo — una ley, una reforma, un contrato de contraparte — y consúltalo en el contexto de tu operación. DocRoom: compara múltiples documentos legales en minutos con un solo prompt. Ideal para revisar versiones de contratos, comparar propuestas o analizar cambios en normativas.",
    capabilities: [
      "Acceso a todos los módulos del workspace",
      "Consultas en lenguaje natural sobre contratos, empleados y trámites",
      "Disponible en plataforma web y WhatsApp",
      "DocRoom: comparación de múltiples documentos con IA",
      "Subida de documentos externos para consulta (leyes, reformas, contratos)",
      "Entiende el marco legal mexicano (LFT, LGSM, LFPDPPP, NOM-151)",
    ],
    note: "El Abogado AI es una herramienta de acceso a información. No constituye asesoría legal.",
  },
  {
    id: "formatos",
    name: "Formatos y Plantillas",
    phrase:
      "Plantillas inteligentes que se llenan solas con la información de tu empresa. Del formato en blanco al documento listo, en un clic.",
    description:
      "Editor de plantillas .docx con variables dinámicas vinculadas a datos reales del sistema. Genera contratos, cartas, constancias y convenios con los datos del empleado, empresa o contraparte de forma automática.",
    capabilities: [
      "Editor de plantillas .docx con variables dinámicas",
      "Variables vinculadas a datos reales de empleados, empresa y contratos",
      "Generación de documentos en un clic",
      "Compartir plantillas como formulario público",
      "Firma electrónica integrada al flujo",
    ],
  },
  {
    id: "reportes",
    name: "Reportes",
    phrase: "Genera reportes ejecutivos de tu operación legal con un solo clic.",
    description:
      "Reportes generados con IA sobre el estado completo de la operación legal de la empresa. Para directores que necesitan visión ejecutiva sin revisar expediente por expediente.",
    capabilities: [
      "Reporte de portafolio de contratos (por status, riesgo y vencimiento)",
      "Reporte de equipo activo y expedientes",
      "Reporte de estructura corporativa",
      "Reporte de permisos y trámites vigentes",
      "Reporte de exposición en litigios",
      "Reporte ejecutivo consolidado de toda la empresa",
    ],
  },
];

// --- PERFILES DE USUARIO ----------------------------------------------------

export const profilesSection = {
  headline: "Hecho para los que operan lo legal de una empresa.",
};

export interface Profile {
  id: string;
  role: string;
  name: string;
  companyContext: string;
  painPoints: string[];
  copyLines: string[];
  benefits: string[];
}

export const profiles: Profile[] = [
  {
    id: "director-legal",
    role: "Director Legal / General Counsel",
    name: "Ana, Directora Legal",
    companyContext: "100–500 empleados, industria manufactura o servicios profesionales",
    painPoints: [
      "Su equipo pierde tiempo en tareas operativas (buscar documentos, actualizar expedientes, recordar vencimientos) en lugar de trabajo estratégico",
      "No tiene visibilidad del estado legal de la empresa en tiempo real sin revisar múltiples herramientas",
      "Los vencimientos y penalidades se escapan porque el seguimiento depende de personas, no de sistemas",
    ],
    copyLines: [
      "Tu equipo legal es estratégico.",
      "we.legal se encarga de lo operativo.",
      "",
      "Contratos analizados, vencimientos monitoreados, expedientes actualizados. Para que tu equipo se enfoque en lo que importa.",
    ],
    benefits: [
      "Dashboard con el estado legal de toda la empresa en tiempo real",
      "Alertas automáticas que no dependen de que alguien recuerde",
      "Abogado AI que responde las consultas operativas del día a día",
      "Visibilidad de litigios con exposición económica consolidada",
      "Acceso a documentos corporativos sin depender del despacho externo",
    ],
  },
  {
    id: "socio-despacho",
    role: "Socio de Despacho Corporativo",
    name: "Roberto, Socio fundador",
    companyContext: "8–25 abogados, gestiona 15–30 clientes corporativos",
    painPoints: [
      "Gestionar expedientes de múltiples clientes desde herramientas desconectadas y carpetas dispares",
      "Tiempo excesivo en tareas repetitivas: generar documentos, actualizar expedientes, dar seguimiento manual",
      "Dificultad para diferenciarse de otros despachos en un mercado cada vez más tecnológico",
    ],
    copyLines: [
      "Gestiona todos tus clientes desde una sola plataforma.",
      "Diferénciate con tecnología.",
      "",
      "we.legal es multitenant: cada cliente tiene su propio workspace, con su información, sus documentos y su Abogado AI. Tú tienes visibilidad de todos desde un solo acceso.",
    ],
    benefits: [
      "Plataforma multitenant: un workspace independiente por cliente",
      "Permisos configurables: tú decides qué ve cada miembro del equipo y del cliente",
      "Generación de documentos con Formatos en segundos, no en horas",
      "Abogado AI que conoce los datos específicos de cada cliente",
      "Posicionamiento tecnológico frente a despachos tradicionales",
    ],
  },
];

// --- COMPARATIVA -------------------------------------------------------------

export type Coverage = "full" | "partial" | "none";

export interface ComparisonRow {
  capability: string;
  values: [Coverage, Coverage, Coverage, Coverage];
}

export const comparison = {
  eyebrow: "Comparativa",
  headline: "we.legal hace lo que las demás herramientas no pueden solas.",
  subtitle: "Porque el problema no es un módulo. Es que todo tiene que funcionar junto.",
  columns: [
    "Soluciones de contratos",
    "Solo firma electrónica",
    "Suite genérica",
    "we.legal suite",
  ],
  rows: [
    { capability: "Contratos con análisis IA", values: ["partial", "none", "none", "full"] },
    { capability: "OCR + extracción de documentos", values: ["none", "none", "none", "full"] },
    { capability: "RRHH legal integrado", values: ["none", "none", "partial", "full"] },
    { capability: "Litigios con visibilidad ejecutiva", values: ["none", "none", "none", "full"] },
    { capability: "Documentos corporativos", values: ["none", "none", "partial", "full"] },
    { capability: "Firma NOM-151 incluida", values: ["none", "full", "none", "full"] },
    { capability: "Alertas automáticas configurables", values: ["partial", "none", "none", "full"] },
    { capability: "Hecho para el marco legal mexicano", values: ["partial", "partial", "none", "full"] },
    { capability: "Plataforma multitenant", values: ["none", "none", "none", "full"] },
    { capability: "Todo integrado en un solo lugar", values: ["none", "none", "none", "full"] },
  ] as ComparisonRow[],
  legend: {
    full: "✓ Completo",
    partial: "~ Parcial",
    none: "✗ No disponible",
  },
};

// --- DEMO --------------------------------------------------------------------

export interface DemoHighlight {
  emoji: string;
  text: string;
}

export const demo = {
  eyebrow: "Agenda tu demo",
  headline: "30 minutos que cambian cómo opera tu empresa legalmente.",
  headlineHighlight: "legalmente.",
  subtitle: "Te mostramos la plataforma con datos reales. Sin presentaciones genéricas. Sin compromiso.",
  highlights: [
    {
      emoji: "📋",
      text: "Tu flujo de contratos completo — desde la creación hasta la firma electrónica NOM-151, con análisis IA en tiempo real",
    },
    {
      emoji: "🤖",
      text: "El Abogado AI en acción — consultas sobre contratos, empleados y trámites. También vía WhatsApp",
    },
    {
      emoji: "🏛️",
      text: "Estructura corporativa y RRHH — documentos corporativos, expedientes de empleados y permisos ante autoridades",
    },
    {
      emoji: "📊",
      text: "Dashboard ejecutivo y reportes — el estado legal de tu empresa de un vistazo, generado con IA",
    },
  ] as DemoHighlight[],
  guarantees: [
    "Demo personalizada para tu industria y perfil",
    "30 minutos, sin pérdida de tiempo",
    "Sin presión de venta ni contratos obligatorios",
    "Confirmación en menos de 2 horas hábiles",
  ],
  calendly: {
    // Reemplazar YOUR_CALENDLY_URL con la URL real del evento de demo.
    url: "https://calendly.com/YOUR_CALENDLY_URL",
    primaryColor: "2ECFB1",
    backgroundColor: "f4f8ff",
    textColor: "0a0f1e",
    fallbackEmail: "demo@welegal.mx",
  },
};

// --- FOOTER --------------------------------------------------------------------

export interface FooterColumn {
  title: string;
  links: Link[];
}

export const footer = {
  tagline:
    "La operación legal de tu empresa, toda en un solo lugar. Hecho en México para el mercado latinoamericano.",
  columns: [
    {
      title: "Módulos",
      links: [
        { label: "Contratos", href: "#modulos" },
        { label: "Documentos corporativos", href: "#modulos" },
        { label: "Equipo / RRHH", href: "#modulos" },
        { label: "Permisos y Trámites", href: "#modulos" },
        { label: "Litigios", href: "#modulos" },
        { label: "Firma electrónica", href: "#modulos" },
        { label: "Abogado AI", href: "#abogado-ai" },
        { label: "Reportes", href: "#modulos" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Nosotros", href: "#" },
        { label: "Blog legal", href: "#" },
        { label: "Casos de éxito", href: "#" },
        { label: "Agenda tu demo", href: "#demo" },
        { label: "Contacto", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Términos de servicio", href: "#" },
        { label: "Aviso de privacidad", href: "#" },
        { label: "Política de datos", href: "#" },
        { label: "NOM-151", href: "#" },
        { label: "LFPDPPP", href: "#" },
      ],
    },
  ] as FooterColumn[],
  credit: "© 2026 we.legal Suite · 🇲🇽 Hecho en México · suite.welegal.mx",
};

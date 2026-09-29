// Copy y ejemplos de la actualización de producto. Los ejemplos son ilustrativos.
export const capabilities = {
  eyebrow: "Capacidades especializadas",
  headline: "De los documentos a las decisiones.",
  subtitle:
    "Amplía tu operación con módulos que conectan revisión, políticas y procesos. Se activan según las necesidades de tu equipo.",
  items: [
    {
      id: "flow",
      name: "Flow",
      title: "Cada contrato, con un camino claro.",
      description:
        "Convierte una solicitud en un proceso con análisis de contexto, responsables, revisiones y aprobaciones hasta la firma.",
      detail: "Tu equipo redacta y decide. Flow coordina el proceso.",
      steps: ["Solicitud", "Análisis", "Revisión", "Aprobación", "Firma"],
    },
    {
      id: "norma",
      name: "Norma",
      title: "Tus políticas, presentes en cada revisión.",
      description:
        "Compara contratos con las políticas de tu empresa. Identifica desviaciones y consulta la evidencia para decidir qué ajustar.",
      detail: "Hallazgos con criticidad, citas y seguimiento.",
      example: {
        label: "Plazo de pago",
        actual: "El contrato propone 90 días.",
        expected: "La política establece un máximo de 60 días.",
        status: "Requiere revisión",
      },
    },
    {
      id: "docroom",
      name: "DocRoom",
      title: "Muchos documentos. Una misma vista.",
      description:
        "Revisa documentos en una matriz: una fila por documento y una columna por cada dato que importa. Consulta y exporta los resultados.",
      detail: "Exportación a Excel, Word y PDF.",
      columns: ["Documento", "Vigencia", "Renovación"],
      rows: [
        ["Contrato A", "12 meses", "Automática"],
        ["Contrato B", "24 meses", "Por acuerdo"],
      ],
    },
  ],
};

export const includedTools = {
  headline: "Inteligencia para el trabajo de todos los días.",
  subtitle:
    "Abogado IA, Formatos y Reportes forman parte de la base de la suite. Su uso depende de los límites de tu suscripción.",
  items: [
    {
      name: "Abogado IA",
      description:
        "Consulta la información de tu espacio de trabajo en lenguaje natural, desde la web o WhatsApp.",
    },
    {
      name: "Formatos y plantillas",
      description:
        "Genera documentos con plantillas .docx y los datos de tu empresa, empleados y contrapartes.",
    },
    {
      name: "Reportes",
      description:
        "Reúne la información de tu operación en reportes para revisar contratos, equipo y exposición legal.",
    },
  ],
};

export const integrations = {
  eyebrow: "Conectado a tu trabajo",
  headline: "En las herramientas que ya usas.",
  whatsapp: {
    name: "WhatsApp",
    title: "Tu operación legal, a una conversación.",
    description:
      "Consulta información de contratos, documentos y vencimientos sin abrir la plataforma.",
    question: "¿Qué contratos requieren mi atención?",
    answer:
      "Hay 2 contratos por vencer este mes: Arrendamiento Polanco y Servicio de Mantenimiento.",
  },
  word: {
    name: "Microsoft Word",
    title: "Revisa y ajusta sin salir de Word.",
    description:
      "Consulta datos de la suite, compara con políticas de Norma y verifica el documento contra una solicitud de Flow. Aplica propuestas con control de cambios.",
    bullets: [
      "Contexto de tu empresa al redactar",
      "Propuestas que puedes aceptar o rechazar",
      "Registro del documento en la suite",
    ],
    note: "Activación con tu administrador de Microsoft 365. Las funciones dependen de los módulos contratados.",
  },
  note: "El Abogado IA es una herramienta de acceso a información. No constituye asesoría legal.",
};

export const audiences = [
  {
    name: "Empresas",
    title: "Visibilidad para decidir. Orden para operar.",
    description:
      "Conecta al equipo legal con la información y los pendientes de toda la empresa.",
    benefits: [
      "Contratos, documentos y vencimientos en un solo lugar",
      "Seguimiento de responsables y aprobaciones",
      "Información ejecutiva sobre riesgos y pendientes",
    ],
  },
  {
    name: "Despachos",
    title: "Cada cliente, con su propio espacio.",
    description:
      "Organiza la operación de múltiples clientes desde un mismo acceso, con información y permisos separados.",
    benefits: [
      "Un espacio de trabajo independiente por cliente",
      "Permisos para tu equipo y tus clientes",
      "Plantillas y consultas con el contexto de cada empresa",
    ],
  },
];

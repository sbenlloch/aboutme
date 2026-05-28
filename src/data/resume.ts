import { profile } from "./profile";

export const skills = [
  {
    group: "Assessment",
    items: ["Manual assessments", "Vulnerability analysis", "Source code audits", "Threat modeling"]
  },
  {
    group: "Reverse Engineering",
    items: ["Executable triage", "ARM/x86", "Firmware analysis", "PoC development"]
  },
  {
    group: "Cryptography",
    items: ["Applied cryptography", "Protocol review", "Post-quantum cryptography", "Secure implementations"]
  },
  {
    group: "AI Security",
    items: ["Threat modeling", "Misuse analysis", "Secure ML pipelines", "Adversarial review"]
  },
  {
    group: "Privacy Tech",
    items: ["Homomorphic encryption", "TEEs", "Differential privacy", "MPC"]
  },
  {
    group: "Engineering",
    items: ["Python", "Go", "C", "Java", "Bash", "Linux", "Automation"]
  }
];

export const experience = [
  {
    role: "Security Researcher",
    company: "ITI - Instituto Tecnologico de Informatica",
    location: "Valencia, Spain (Hybrid)",
    period: "June 2023 - Present",
    points: [
      "Work on security research and security engineering tasks with practical assessment and delivery constraints.",
      "Focus areas include PETs, cryptography, AI security, DevSecOps and mitigation work that engineering teams can implement.",
      "Operate across research, prototyping, review and technical communication depending on the problem surface."
    ]
  },
  {
    role: "Offensive Security Researcher",
    company: "Cyber Intelligence S.L.",
    location: "Valencia, Spain",
    period: "December 2021 - January 2023",
    points: [
      "Worked in security research using Python and Bash with a strong practical bias.",
      "Reviewed binaries and low-level artifacts as part of security assessment work.",
      "Built and adapted internal tooling to speed up repetitive analyst workflows."
    ]
  }
];

export const education = [
  {
    title: "CRIPTOGRAFIA MATEMATICAMENTE DEMOSTRABLE",
    school: "Universitat Politecnica de Valencia (UPV)",
    period: "Issued April 2026",
    detail:
      "Credential ID FCP1SYW4LJL. Public LinkedIn certification entry for mathematically demonstrable cryptography."
  },
  {
    title: "Master's in Cybersecurity and Cyberintelligence (MUCC)",
    school: "Universitat Politecnica de Valencia (UPV)",
    period: "September 2021 - June 2023",
    detail:
      "Focused on protecting information and communication systems through vulnerability analysis, secure development and threat intelligence generation."
  },
  {
    title: "Bachelor's in Computer Engineering",
    school: "Universitat Politecnica de Valencia (UPV)",
    period: "2017 - 2021",
    detail: "Focused on software engineering, system architecture and low-level programming foundations."
  }
];

export const languages = [
  { name: "Spanish", level: "Native or bilingual proficiency" },
  { name: "Catalan", level: "Native or bilingual proficiency" },
  { name: "English", level: "Full professional proficiency" }
];

export const highlights = [
  "Builds scripts and tools to automate repetitive security assessment workflows.",
  "Applies ML techniques including CNNs and Transformers to anomaly detection, security analytics and AI security reviews.",
  "Connects academic work on binary optimization, executable-file intelligence and secure IoT architecture.",
  "Writes findings so engineering and decision makers can act on them.",
  "Works well in research and product contexts where the problem is not fully defined yet."
];

export const publications = [
  {
    title: "Threat Modeling for Enhancing Security of IoT Audio Classification Devices",
    venue: "arXiv / Computing Conference 2026",
    year: 2025,
    description:
      "Threat modeling and security architecture for microphone-equipped IoT nodes using remote attestation, mutually authenticated TLS, post-quantum resilience and secure update handling.",
    tags: ["iot-security", "threat-modeling", "post-quantum"],
    link: "https://arxiv.org/abs/2509.14657"
  },
  {
    title: "Master's thesis: binary file intelligence",
    venue: "RIUNET / UPV Master's thesis",
    year: 2023,
    description:
      "Automated binary characterization and machine-learning modeling for executable files, framed as a cyberintelligence support layer rather than a replacement for manual analysis.",
    tags: ["binary-analysis", "machine-learning", "cyberintelligence"],
    link: "https://riunet.upv.es/entities/publication/02c1368b-5aef-45df-8532-309e605a8535"
  },
  {
    title: "Binary multi-objective design-space exploration",
    venue: "RIUNET / UPV Bachelor's thesis",
    year: 2021,
    description:
      "Design-space exploration for GCC compilation flags to balance executable size, execution time, CPU and memory use and binary robustness.",
    tags: ["gcc", "optimization", "binary-robustness"],
    link: "https://riunet.upv.es/entities/publication/4e6a5709-ca0e-4c5e-8f04-2386af404e0e"
  }
];

export const resumeCopy = {
  en: {
    role: profile.role,
    summary: profile.summary,
    skills,
    experience,
    education,
    languages,
    highlights,
    publications
  },
  es: {
    role: "Ingeniero de seguridad en I+D",
    summary:
      "Ingeniero informatico especializado en Ingenieria de Computadores. Trabajo como R&D Security Engineer con una parte claramente practica: evaluaciones manuales, reversing, seguridad hardware, criptografia, seguridad en IA y mitigaciones que los equipos puedan aplicar.",
    skills: [
      {
        group: "Assessment",
        items: ["Evaluaciones manuales", "Analisis de vulnerabilidades", "Auditorias de codigo", "Modelado de amenazas"]
      },
      {
        group: "Reverse Engineering",
        items: ["Triage de ejecutables", "ARM/x86", "Analisis de firmware", "Desarrollo de PoC"]
      },
      {
        group: "Criptografia",
        items: ["Criptografia aplicada", "Revision de protocolos", "Criptografia post-cuantica", "Implementaciones seguras"]
      },
      {
        group: "Seguridad en IA",
        items: ["Threat modeling", "Analisis de abuso", "Pipelines ML seguros", "Revision adversarial"]
      },
      {
        group: "Tecnologias de privacidad",
        items: ["Cifrado homomorfico", "TEEs", "Privacidad diferencial", "MPC"]
      },
      {
        group: "Ingenieria",
        items: ["Python", "Go", "C", "Java", "Bash", "Linux", "Automatizacion"]
      }
    ],
    experience: [
      {
        role: "R&D Security Engineer",
        company: "ITI - Instituto Tecnologico de Informatica",
        location: "Valencia, Spain (Hybrid)",
        period: "Junio 2023 - Actualidad",
        points: [
          "Trabajo en investigacion en seguridad e ingenieria de seguridad con restricciones reales de entrega.",
          "Me muevo entre PETs, criptografia, seguridad en IA, DevSecOps y mitigaciones aplicables para equipos de ingenieria.",
          "Combino investigacion, prototipado, revision y comunicacion tecnica segun lo que pida el problema."
        ]
      },
      {
        role: "Offensive Security Researcher",
        company: "Cyber Intelligence S.L.",
        location: "Valencia, Spain",
        period: "Diciembre 2021 - Enero 2023",
        points: [
          "Trabaje en investigacion en seguridad usando Python y Bash con un sesgo muy practico.",
          "Revise binarios y artefactos de bajo nivel como parte de trabajos de evaluacion.",
          "Construi y adapte tooling interno para acelerar flujos repetitivos de analista."
        ]
      }
    ],
    education: [
      {
        title: "CRIPTOGRAFIA MATEMATICAMENTE DEMOSTRABLE",
        school: "Universitat Politecnica de Valencia (UPV)",
        period: "Expedicion: abril 2026",
        detail:
          "ID de credencial FCP1SYW4LJL. Certificacion publica en LinkedIn sobre criptografia matematicamente demostrable."
      },
      {
        title: "Master en Ciberseguridad y Ciberinteligencia (MUCC)",
        school: "Universitat Politecnica de Valencia (UPV)",
        period: "Septiembre 2021 - Junio 2023",
        detail:
          "Formacion orientada a proteger sistemas de informacion y comunicacion mediante analisis de vulnerabilidades, desarrollo seguro y generacion de inteligencia de amenazas."
      },
      {
        title: "Grado en Ingenieria Informatica, especialidad Ingenieria de Computadores",
        school: "Universitat Politecnica de Valencia (UPV)",
        period: "2017 - 2021",
        detail: "Base en fundamentos de informatica, ingenieria del software, arquitectura de sistemas y programacion de bajo nivel."
      }
    ],
    languages: [
      { name: "Espanol", level: "Competencia bilingue o nativa" },
      { name: "Catalan", level: "Competencia bilingue o nativa" },
      { name: "Ingles", level: "Competencia profesional completa" }
    ],
    highlights: [
      "Construyo scripts y herramientas para automatizar flujos repetitivos de evaluacion de seguridad.",
      "Aplico tecnicas de ML, incluyendo CNNs y Transformers, a deteccion de anomalias, analitica de seguridad y revisiones de seguridad en IA.",
      "Conecto trabajos academicos sobre optimizacion binaria, inteligencia de ejecutables y arquitectura segura para IoT.",
      "Escribo hallazgos pensados para que ingenieria y negocio puedan decidir con contexto.",
      "Trabajo bien en investigacion y producto cuando el problema aun no esta completamente cerrado."
    ],
    publications: [
      {
        title: "Threat Modeling for Enhancing Security of IoT Audio Classification Devices",
        venue: "arXiv / Computing Conference 2026",
        year: 2025,
        description:
          "Arquitectura de seguridad y modelado de amenazas para nodos IoT con microfono usando attestation remota, TLS mutuo, resiliencia post-cuantica y proteccion de actualizaciones y datos.",
        tags: ["iot-security", "threat-modeling", "post-quantum"],
        link: "https://arxiv.org/abs/2509.14657"
      },
      {
        title: "TFM: inteligencia de archivos binarios",
        venue: "RIUNET / TFM UPV",
        year: 2023,
        description:
          "Caracterizacion binaria automatizada y modelado con aprendizaje automatico para ejecutables, planteado como capa de apoyo y no como sustituto del analisis manual.",
        tags: ["binary-analysis", "machine-learning", "cyberintelligence"],
        link: "https://riunet.upv.es/entities/publication/02c1368b-5aef-45df-8532-309e605a8535"
      },
      {
        title: "TFG: exploracion del espacio de diseno multiobjetivo para binarios",
        venue: "RIUNET / TFG UPV",
        year: 2021,
        description:
          "Exploracion del espacio de diseno de flags de GCC para balancear tamano, tiempo de ejecucion, CPU, memoria y robustez del binario.",
        tags: ["gcc", "optimization", "binary-robustness"],
        link: "https://riunet.upv.es/entities/publication/4e6a5709-ca0e-4c5e-8f04-2386af404e0e"
      }
    ]
  }
};

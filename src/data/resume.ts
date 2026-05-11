import { profile } from "./profile";

export const skills = [
  {
    group: "Penetration Testing",
    items: ["Manual assessments", "Vulnerability analysis", "Source code audits", "Threat modeling"]
  },
  {
    group: "Offensive Security",
    items: ["Reverse engineering", "ARM/x86", "Firmware analysis", "PoC development"]
  },
  {
    group: "Privacy-Enhancing Technologies",
    items: ["Homomorphic encryption", "TEEs", "Differential privacy", "MPC"]
  },
  {
    group: "Cryptography",
    items: ["Applied cryptography", "Post-quantum cryptography", "Secure implementations", "Protocol review", "Risk modeling"]
  },
  {
    group: "AI Security",
    items: ["AI security reviews", "Threat modeling", "Misuse analysis", "Secure ML pipelines"]
  },
  {
    group: "Engineering",
    items: ["Python", "Go", "C", "Java", "Bash", "Linux", "Automation"]
  }
];

export const experience = [
  {
    role: "Security Researcher",
    company: "ITI - Instituto Tecnológico de Informática",
    location: "Valencia, Spain (Hybrid)",
    period: "June 2023 - Present",
    points: [
      "Work on security research and security engineering tasks.",
      "Focus areas include PETs, cryptography, AI security, and DevSecOps."
    ]
  },
  {
    role: "Offensive Security Researcher",
    company: "Cyber Intelligence S.L.",
    location: "Valencia, Spain",
    period: "December 2021 - January 2023",
    points: [
      "Worked in security research using Python and Bash.",
      "Reviewed binaries as part of security assessment work."
    ]
  }
];

export const education = [
  {
    title: "CRIPTOGRAFÍA MATEMÁTICAMENTE DEMOSTRABLE",
    school: "Universitat Politècnica de València (UPV)",
    period: "Issued April 2026",
    detail:
      "Credential ID FCP1SYW4LJL. Public LinkedIn certification entry for mathematically demonstrable cryptography."
  },
  {
    title: "Master's in Cybersecurity and Cyberintelligence (MUCC)",
    school: "Universitat Politècnica de València (UPV)",
    period: "September 2021 - June 2023",
    detail:
      "Focused on protecting information and communication systems through vulnerability analysis, secure development, and threat intelligence generation."
  },
  {
    title: "Bachelor's in Computer Engineering",
    school: "Universitat Politècnica de València (UPV)",
    period: "2017 - 2021",
    detail: "Focused on computer science fundamentals, software engineering, system architecture, and low-level programming."
  }
];

export const languages = [
  { name: "Spanish", level: "Native or bilingual proficiency" },
  { name: "Catalan", level: "Native or bilingual proficiency" },
  { name: "English", level: "Full professional proficiency" }
];

export const highlights = [
  "Builds scripts and tools to automate repetitive security assessment workflows.",
      "Applies ML techniques including CNNs and Transformers to anomaly detection, security analytics, and AI security reviews.",
  "Connects academic work on binary optimization, executable-file intelligence, and secure IoT architecture.",
  "Writes findings in a way that is useful for both engineering and decision making.",
  "Works well in research and product contexts where the problem is not fully defined yet."
];

export const publications = [
  {
    title: "Threat Modeling for Enhancing Security of IoT Audio Classification Devices",
    venue: "arXiv / Computing Conference 2026",
    year: 2025,
    description:
      "Security architecture and threat modeling for microphone-equipped IoT nodes using remote attestation, mutually authenticated TLS, post-quantum resilience, and secure update/data handling.",
    tags: ["iot-security", "threat-modeling", "post-quantum"],
    link: "https://arxiv.org/abs/2509.14657"
  },
  {
    title: "Inteligencia de archivos binarios",
    venue: "RIUNET / UPV Master's thesis",
    year: 2023,
    description:
      "Automated binary characterization and machine-learning modeling for executable files, framed as a cyberintelligence pipeline for security decision support.",
    tags: ["binary-analysis", "machine-learning", "cyberintelligence"],
    link: "https://riunet.upv.es/entities/publication/02c1368b-5aef-45df-8532-309e605a8535"
  },
  {
    title: "Exploración del espacio de diseño multiobjetivo para ficheros binarios",
    venue: "RIUNET / UPV Bachelor's thesis",
    year: 2021,
    description:
      "Design-space exploration for GCC compilation flags to balance executable size, execution time, CPU and memory use, and binary robustness.",
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
    role: "Ingeniero Informático especializado en seguridad",
    summary:
      "Ingeniero informático especializado en Ingeniería de Computadores. Trabajo como R&D Security Engineer, con una parte bastante práctica: evaluaciones manuales, reversing, seguridad hardware, criptografía, seguridad en IA y mitigaciones que los equipos puedan aplicar.",
    skills: [
      {
        group: "Pentesting",
        items: ["Evaluaciones manuales", "Análisis de vulnerabilidades", "Auditorías de código", "Modelado de amenazas"]
      },
      {
        group: "Seguridad ofensiva",
        items: ["Reverse engineering", "ARM/x86", "Análisis de firmware", "Desarrollo de PoC"]
      },
      {
        group: "Tecnologías de privacidad",
        items: ["Cifrado homomórfico", "TEEs", "Privacidad diferencial", "MPC"]
      },
      {
        group: "Criptografía",
        items: ["Criptografía aplicada", "Criptografía post-cuántica", "Implementaciones seguras", "Revisión de protocolos", "Modelado de riesgo"]
      },
      {
        group: "Seguridad en IA",
        items: ["Revisiones de seguridad en IA", "Modelado de amenazas", "Análisis de abuso", "Pipelines ML seguros"]
      },
      {
        group: "Ingeniería",
        items: ["Python", "Go", "C", "Java", "Bash", "Linux", "Automatización"]
      }
    ],
    experience: [
      {
        role: "R&D Security Engineer",
        company: "ITI - Instituto Tecnológico de Informática",
        location: "Valencia, Spain (Hybrid)",
        period: "Junio 2023 - Actualidad",
        points: [
          "Trabajo en tareas de investigación en seguridad e ingeniería de seguridad.",
          "Trabajo en PETs, criptografía, seguridad en IA y DevSecOps."
        ]
      },
      {
        role: "Offensive Security Researcher",
        company: "Cyber Intelligence S.L.",
        location: "Valencia, Spain",
        period: "Diciembre 2021 - Enero 2023",
        points: [
          "Trabajé en investigación en seguridad usando Python y Bash.",
          "Revisé binarios como parte del trabajo de evaluación de seguridad."
        ]
      }
    ],
    education: [
      {
        title: "CRIPTOGRAFÍA MATEMÁTICAMENTE DEMOSTRABLE",
        school: "Universitat Politècnica de València (UPV)",
        period: "Expedición: abril 2026",
        detail:
          "ID de credencial FCP1SYW4LJL. Certificación pública en LinkedIn sobre criptografía matemáticamente demostrable."
      },
      {
        title: "Máster en Ciberseguridad y Ciberinteligencia (MUCC)",
        school: "Universitat Politècnica de València (UPV)",
        period: "Septiembre 2021 - Junio 2023",
        detail:
          "Formación orientada a proteger sistemas de información y comunicación mediante análisis de vulnerabilidades, desarrollo seguro y generación de inteligencia de amenazas."
      },
      {
        title: "Grado en Ingeniería Informática, especialidad Ingeniería de Computadores",
        school: "Universitat Politècnica de València (UPV)",
        period: "2017 - 2021",
        detail: "Base en fundamentos de informática, ingeniería del software, arquitectura de sistemas y programación de bajo nivel."
      }
    ],
    languages: [
      { name: "Español", level: "Competencia bilingüe o nativa" },
      { name: "Catalán", level: "Competencia bilingüe o nativa" },
      { name: "Inglés", level: "Competencia profesional completa" }
    ],
    highlights: [
      "Construyo scripts y herramientas para automatizar flujos repetitivos de evaluación de seguridad.",
      "Aplico técnicas de ML, incluyendo CNNs y Transformers, a detección de anomalías, analítica de seguridad y revisiones de seguridad en IA.",
      "Conecto trabajos académicos sobre optimización binaria, inteligencia de ejecutables y arquitectura segura para IoT.",
      "Escribo hallazgos pensados para que ingeniería y negocio puedan decidir con contexto.",
      "Trabajo bien en investigación y producto cuando el problema aún no está completamente cerrado."
    ],
    publications: [
      {
        title: "Threat Modeling for Enhancing Security of IoT Audio Classification Devices",
        venue: "arXiv / Computing Conference 2026",
        year: 2025,
        description:
          "Arquitectura de seguridad y modelado de amenazas para nodos IoT con micrófono usando attestation remota, TLS mutuo, resiliencia post-cuántica y protección de actualizaciones y datos.",
        tags: ["iot-security", "threat-modeling", "post-quantum"],
        link: "https://arxiv.org/abs/2509.14657"
      },
      {
        title: "Inteligencia de archivos binarios",
        venue: "RIUNET / TFM UPV",
        year: 2023,
        description:
          "Caracterización binaria automatizada y modelado con aprendizaje automático para ejecutables, como pipeline de ciberinteligencia para apoyar decisiones de seguridad.",
        tags: ["binary-analysis", "machine-learning", "cyberintelligence"],
        link: "https://riunet.upv.es/entities/publication/02c1368b-5aef-45df-8532-309e605a8535"
      },
      {
        title: "Exploración del espacio de diseño multiobjetivo para ficheros binarios",
        venue: "RIUNET / TFG UPV",
        year: 2021,
        description:
          "Exploración del espacio de diseño de flags de GCC para balancear tamaño, tiempo de ejecución, CPU, memoria y robustez del binario.",
        tags: ["gcc", "optimization", "binary-robustness"],
        link: "https://riunet.upv.es/entities/publication/4e6a5709-ca0e-4c5e-8f04-2386af404e0e"
      }
    ]
  }
};

export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export const ui = {
  en: {
    nav: { home: "home", projects: "projects", blog: "blog", contact: "contact" },
    footer: {
      status: "site status: production",
      runtime: "runtime: astro static / linux brutalist shell",
      note: "signal path: verified research, selected public evidence, direct contact"
    },
    theme: "theme",
    light: "white",
    dark: "black",
    language: "language",
    common: {
      viewProjects: "view projects",
      openSecureChannel: "open secure channel",
      source: "source",
      readNote: "read note",
      openProject: "open project",
      secureChannel: "secure channel",
      availableFor: "available for",
      viewAllProjects: "view all projects",
      viewAllNotes: "view all notes"
    },
    home: {
      metaTitle: "Security Researcher, Reverse Engineer, Cryptography and AI Security",
      metaDescription:
        "Security portfolio for Sergio Benlloch: practical assessments, reverse engineering, cryptography, post-quantum work and AI security, presented as a Linux brutalist workstation.",
      kicker: "security assessment / reverse engineering / cryptography / ai security",
      positioning:
        "R&D security engineer turning offensive analysis, research and engineering discipline into work teams can actually ship.",
      viewProjects: "view projects",
      contact: "open secure channel",
      githubStats: "github",
      linkedinStats: "linkedin",
      focus: "./focus --now",
      focusItems: [
        "manual security assessments",
        "firmware and ARM/x86 reversing",
        "post-quantum cryptography and AI security",
        "privacy-enhancing tech: HE, TEEs, DP, MPC",
        "cryptography and secure engineering"
      ],
      capabilitiesEyebrow: "02 / capability map",
      capabilitiesTitle: "Technical surface",
      signalLabel: "signal blocks",
      signalBlocks: [
        { label: "experience", value: "4+ years", detail: "research + offensive security" },
        { label: "current focus", value: "security assessments", detail: "reversing, crypto, AI security" },
        { label: "strong areas", value: "firmware / binaries / protocols", detail: "manual work over checkbox scans" },
        { label: "languages", value: "es / ca / en", detail: "native + professional English" },
        { label: "location", value: "Valencia, Spain", detail: "Europe / hybrid friendly" }
      ],
      terminalTitle: "operator.console",
      terminalIntro:
        "Initial state loads profile, navigation hints and live portfolio commands. Use it as a real site shell, not a decorative terminal.",
      missionEyebrow: "01 / current mission",
      missionTitle: "Operational focus",
      missionIntro:
        "The center of gravity is practical security work: enough research depth to reason correctly, enough engineering discipline to make the result deployable.",
      missionItems: [
        {
          title: "Security assessment",
          detail: "Manual review, code-level reasoning and adversarial thinking for systems that need more than automated scanning."
        },
        {
          title: "Reverse engineering",
          detail: "Executable triage, binary characterization and firmware-focused analysis for unfamiliar environments."
        },
        {
          title: "Cryptography / PQC",
          detail: "Applied cryptography, protocol review and post-quantum migration questions grounded in implementation reality."
        },
        {
          title: "AI security",
          detail: "Threat modeling, misuse analysis and secure ML pipeline review where AI touches real product risk."
        }
      ],
      capabilityEyebrow: "02 / capability map",
      capabilityTitle: "Technical surface",
      capabilityIntro: "Grouped as operating modules instead of generic skill lists.",
      evidenceEyebrow: "03 / selected evidence",
      evidenceTitle: "Proof of work",
      evidenceIntro:
        "Public evidence that maps to real disciplines: papers, repositories, hands-on projects and roles with concrete technical focus.",
      proofCards: [
        {
          title: "Research outputs",
          detail: "Binary intelligence, secure IoT architecture and compiler/binary tradeoff work."
        },
        {
          title: "Public repositories",
          detail: "Utilities and prototypes around binaries, parsers, crypto primitives and engineering workflows."
        },
        {
          title: "Industry work",
          detail: "ITI and Cyber Intelligence roles spanning security research, reversing and applied engineering."
        },
        {
          title: "Stack in use",
          detail: "Python, Go, C, Bash, Linux and practical analysis workflows over real artifacts."
        }
      ],
      experienceEyebrow: "04 / field record",
      experienceTitle: "Experience and operating context",
      highlights: "operator notes",
      languages: "languages",
      publicationsEyebrow: "05 / research outputs",
      publicationsTitle: "Selected writing and papers",
      projectsEyebrow: "06 / selected work",
      projectsTitle: "Projects as evidence",
      blogEyebrow: "07 / field notes",
      blogTitle: "Practical notes",
      educationEyebrow: "08 / foundation",
      educationTitle: "Academic base",
      availabilityTitle: "Available for",
      availabilityItems: ["penetration testing", "security research", "reverse engineering", "secure development and review"],
      availabilityLead:
        "Best fit is work that needs careful reasoning, technical writing and engineering realism instead of generic security theatre.",
      finalCtaTitle: "Need a security researcher who can move between binaries, protocols and engineering teams?",
      finalCtaText: "Email is the recommended path for scoping a review, research collaboration or selective advisory work."
    },
    pages: {
      projectsTitle: "Security research, tooling and engineering work",
      projectsDescription:
        "Selected security and engineering projects with clearer metadata, context and links to source where public.",
      projectsEyebrow: "projects",
      projectsLead:
        "Projects are presented as professional evidence: what problem they address, what discipline they represent and where the public source lives.",
      blogTitle: "Research notes and field methods",
      blogDescription:
        "Notes on binary analysis, security research and practical lessons from projects, papers and offensive engineering work.",
      blogEyebrow: "blog",
      blogLead:
        "Writing here leans practical: why the work mattered, what was actually learned and how it connects to real security decisions.",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contact",
      contactTitle: "Open a secure channel.",
      contactDescription:
        "Professional contact page for pentesting, reverse engineering, security research and secure development work.",
      contactLead:
        "For pentesting, security research, reverse engineering or secure development review, email is the preferred starting point. Public links remain available, but email is the direct channel.",
      email: "reveal email",
      emailReady: "copy address / draft email",
      status: "available for focused security research conversations",
      updated: "updated",
      contactPanelTitle: "recommended engagement paths",
      contactPanelItems: [
        "targeted pentesting and manual review",
        "reverse engineering and binary triage",
        "security research support",
        "secure development and architecture review"
      ],
      bottomCtaProjects: "Need a security review around one of these disciplines?",
      bottomCtaBlog: "Need a researcher who can turn this kind of analysis into delivery?",
      bottomCtaText: "Use email for concrete scope, context and constraints."
    }
  },
  es: {
    nav: { home: "inicio", projects: "proyectos", blog: "blog", contact: "contacto" },
    footer: {
      status: "estado del sitio: produccion",
      runtime: "runtime: astro static / shell linux brutalista",
      note: "ruta de senal: investigacion verificada, evidencia publica seleccionada, contacto directo"
    },
    theme: "tema",
    light: "blanco",
    dark: "negro",
    language: "idioma",
    common: {
      viewProjects: "ver proyectos",
      openSecureChannel: "abrir canal seguro",
      source: "codigo",
      readNote: "leer nota",
      openProject: "abrir proyecto",
      secureChannel: "canal seguro",
      availableFor: "disponible para",
      viewAllProjects: "ver todos los proyectos",
      viewAllNotes: "ver todas las notas"
    },
    home: {
      metaTitle: "Investigacion en seguridad, reversing, criptografia y seguridad en IA",
      metaDescription:
        "Portfolio de seguridad de Sergio Benlloch: evaluaciones practicas, reverse engineering, criptografia, trabajo post-cuantico y seguridad en IA, presentado como una workstation Linux brutalista.",
      kicker: "evaluacion de seguridad / reverse engineering / criptografia / seguridad en ia",
      positioning:
        "Ingeniero de seguridad en I+D que convierte analisis ofensivo, investigacion y disciplina de ingenieria en trabajo que los equipos pueden aplicar de verdad.",
      viewProjects: "ver proyectos",
      contact: "abrir canal seguro",
      githubStats: "github",
      linkedinStats: "linkedin",
      focus: "./foco --ahora",
      focusItems: [
        "evaluaciones manuales de seguridad",
        "firmware y reversing ARM/x86",
        "criptografia post-cuantica y seguridad en IA",
        "tecnologias de privacidad: HE, TEEs, DP, MPC",
        "criptografia e ingenieria segura"
      ],
      capabilitiesEyebrow: "02 / mapa de capacidad",
      capabilitiesTitle: "Superficie tecnica",
      signalLabel: "bloques de senal",
      signalBlocks: [
        { label: "experiencia", value: "4+ anos", detail: "investigacion + seguridad ofensiva" },
        { label: "foco actual", value: "evaluaciones de seguridad", detail: "reversing, cripto, seguridad en IA" },
        { label: "areas fuertes", value: "firmware / binarios / protocolos", detail: "trabajo manual por encima del escaneo automatico" },
        { label: "idiomas", value: "es / ca / en", detail: "nativo + ingles profesional" },
        { label: "ubicacion", value: "Valencia, Espana", detail: "Europa / hibrido" }
      ],
      terminalTitle: "operator.console",
      terminalIntro:
        "El estado inicial carga perfil, hints de navegacion y comandos vivos del portfolio. Usalo como una shell real del sitio, no como un adorno.",
      missionEyebrow: "01 / mision actual",
      missionTitle: "Foco operativo",
      missionIntro:
        "El centro de gravedad es trabajo practico de seguridad: suficiente profundidad de investigacion para razonar bien y suficiente disciplina de ingenieria para que el resultado sea aplicable.",
      missionItems: [
        {
          title: "Evaluacion de seguridad",
          detail: "Revision manual, razonamiento a nivel de codigo y perspectiva adversarial para sistemas que necesitan algo mas que un escaneo automatico."
        },
        {
          title: "Reverse engineering",
          detail: "Triage de ejecutables, caracterizacion binaria y analisis orientado a firmware en entornos poco conocidos."
        },
        {
          title: "Criptografia / PQC",
          detail: "Criptografia aplicada, revision de protocolos y cuestiones de migracion post-cuantica aterrizadas en la realidad de implementacion."
        },
        {
          title: "Seguridad en IA",
          detail: "Threat modeling, analisis de abuso y revision de pipelines ML seguros cuando la IA toca riesgo real de producto."
        }
      ],
      capabilityEyebrow: "02 / mapa de capacidad",
      capabilityTitle: "Superficie tecnica",
      capabilityIntro: "Agrupado como modulos operativos en lugar de una lista generica de skills.",
      evidenceEyebrow: "03 / evidencia seleccionada",
      evidenceTitle: "Prueba de trabajo",
      evidenceIntro:
        "Evidencia publica que mapea a disciplinas reales: papers, repositorios, proyectos practicos y experiencia con foco tecnico concreto.",
      proofCards: [
        {
          title: "Publicaciones",
          detail: "Inteligencia binaria, arquitectura segura para IoT y trabajo sobre tradeoffs de compilacion y binarios."
        },
        {
          title: "Repos publicos",
          detail: "Utilidades y prototipos alrededor de binarios, parsers, primitivas criptograficas y flujos de ingenieria."
        },
        {
          title: "Experiencia industrial",
          detail: "ITI y Cyber Intelligence en investigacion en seguridad, reversing e ingenieria aplicada."
        },
        {
          title: "Stack real",
          detail: "Python, Go, C, Bash, Linux y workflows de analisis sobre artefactos reales."
        }
      ],
      experienceEyebrow: "04 / trayectoria",
      experienceTitle: "Experiencia y contexto operativo",
      highlights: "notas del operador",
      languages: "idiomas",
      publicationsEyebrow: "05 / investigacion",
      publicationsTitle: "Escritos y papers seleccionados",
      projectsEyebrow: "06 / trabajo seleccionado",
      projectsTitle: "Proyectos como evidencia",
      blogEyebrow: "07 / notas de campo",
      blogTitle: "Notas practicas",
      educationEyebrow: "08 / base",
      educationTitle: "Base academica",
      availabilityTitle: "Disponible para",
      availabilityItems: ["pentesting", "investigacion en seguridad", "reverse engineering", "desarrollo y revision segura"],
      availabilityLead:
        "Encaja mejor en trabajos que necesitan razonamiento cuidadoso, escritura tecnica y realismo de ingenieria en lugar de teatro de seguridad.",
      finalCtaTitle: "Necesitas un perfil de seguridad que pueda moverse entre binarios, protocolos y equipos de ingenieria?",
      finalCtaText: "El email es la via recomendada para concretar una revision, colaboracion de investigacion o trabajo asesor selectivo."
    },
    pages: {
      projectsTitle: "Trabajo de investigacion, tooling e ingenieria de seguridad",
      projectsDescription:
        "Proyectos seleccionados de seguridad e ingenieria con mejor metadata, contexto y enlaces a codigo cuando es publico.",
      projectsEyebrow: "proyectos",
      projectsLead:
        "Los proyectos se presentan como evidencia profesional: que problema tocan, que disciplina representan y donde esta el codigo publico.",
      blogTitle: "Notas de investigacion y metodos de campo",
      blogDescription:
        "Notas sobre analisis binario, investigacion en seguridad y aprendizajes practicos conectados con proyectos, papers e ingenieria ofensiva.",
      blogEyebrow: "blog",
      blogLead:
        "El writing aqui es practico: por que importo el trabajo, que se aprendio de verdad y como conecta con decisiones de seguridad reales.",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contacto",
      contactTitle: "Abre un canal seguro.",
      contactDescription:
        "Pagina de contacto profesional para pentesting, reverse engineering, investigacion en seguridad y desarrollo seguro.",
      contactLead:
        "Para pentesting, investigacion en seguridad, reversing o revision de desarrollo seguro, el email es el punto de entrada recomendado. Los enlaces publicos siguen disponibles, pero el email es el canal directo.",
      email: "revelar email",
      emailReady: "copiar direccion / redactar email",
      status: "disponible para conversaciones serias de investigacion en seguridad",
      updated: "actualizado",
      contactPanelTitle: "vias de colaboracion recomendadas",
      contactPanelItems: [
        "pentesting dirigido y revision manual",
        "reverse engineering y triage binario",
        "apoyo en investigacion de seguridad",
        "revision de arquitectura y desarrollo seguro"
      ],
      bottomCtaProjects: "Necesitas una revision de seguridad en alguna de estas disciplinas?",
      bottomCtaBlog: "Necesitas un perfil que convierta este tipo de analisis en entrega real?",
      bottomCtaText: "Usa el email para compartir alcance, contexto y restricciones."
    }
  }
} satisfies Record<Locale, unknown>;

export function pathFor(locale: Locale, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

const localizedPaths: Record<Locale, Record<string, string>> = {
  en: {
    "/blog/tfg-binary-optimization": "/blog/tfg-optimizacion-binaria",
    "/blog/master-binary-intelligence": "/blog/tfm-inteligencia-binarios",
    "/blog/iot-audio-threat-modeling-paper": "/blog/paper-iot-audio-threat-modeling"
  },
  es: {
    "/blog/tfg-optimizacion-binaria": "/blog/tfg-binary-optimization",
    "/blog/tfm-inteligencia-binarios": "/blog/master-binary-intelligence",
    "/blog/paper-iot-audio-threat-modeling": "/blog/iot-audio-threat-modeling-paper"
  }
};

export function pathForLocaleSwitch(locale: Locale, currentPath = "/") {
  const targetLocale = otherLocale(locale);
  const cleanPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  return pathFor(targetLocale, localizedPaths[locale][cleanPath] ?? cleanPath);
}

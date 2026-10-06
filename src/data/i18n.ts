export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export const dateLocales: Record<Locale, string> = { en: "en-GB", es: "es-ES" };

export const ui = {
  en: {
    nav: { home: "home", projects: "projects", blog: "blog", contact: "contact" },
    footer: "signal path: verified research, selected public evidence, direct contact",
    theme: "theme",
    light: "white",
    dark: "black",
    language: "language",
    a11y: {
      home: "Go to home page",
      primaryNav: "Primary navigation",
      preferences: "Preferences",
      switchLanguage: "Switch language to Spanish",
      toggleTheme: "Toggle black and white theme",
      photoAlt: "Profile photo of Sergio Benlloch"
    },
    common: {
      source: "source",
      openProject: "open project",
      github: "github",
      linkedin: "linkedin"
    },
    cards: {
      updated: "updated",
      stars: "stars",
      status: { active: "active", archived: "archived" }
    },
    home: {
      kicker: "security assessment / reverse engineering / cryptography / ai security",
      viewProjects: "view projects",
      contact: "open secure channel",
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
      educationTitle: "Academic base"
    },
    pages: {
      projectsTitle: "Security research, tooling and engineering work",
      projectsDescription:
        "Selected security and engineering projects with context and links to the source code where it is public.",
      projectsEyebrow: "projects",
      blogTitle: "Research notes and field methods",
      blogDescription:
        "Notes on binary analysis, security research and practical lessons from projects, papers and offensive engineering work.",
      blogEyebrow: "blog",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contact",
      contactTitle: "Open a secure channel.",
      contactDescription:
        "Professional contact page for pentesting, reverse engineering, security research and secure development work.",
      contactLead:
        "For pentesting, security research, reverse engineering or secure development review, email is the preferred starting point. Public links remain available, but email is the direct channel.",
      email: "reveal email",
      emailHidden: "revealed on click",
      status: "available for focused security research conversations",
      updated: "updated"
    }
  },
  es: {
    nav: { home: "inicio", projects: "proyectos", blog: "blog", contact: "contacto" },
    footer: "ruta de señal: investigación verificada, evidencia pública seleccionada, contacto directo",
    theme: "tema",
    light: "blanco",
    dark: "negro",
    language: "idioma",
    a11y: {
      home: "Ir a la página de inicio",
      primaryNav: "Navegación principal",
      preferences: "Preferencias",
      switchLanguage: "Cambiar el idioma a inglés",
      toggleTheme: "Alternar tema blanco y negro",
      photoAlt: "Foto de perfil de Sergio Benlloch"
    },
    common: {
      source: "código",
      openProject: "abrir proyecto",
      github: "github",
      linkedin: "linkedin"
    },
    cards: {
      updated: "actualizado",
      stars: "estrellas",
      status: { active: "activo", archived: "archivado" }
    },
    home: {
      kicker: "evaluación de seguridad / reverse engineering / criptografía / seguridad en ia",
      viewProjects: "ver proyectos",
      contact: "abrir canal seguro",
      focus: "./foco --ahora",
      focusItems: [
        "evaluaciones manuales de seguridad",
        "firmware y reversing ARM/x86",
        "criptografía post-cuántica y seguridad en IA",
        "tecnologías de privacidad: HE, TEEs, DP, MPC",
        "criptografía e ingeniería segura"
      ],
      capabilitiesEyebrow: "02 / mapa de capacidades",
      capabilitiesTitle: "Superficie técnica",
      experienceEyebrow: "04 / trayectoria",
      experienceTitle: "Experiencia y contexto operativo",
      highlights: "notas del operador",
      languages: "idiomas",
      publicationsEyebrow: "05 / investigación",
      publicationsTitle: "Escritos y papers seleccionados",
      projectsEyebrow: "06 / trabajo seleccionado",
      projectsTitle: "Proyectos como evidencia",
      blogEyebrow: "07 / notas de campo",
      blogTitle: "Notas prácticas",
      educationEyebrow: "08 / base",
      educationTitle: "Formación académica"
    },
    pages: {
      projectsTitle: "Investigación, herramientas e ingeniería de seguridad",
      projectsDescription:
        "Proyectos seleccionados de seguridad e ingeniería, con contexto y enlaces al código cuando es público.",
      projectsEyebrow: "proyectos",
      blogTitle: "Notas de investigación y métodos de campo",
      blogDescription:
        "Notas sobre análisis binario, investigación en seguridad y aprendizajes prácticos de proyectos, papers e ingeniería ofensiva.",
      blogEyebrow: "blog",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contacto",
      contactTitle: "Abre un canal seguro.",
      contactDescription:
        "Página de contacto profesional para pentesting, reverse engineering, investigación en seguridad y desarrollo seguro.",
      contactLead:
        "Para pentesting, investigación en seguridad, reversing o revisión de desarrollo seguro, el email es el punto de partida recomendado. Los enlaces públicos siguen disponibles, pero el email es el canal directo.",
      email: "mostrar email",
      emailHidden: "se muestra al hacer clic",
      status: "disponible para conversaciones serias sobre investigación en seguridad",
      updated: "actualizado"
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
    "/blog/iot-audio-threat-modeling-paper": "/blog/paper-iot-audio-threat-modeling",
    "/blog/copy-and-dirty-vulns": "/blog/dirty-copy-vuln"
  },
  es: {
    "/blog/tfg-optimizacion-binaria": "/blog/tfg-binary-optimization",
    "/blog/tfm-inteligencia-binarios": "/blog/master-binary-intelligence",
    "/blog/paper-iot-audio-threat-modeling": "/blog/iot-audio-threat-modeling-paper",
    "/blog/dirty-copy-vuln": "/blog/copy-and-dirty-vulns"
  }
};

export function localizedPath(locale: Locale, currentPath = "/") {
  const cleanPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  return localizedPaths[locale][cleanPath] ?? cleanPath;
}

export function pathForLocaleSwitch(locale: Locale, currentPath = "/") {
  return pathFor(otherLocale(locale), localizedPath(locale, currentPath));
}

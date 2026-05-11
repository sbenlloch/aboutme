export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export const ui = {
  en: {
    nav: { home: "home", projects: "projects", blog: "blog", contact: "contact" },
    footer: "built with Astro + Markdown",
    theme: "theme",
    light: "white",
    dark: "black",
    language: "language",
    home: {
      kicker: "security research / offensive engineering / reverse engineering",
      viewProjects: "view projects",
      contact: "contact",
      profileFile: "cat profile.txt",
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
      capabilitiesEyebrow: "01 / capabilities",
      capabilitiesTitle: "Tools I use in real assessments",
      experienceEyebrow: "02 / experience",
      experienceTitle: "Research and offensive security",
      highlights: "Highlights",
      languages: "Languages",
      publicationsEyebrow: "03 / research outputs",
      publicationsTitle: "Papers and academic work",
      projectsEyebrow: "04 / selected work",
      projectsTitle: "Projects",
      blogEyebrow: "05 / notes",
      blogTitle: "Blog",
      educationEyebrow: "06 / education",
      educationTitle: "Foundation"
    },
    pages: {
      blogTitle: "Research notes and field methods",
      blogEyebrow: "blog",
      projectsTitle: "Security research and engineering work",
      projectsEyebrow: "projects",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contact",
      contactTitle: "Open a secure channel.",
      contactLead:
        "For penetration testing, security research, reverse engineering, or secure development work, email is the fastest starting point.",
      email: "email",
      source: "source",
      openProject: "open project",
      status: "available for security research conversations",
      updated: "updated"
    }
  },
  es: {
    nav: { home: "inicio", projects: "proyectos", blog: "blog", contact: "contacto" },
    footer: "con Astro + Markdown",
    theme: "tema",
    light: "blanco",
    dark: "negro",
    language: "idioma",
    home: {
      kicker: "investigación en seguridad / ofensiva / reversing",
      viewProjects: "ver proyectos",
      contact: "contacto",
      profileFile: "cat perfil.txt",
      githubStats: "github",
      linkedinStats: "linkedin",
      focus: "./foco --ahora",
      focusItems: [
        "evaluaciones manuales de seguridad",
        "firmware y reversing ARM/x86",
        "criptografía post-cuántica y seguridad en IA",
        "tecnologías de privacidad: HE, TEEs, DP, MPC",
        "criptografía e ingeniería segura"
      ],
      capabilitiesEyebrow: "01 / capacidades",
      capabilitiesTitle: "Herramientas de trabajo real",
      experienceEyebrow: "02 / experiencia",
      experienceTitle: "Investigación y seguridad ofensiva",
      highlights: "Puntos clave",
      languages: "Idiomas",
      publicationsEyebrow: "03 / investigación",
      publicationsTitle: "Publicaciones y trabajo académico",
      projectsEyebrow: "04 / trabajo seleccionado",
      projectsTitle: "Proyectos",
      blogEyebrow: "05 / notas",
      blogTitle: "Blog",
      educationEyebrow: "06 / formación",
      educationTitle: "Base técnica"
    },
    pages: {
      blogTitle: "Notas de investigación y métodos de campo",
      blogEyebrow: "blog",
      projectsTitle: "Trabajo de investigación y seguridad",
      projectsEyebrow: "proyectos",
      backBlog: "../blog",
      backProjects: "../projects",
      contactKicker: "contacto",
      contactTitle: "Abre un canal seguro.",
      contactLead:
        "Para pentesting, investigación en seguridad, reversing o desarrollo seguro, el email es el mejor punto de inicio.",
      email: "email",
      source: "código",
      openProject: "abrir proyecto",
      status: "disponible para conversaciones de investigación en seguridad",
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

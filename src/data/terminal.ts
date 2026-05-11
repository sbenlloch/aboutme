export const terminalCommands = {
  help: [
    "commands: whoami, skills, pets, papers, experience, projects, contact, github, linkedin",
    "filesystem: pwd, ls, ls -la, cat contact.txt, cat profile.txt",
    "runtime: date, time, timezone, uptime, history, echo <text>, hash <text>, uuid, theme, locale, viewport, printenv, clear"
  ],
  whoami: [
    "Sergio Benlloch",
    "Computer engineer at ITI working on security assessment, reversing, cryptography, PQC, and AI security."
  ],
  skills: [
    "manual security assessments",
    "reverse engineering and firmware analysis",
    "applied cryptography and protocol review",
    "post-quantum cryptography and AI security",
    "Python, Go, C, Java, Bash, Linux"
  ],
  pets: [
    "privacy-enhancing technologies: homomorphic encryption, TEEs, differential privacy, and MPC",
    "public notes stay high-level; client and implementation details stay private"
  ],
  papers: [
    "2025: threat modeling for secure IoT audio classification devices",
    "2023: binary intelligence for executable-file characterization",
    "2021: GCC multi-objective design-space exploration for binary tradeoffs"
  ],
  experience: [
    "2023-present: Security Researcher, ITI - Instituto Tecnologico de Informatica",
    "2021-2023: Offensive Security Researcher, Cyber Intelligence S.L."
  ],
  projects: ["open /en/projects or /es/projects from the navigation"],
  contact: ["email: sergibenlloch@proton.me", "linkedin: linkedin.com/in/sergio-benlloch"],
  github: ["https://github.com/sbenlloch"],
  linkedin: ["https://www.linkedin.com/in/sergio-benlloch/"],
  pwd: ["/home/sergio"],
  ls: ["blog  papers  projects  skills  contact.txt  profile.txt"],
  "ls -la": [
    "drwxr-xr-x  6 sergio sergio 4096 May  8 10:21 .",
    "drwxr-xr-x  3 root   root   4096 May  8 09:58 ..",
    "-rw-r--r--  1 sergio sergio  182 May  8 10:19 contact.txt",
    "-rw-r--r--  1 sergio sergio  241 May  8 10:19 profile.txt",
    "drwxr-xr-x  2 sergio sergio 4096 May  8 10:20 projects",
    "drwxr-xr-x  2 sergio sergio 4096 May  8 10:20 papers"
  ],
  "cat contact.txt": ["mail=sergibenlloch@proton.me", "linkedin=linkedin.com/in/sergio-benlloch"],
  "cat profile.txt": [
    "role=R&D Security Engineer",
    "focus=security research, PETs, cryptography, AI security, DevSecOps",
    "tools=Python, Bash, Linux"
  ],
  uname: ["Linux secbox 6.x x86_64 GNU/Linux"],
  "uname -a": ["Linux secbox 6.x x86_64 GNU/Linux"]
} satisfies Record<string, string[]>;

# Sergio resume website

Personal resume and portfolio site built with Astro for `serg1o.dev`

## Current content direction

- Public-facing name is `Sergio Benlloch` to keep the main site slightly more private.
- The profile copy follows the latest information from `Profile.pdf`: R&D Security Engineer at ITI, Computer Engineering background, Master's in Cybersecurity and Cyberintelligence, and practical work around reverse engineering, cryptography, secure development, application security, and AI-driven cybersecurity.
- The tone should stay human, direct, and close to a real personal portfolio. Avoid inflated titles or copy that sounds generated.
- Blog content is centered on three real academic/research pieces: the bachelor's thesis on multi-objective GCC binary optimization, the master's thesis on binary file intelligence, and the IoT audio-classification threat-modeling paper.
- Project cards link directly to the GitHub repositories when a `repo` field exists. Cards progressively fetch GitHub metadata in the browser so the visible project state can stay fresh without editing Markdown.
- Technical skills include PQC and AI security alongside the existing security, reversing, cryptography, PETs, and engineering experience.

## Local development

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

## GitHub Pages

The site is configured for the custom domain `sergiobenlloch.dev`.

Deployment uses GitHub Actions from `.github/workflows/deploy.yml`:

1. Push the repository to GitHub with `main` as the default branch.
2. In the repository settings, enable GitHub Pages with GitHub Actions as the source.
3. Configure the domain DNS for GitHub Pages and keep `public/CNAME` set to `serg1o.dev`.

The workflow builds `dist/` and uploads it to GitHub Pages.

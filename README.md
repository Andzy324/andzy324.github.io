# Boyang Zhong

Source code for [Boyang Zhong's academic homepage](https://andzy324.github.io/), built with [Eleventy](https://www.11ty.dev/) and adapted from [fusheng-ji/academic-homepage-template](https://github.com/fusheng-ji/academic-homepage-template).

Research interests include embodied AI, 3D perception, robot manipulation, and generative world models. Homepage content lives in `src/_data/`; images and logos live in `public/assets/`.

## Local preview

Use Node.js 22.22 or newer:

```bash
npm ci
npm run dev
```

Open `http://localhost:8080/`. Validate a production build with:

```bash
npm run build
npm run check
```

## Publishing

Pushing to `main` runs the [GitHub Pages workflow](.github/workflows/pages.yml), which builds and deploys the site at `https://andzy324.github.io/`. In the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.

The original template's license and third-party notices are retained in this repository.

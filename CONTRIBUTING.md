# Contributing

Thank you for helping improve Academic Homepage Template. Contributions should
make the project more reusable, accessible, maintainable, or easier to adopt
across a broad range of academic disciplines.

By participating, you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Before you start

- Search existing issues before opening a new bug report or feature proposal.
- Use the repository's structured issue forms and keep one concern per issue.
- For a substantial feature or public-interface change, open an issue before
  implementation so the design can be discussed.
- Report suspected vulnerabilities privately according to
  [SECURITY.md](SECURITY.md).

## Development workflow

1. Fork the repository and create a focused branch from `main`.
2. Install the pinned dependencies with `npm ci`.
3. Run `npm run dev` and make the smallest coherent change.
4. Add or update tests and documentation when behavior changes.
5. Run the complete validation suite.
6. Open a pull request using the provided checklist.

```bash
npm ci
npm run build
npm run check
npm run test:e2e
```

When a change affects asset URLs, routing, canonical metadata, or deployment,
also verify a GitHub Pages project path:

```bash
SITE_URL=https://example.github.io \
PATH_PREFIX=/academic-homepage-template/ \
npm run build

PLAYWRIGHT_PATH_PREFIX=/academic-homepage-template/ \
npm run test:e2e
```

Rebuild without those environment variables before committing generated-state
checks locally. `_site/` and `public/assets/generated/` are build outputs and
must not be edited manually.

## Code and content conventions

- Keep content in `src/_data/`, presentation in Nunjucks and CSS, and client
  behavior in small progressive-enhancement modules.
- Preserve `homepage.sections` as the only source of section order and
  navigation visibility.
- Preserve `.home-section--{id}` and `.home-entry--{type}` as stable styling
  contracts.
- Follow the existing formatting and naming patterns. Keep JavaScript modules
  focused and avoid adding runtime dependencies without a clear template-wide
  benefit.
- Maintain readable HTML without JavaScript and account for keyboard, reduced
  motion, reduced transparency, narrow screens, and browsers without backdrop
  filters.
- Update the content schema and validation fixtures when a public data shape
  changes.
- Do not weaken the homepage CSS and JavaScript size budget.

## Example content and media safety

This repository must remain safe to fork publicly.

- Do not submit real personal records, private contact details, credentials,
  API keys, unpublished research, or identifying metadata.
- Use clearly fictional people, institutions, publications, awards, projects,
  URLs, and email addresses in examples.
- Submit only media you created, media with a compatible license, or simple
  original placeholders. Record required attribution in
  `THIRD_PARTY_NOTICES.md`.
- Strip EXIF, location, author, device, and other private metadata before adding
  media.
- Every meaningful image must have accurate alternative text and intrinsic
  dimensions.
- Do not commit generated build output, test artifacts, dependency directories,
  or private media archives.

See [docs/media-pipeline.md](docs/media-pipeline.md) for the media workflow.

## Testing expectations

Every pull request must pass:

- data and schema validation;
- generated HTML validation;
- JavaScript and CSS linting;
- internal-link and bundle-size checks;
- Playwright tests for public routes, responsive layout, and core interactions.

Visual changes should include before-and-after screenshots at relevant desktop
and mobile sizes. Routing or data-registry changes should include a regression
test. Documentation-only changes may mark visual evidence as not applicable,
but should still keep links and commands accurate.

## Pull request checklist

Before requesting review, confirm that:

- the change solves one clearly described, reusable problem;
- new public configuration is documented;
- tests cover changed behavior;
- root and project-path deployments still work when relevant;
- content and media are fictional, public-safe, and appropriately licensed;
- accessibility and responsive behavior have been checked;
- `npm run build`, `npm run check`, and `npm run test:e2e` pass locally.

Maintainers may ask for a change to be narrowed, split, or redesigned to keep
the template small and general-purpose.

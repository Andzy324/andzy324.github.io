# Media workflow

Store publishable media under `public/` and reference it from `src/_data/` with
an absolute site path such as `/assets/placeholders/research-grid.svg`.

Each media record must provide:

- `src`
- `width`
- `height`
- descriptive `alt` text

Optional responsive images can provide `srcset`. Run `npm run validate:data` to
check that every referenced local file exists, then run `npm run build` to
create hashed CSS and JavaScript assets.

Before publishing photographs or documents, remove EXIF, author, location, and
other embedded metadata. Do not commit original private media archives.

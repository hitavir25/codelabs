# Contributing

This track is a set of Google Codelabs authored in claat-compatible markdown, plus
a shared visual system. Keep both consistent with what already exists.

## Install claat

`claat` is a single Go binary.

```bash
# With Go installed
go install github.com/googlecodelabs/tools/claat@latest

# Or download a prebuilt binary from the releases page:
# https://github.com/googlecodelabs/tools/releases
```

Confirm it is on your path:

```bash
claat version
```

## Build and preview

```bash
# Export one codelab to HTML (creates a folder named after the codelab id)
claat export codelabs/02-data-discovery.md

# Export everything
claat export codelabs/*.md

# Serve the exported codelabs locally and open a browser
claat serve
```

If `claat export` fails, the markdown has a structural problem — usually a broken
metadata block or a malformed table. Fix it before committing; a lab is not done
until it exports cleanly.

## Authoring rules

Every codelab must:

- Start with the metadata block, then the H1 title, then `## ` steps, each with a
  `Duration:` line.
- Use this metadata shape:

  ```text
  author: HitaVirTech
  summary: <one line summary>
  id: hvt-de-aws-<lesson>-<short-slug>
  categories: aws,data-engineering,foundations
  environments: Web
  status: Published
  feedback link: https://github.com/hitavirtech
  analytics account:
  ```

- Follow the required step order: Overview, Setup, hands-on steps, a validation
  checkpoint, Troubleshooting, Cleanup, What's next.
- Give **both** the console click-path and the equivalent AWS CLI command for every
  AWS action.
- Use Codelabs info boxes: `Positive` for tips and cost-savers, `Negative` for
  warnings and common mistakes.
- End with a mandatory Cleanup section that deletes everything the lab created.

## Style

- No arrow characters in prose. Write "to", "then", or "leads to" in words. Drawn
  connectors inside the SVG visuals are fine.
- Conversational, encouraging, mentor tone. No filler, no hype.
- Fence every code block with its language (`python`, `sql`, `bash`, `json`,
  `yaml`).
- No inline code comments unless a line truly needs one — explain in the prose
  around the block instead.
- Define each new term once, briefly, the first time it appears.
- Be explicit about region (`us-east-1`) and the `hvt-retail-...` naming scheme.

## Visuals

- One concept visual per lesson, in `assets/`, as a standalone HTML file with
  inline SVG and no build step.
- Import `assets/design-tokens.css`. Do not redefine the palette locally.
- Obey the semantic color law: the same hue means the same concept everywhere.
- Respect `prefers-reduced-motion`, be responsive to mobile, and keep interactive
  elements keyboard-focusable.

## Dataset

The dataset is generated, not hand-edited. Change
[`dataset/generate_data.py`](dataset/generate_data.py) and regenerate. Keep the
fixed seed so query results stay reproducible across the track.

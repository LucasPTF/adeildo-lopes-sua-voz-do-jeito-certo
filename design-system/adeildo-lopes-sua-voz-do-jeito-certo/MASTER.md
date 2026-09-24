# Adeildo Lopes - Sua Voz do Jeito Certo

## Direction

A contemporary recording studio translated into an editorial sales page. The visual anchor is the transformation of a raw phone waveform into a directed and treated signal. The official portraits establish recognition, while the new midnight, coral, violet, and cyan treatment creates an independent campaign identity for adults who enjoy singing without presenting a professional-career fantasy.

## Design dials

- Variance: 8/10
- Motion: 5/10
- Density: 4/10

## Palette

| Role | Value |
| --- | --- |
| Deep background | `#070818` |
| Raised background | `#11152d` |
| Light surface | `#eef1ff` |
| Main text on dark | `#f7f8ff` |
| Muted text on dark | `#b9c2d8` |
| Main text on light | `#0b0d20` |
| Conversion accent | `#ff5a6b` |
| Conversion hover | `#ff8390` |
| Signal cyan | `#50d9e7` |
| Studio violet | `#8b5cf6` |
| Border dark | `rgba(173, 188, 255, 0.18)` |
| Focus ring | `#8cebf3` |

All foreground and surface pairs must meet WCAG AA contrast. Coral is reserved for conversion and current-state emphasis; cyan communicates audio signal and interaction; violet creates studio depth.

## Typography

- Display: Space Grotesk with Manrope and Arial fallback, compact tracking, fluid scale.
- Body: Manrope with Trebuchet MS and Arial fallback, 17px to 19px for sustained copy.
- Numeric values: tabular figures.
- Maximum body line length: 68 characters.

## Layout

- Main container: min of 1180px and viewport minus responsive gutters.
- Section rhythm: 88px to 136px desktop, 64px to 88px mobile.
- Border radius: 18px for standard panels, 32px for major compositions, pill only for compact labels.
- Borders, colored light, and asymmetric image framing create depth. Avoid generic drop-shadow card grids.
- Alternate editorial text, anchored timelines, dark studio panels, and high-contrast light surfaces.

## Signature experience

The signal desk is the only signature effect. It visualizes Gravar, Dirigir, and Comparar with three selectable signal states. It must remain complete and understandable without animation. On small screens it becomes a stacked panel.

## Motion

- Purpose: explanation, hierarchy, feedback, and continuity.
- Hero entrance and one-time section reveals use transform, opacity, or clip-path.
- Buttons use 160ms feedback with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Section reveals use 600ms `cubic-bezier(0.77, 0, 0.175, 1)`.
- Continuous signal motion runs only while the component is visible.
- Reduced motion removes positional movement and keeps only gentle opacity feedback.
- Hover motion is restricted to fine pointers.

## Accessibility and responsive rules

- Visible focus on every control.
- Minimum 44px interactive targets.
- Semantic headings, lists, links, buttons, details, and current-state attributes.
- No essential copy is hidden behind JavaScript or animation.
- Validate at 375px, 768px, 1024px, and 1440px.
- No horizontal page overflow.

## Do not use

- Portraits or identity imagery without approved client assets.
- Generic concert crowds, fake testimonials, invented screens, or stock microphones.
- Gold luxury styling, sepia photography, excessive nightclub neon, or a repeated card grid.
- More than two attention-seeking motion clusters in one viewport.
- `transition: all`, ungated hover motion, or missing reduced-motion behavior.

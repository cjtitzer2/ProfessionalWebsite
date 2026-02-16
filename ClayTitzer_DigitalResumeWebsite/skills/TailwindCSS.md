# Tailwind CSS

## Version
Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

## Usage in Project
Tailwind provides all styling through utility classes. A custom theme defines the project's color palette, fonts, and design tokens as CSS custom properties.

## Theme Configuration
Defined in `claytitzer_digitalresumewebsite.client/src/index.css` using `@theme` directive:

### Color Palette
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `charcoal` | `#1a1a2e` | `#e8e6e3` | Primary text |
| `offwhite` | `#f8f7f4` | `#121220` | Background |
| `slate` | `#6b7280` | `#9ca3af` | Secondary text |
| `accent` | `#5b21b6` | `#7c3aed` | Interactive elements |
| `gold` | `#b8860b` | `#d4a017` | Metadata labels |
| `divider` | `#d6d3d1` | `#2d2d44` | Borders |

### Fonts
- `--font-sans`: system-ui stack
- `--font-mono`: SF Mono, Cascadia Code, Fira Code

## Dark Mode
Implemented via CSS variable overrides in `html.dark` selector. The same Tailwind utility classes work in both themes because they reference CSS variables.

## Common Patterns
- Container: `max-w-7xl mx-auto px-6 md:px-10` (full-width on desktop, padded on mobile)
- Buttons: `px-5 py-2.5 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-200`
- Labels: `font-mono text-xs text-gold tracking-widest uppercase`
- Cards: `border border-divider/60 rounded-sm hover:border-accent/30 transition-all duration-200`

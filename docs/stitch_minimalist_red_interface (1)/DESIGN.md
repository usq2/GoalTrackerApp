---
name: Titanium Multi-tone
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-charcoal: '#1c1b1b'
  success-sage: '#10b981'
  warning-amber: '#f59e0b'
  danger-crimson: '#ef4444'
  titanium-highlight: '#334155'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  2xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is a high-performance, professional framework designed for deep work, precision, and clarity. It transitions from the high-energy neon of its predecessor to a more grounded, authoritative, and mature aesthetic. The brand personality is industrious and disciplined, evoking the feeling of high-end aerospace engineering or premium productivity hardware.

The design style is **Minimalism** with a **Corporate Modern** sensibility. It prioritizes content through a "Dark-First" philosophy, utilizing a wide multi-tone palette to communicate status and hierarchy without the need for visual noise. All decorative glow effects, neon saturations, and outer shadows are removed in favor of structural integrity, crisp edges, and sophisticated tonal shifts. The interface aims for a "Precision Tool" emotional response: reliable, cold to the touch, yet exceptionally capable.

## Colors

The palette is built on a foundation of "Titanium" grays and deep obsidian blacks to ensure maximum contrast and reduced ocular fatigue.

- **Primary (Slate Blue):** The engine of the UI. Used for active states, primary actions, and key navigation elements.
- **Secondary (Graphite Gray):** Used for utility actions, supportive text, and non-critical UI scaffolding.
- **Semantic Multi-tone:**
  - **Sage Green:** Exclusively for success states, task completion, and healthy system status.
  - **Amber:** Used for attention-requiring alerts or non-blocking warnings.
  - **Crimson:** Reserved for critical risks, errors, and destructive actions.
- **Surface Strategy:** The background is anchored at `#0b0b0b` (Obsidian). Secondary surfaces and containers use `#1c1b1b` (Charcoal) to create a subtle perceived depth. High-tier overlays use `#334155` to represent a metallic, titanium-like sheen.

## Typography

This design system exclusively uses **Hanken Grotesk** to maintain a unified, high-performance aesthetic. The font's geometric clarity ensures legibility at small sizes while providing a bold, "machined" look for headlines.

- **Scale:** High contrast between weights is encouraged. Headlines use `700` or `600` weight to stand out against the deep dark background.
- **Labels:** Unlike the previous iteration, labels now use Hanken Grotesk with a semi-bold weight and slight letter spacing to maintain professional consistency without the tech-heavy "code" feel of a monospaced font.
- **Hierarchy:** Use white or high-purity gray for primary text, and Secondary (Graphite) for de-emphasized body text or metadata.

## Layout & Spacing

This design system utilizes an **8px linear spacing scale**. The layout is designed to be rigid and structured, mirroring the precision of a titanium build.

- **Grid:** A standard 12-column fluid grid for desktop with a maximum content width of 1440px. Gutters are fixed at 24px to maintain consistent "air" between components.
- **Rhythm:** Use `lg` (24px) for most internal component padding and `xl` (48px) for vertical section spacing.
- **Reflow:** On mobile, the grid collapses to 4 columns. Side margins reduce from 48px to 16px to maximize the available density of information.

## Elevation & Depth

Elevation is conveyed strictly through **Tonal Layers** and **Low-Contrast Outlines**. All shadows and glows are prohibited to maintain a flat, industrial aesthetic.

- **Stacking:** The base layer is Obsidian. Interactive elements or secondary containers use Charcoal. Floating elements (modals, dropdowns) use a Charcoal fill with a `1px` solid Graphite or Slate border to provide definition.
- **Hierarchy through Luminance:** The "closer" an object is to the user, the slightly lighter its surface becomes. Do not use blur or opacity; use solid color shifts.
- **Borders:** Use subtle `1px` borders (`#334155`) to define edges where tonal contrast between layers is low. This replaces the use of shadows for depth.

## Shapes

The shape language is modern and structured. We use a **Rounded (0.5rem / 8px)** corner radius as the standard across the system.

- **Base Components:** Buttons, inputs, and list items use the standard 8px radius.
- **Container Elements:** Large cards and modals should use 16px (`rounded-lg`) to create a distinct frame for content.
- **Interactive States:** Avoid "pill" shapes for standard buttons to maintain a more professional, "squared" industrial feel; reserve full rounding only for status badges or avatars.

## Components

- **Buttons:** Primary buttons are solid Slate Blue with white text. Secondary buttons are Charcoal with a Graphite border. No shadows or glows are used on hover; instead, use a subtle background color lightening.
- **Input Fields:** Use Charcoal background with a 1px Graphite border. On focus, the border changes to Slate Blue. Avoid any inner or outer glows.
- **Status Chips:** Use a tonal background of the semantic colors (e.g., a 15% opacity Sage Green background with solid Sage Green text) to communicate status clearly and professionally.
- **Cards:** Cards are defined by their Charcoal background and 1px border. They should never feature an outer shadow.
- **Checkboxes & Radios:** Use Slate Blue for the active state. The "check" or "dot" should be high-contrast white.
- **Lists:** Differentiate list items with a 1px horizontal divider in Charcoal or a simple background hover state using the Titanium Highlight color.
- **Data Visualizations:** Use the full multi-tone palette (Sage, Amber, Crimson, Slate) to categorize data, ensuring each color has a distinct functional meaning.

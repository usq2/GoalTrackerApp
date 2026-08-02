# Daily Goals App - Design Tokens & System

## Overview

This document defines all design tokens used in the Daily Goals App UI. These tokens ensure consistency across all screens and make it easy to maintain and update the design.

---

## Color Palette

### Primary Accent Colors

These colors are used for interactive elements and visual coding without semantic meaning (purely visual/functional distinction).

```
--primary-blue:    #378ADD     (Time blocks, Primary actions)
--primary-teal:    #1D9E75     (Timetable blocks, Success states)
--primary-orange:  #D85A30     (Deep work, Attention elements)
--primary-amber:   #BA7517     (Warnings, Secondary highlights)
--primary-purple:  #534AB7     (Premium features, Accents)
--primary-coral:   #D97757     (Warm accents, Secondary CTA)
--primary-pink:    #D4537E     (Soft accents)
--primary-green:   #639922     (Health, Exercise, Positive actions)
```

### Neutral Color Ramp

Used for text, backgrounds, and borders. Provides sufficient contrast for accessibility.

```
--neutral-900:  #0B0B0B      (Darkest - Primary text)
--neutral-800:  #2C2C2A      (Dark - Secondary text)
--neutral-700:  #444441      (Medium-dark)
--neutral-600:  #5F5E5A      (Medium - Secondary text, disabled)
--neutral-500:  #888780      (Medium-light - Muted text)
--neutral-400:  #B4B2A9      (Light - Borders)
--neutral-300:  #D3D1C7      (Lighter - Hairline borders)
--neutral-200:  #E8E6DF      (Even lighter)
--neutral-100:  #F1EFE8      (Very light)
--neutral-50:   #F9F8F5      (Lightest - Page background)
--white:        #FFFFFF      (Pure white - Card backgrounds)
```

### Semantic Surface Layers

Establishes visual hierarchy through elevation.

```
--surface-0:  #F9F8F5    (Page/Canvas background - lowest)
--surface-1:  #FFFFFF    (Cards, surfaces - default)
--surface-2:  #F1EFE8    (Grouped content, form fields - slightly raised)
--surface-3:  #E8E6DF    (Hover states, elevated content)
```

### Text Colors

```
--text-primary:    #0B0B0B    (Main body text, headings)
--text-secondary:  #5F5E5A    (Supporting copy, descriptions)
--text-muted:      #888780    (Metadata, helper text, disabled)
--text-accent:     #378ADD    (Links, active states, focus)
```

### Semantic/Status Colors

```
--success-color:   #639922    (Checkmarks, positive feedback)
--warning-color:   #BA7517    (Cautions, attention needed)
--danger-color:    #C81B14    (Errors, destructive actions)
```

### Border Colors

```
--border-color:    #D3D1C7    (Default 0.5px hairline)
--border-strong:   #B4B2A9    (Hover, emphasis, 0.5px)
```

---

## Typography

### Font Families

```css
--font-sans:    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, sans-serif
                (Primary UI font - clean, readable, system native)

--font-display: 'Segoe UI', 'Helvetica Neue', sans-serif
                (Alternative for mission headline)

--font-mono:    'Monaco', 'Menlo', monospace
                (Code, data, technical content)
```

### Type Scale

#### Headings

- **Display/Mission Headline**: 48px, weight 600, line-height 1.1, letter-spacing -0.5px
- **Page Title (Header)**: 18px, weight 500, line-height 1.4
- **Section Header**: 16px, weight 500, line-height 1.4
- **Card Title**: 14px, weight 500, line-height 1.4

#### Body Text

- **Body (default)**: 14px, weight 400, line-height 1.5
- **Body Small**: 13px, weight 400, line-height 1.5
- **Metadata/Caption**: 12px, weight 400, line-height 1.4
- **Label/Overline**: 11px, weight 600, line-height 1.3, text-transform uppercase, letter-spacing 0.5px

#### UI Elements

- **Checkbox Label**: 14px, weight 500, line-height 1.4
- **Time Label**: 11px, weight 600, letter-spacing 0.5px
- **Nav Item**: 12px, weight 400 (active: weight 500)

---

## Spacing System

Consistent spacing creates visual rhythm and improves scanability.

```
--space-xs:   4px     (Minimal gap, tight grouping)
--space-sm:   8px     (Small gap between related items)
--space-md:   12px    (Default item padding, gaps)
--space-lg:   16px    (Section padding, header/footer)
--space-xl:   24px    (Large section breaks, vertical rhythm)
--space-2xl:  32px    (Major section separators)
```

### Common Spacing Patterns

**Card/Container Padding**

- Horizontal: `var(--space-lg)` (16px)
- Vertical: `var(--space-lg)` (16px)
- Combined: `16px 16px`

**Section Margin**

- Top margin: `var(--space-xl)` (24px)
- Bottom margin: `var(--space-md)` (12px)

**Item Gaps**

- List items: `var(--space-md)` (12px) gap
- Grid/flex children: `var(--space-md)` (12px) gap

---

## Border Radius

```
--radius-sm:    4px     (Time blocks, small components)
--radius-md:    6px     (Buttons, input fields, items)
--radius-lg:    8px     (Cards, containers, large components)
--radius-pill:  20px    (Badges, rounded pills)
```

---

## Shadow System

Used sparingly for elevation and focus states.

```
--shadow-sm:    0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md:    0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg:    0 10px 15px rgba(0, 0, 0, 0.1)
```

### Usage

- `--shadow-sm`: Focus states on form elements
- `--shadow-md`: Card hover states, floating elements
- `--shadow-lg`: Drawer when open, modal backgrounds

---

## Component Tokens

### Buttons

- **Background (default)**: Transparent
- **Border**: `0.5px solid var(--border-color)`
- **Text Color**: `var(--text-primary)`
- **Border Radius**: `var(--radius-md)` (6px)
- **Padding**: `8px 16px`
- **Hover State**: `background: var(--surface-2)`
- **Active State**: `transform: scale(0.98)`

### Form Fields (Checkbox, Input)

- **Background**: `var(--surface-2)`
- **Border**: `0.5px solid var(--border-color)`
- **Border Radius**: `var(--radius-md)` (6px)
- **Padding**: `12px 12px`
- **Hover**: `border-color: var(--border-strong)`
- **Accent Color**: `var(--primary-blue)`

### Cards

- **Background**: `var(--surface-2)` or `var(--surface-1)`
- **Border**: `0.5px solid var(--border-color)`
- **Border Radius**: `var(--radius-lg)` (8px) for large cards, `var(--radius-md)` (6px) for items
- **Padding**: `16px 12px` or `16px 16px`
- **Shadow**: `--shadow-sm` on focus

### Time Blocks

- **Background**: `var(--surface-2)`
- **Border**: `0.5px solid var(--border-color)`, left border 4px with color
- **Border Radius**: `var(--radius-sm)` (4px)
- **Left Border Colors** (rotate through):
  - `#378ADD` (blue)
  - `#639922` (green)
  - `#D85A30` (orange)
  - `#1D9E75` (teal)
  - `#BA7517` (amber)

### Checkbox Items

- **Background**: `var(--surface-2)`
- **Border**: `0.5px solid var(--border-color)`
- **Border Radius**: `var(--radius-md)` (6px)
- **Padding**: `12px 12px`
- **Checkbox Size**: 18px × 18px
- **Accent Color**: `var(--primary-blue)`

### Navigation Items

- **Default Text Color**: `var(--text-secondary)`
- **Active Text Color**: `var(--text-accent)`
- **Active Indicator**: 2px bar above icon (accent color)
- **Hover Background**: `var(--surface-2)`
- **Height**: 70px total

### Drawer

- **Width**: 280px
- **Background**: `var(--surface-1)`
- **Border**: `0.5px solid var(--border-color)` (right side)
- **Animation**: 300ms ease slide-in from left
- **Overlay**: `rgba(0, 0, 0, 0.4)`

### Header

- **Background**: `var(--surface-1)`
- **Border Bottom**: `0.5px solid var(--border-color)`
- **Height**: 56px (auto with padding)
- **Padding**: `12px 16px`
- **Flex Layout**: Items centered with title on left

---

## Layout Grid

### Container Structure

```
App Height: 100vh (100% of viewport)
  ├── Header: Auto (56px typical)
  ├── Content Area: Flex 1 (fill available)
  │   └── Padding: 16px all sides
  └── Bottom Navigation: 70px (fixed)
```

### Content Spacing

- **Top/Bottom Padding**: `16px`
- **Left/Right Padding**: `16px`
- **Max Width**: Full width (mobile-first design)
- **Gap between sections**: `24px`

---

## Animation & Transition

### Durations

- **Quick interaction**: 200ms (button hover, tab switch)
- **Medium transition**: 300ms (drawer open/close, fade in)
- **Slow reveal**: 400ms+ (page load effects)

### Easing

```css
ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94)   (default)
ease-out:    cubic-bezier(0, 0, 0.2, 1)              (dismissal, fade out)
ease-in:     cubic-bezier(0.4, 0, 1, 1)              (entrance)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)            (continuous motion)
```

### Common Transitions

- **Tab switching**: Fade in 200ms ease
- **Drawer**: Transform 300ms ease (translateX)
- **Hover states**: All 200ms ease
- **Click feedback**: Scale 98% on active

---

## Responsive Breakpoints

### Mobile (< 640px)

- Full width layout
- 48px+ touch targets
- 16px padding (already default)
- Drawer width: 100% (full screen)
- Mission headline: 36px (down from 48px)
- Simplified navigation

### Tablet (640px - 1024px)

- Standard layout maintained
- Optional sidebar adaptation

### Desktop (> 1024px)

- Can add fixed sidebar option
- Wider content area

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards:

- Primary text on surface: 10:1+ contrast ratio
- Secondary text on surface: 6:1+ contrast ratio
- Interactive elements: 4.5:1+ minimum

### Touch Targets

- Minimum size: 44px × 44px
- Padding around interactive elements

### Focus States

- Visible focus ring: 2px solid `var(--primary-blue)`
- Clear visual indication on all interactive elements

### Motion

- Respects `prefers-reduced-motion` media query
- Animations disabled if user preference set

---

## Usage Examples

### Mission Headline

```css
font-size: 48px;
font-weight: 600;
line-height: 1.1;
color: var(--text-primary);
letter-spacing: -0.5px;
margin: 32px 0 16px 0;
```

### Time Block

```css
background: var(--surface-2);
border: 0.5px solid var(--border-color);
border-left: 4px solid var(--primary-blue);
border-radius: var(--radius-sm);
padding: 12px;
margin-bottom: 12px;
transition: all 200ms ease;
```

### Section Header

```css
font-size: 16px;
font-weight: 500;
color: var(--text-primary);
margin: 24px 0 12px 0;
```

### Checkbox Item

```css
display: flex;
gap: 12px;
padding: 12px;
background: var(--surface-2);
border-radius: var(--radius-md);
border: 0.5px solid var(--border-color);
cursor: pointer;
transition: all 200ms ease;
```

---

## Dark Mode Support

While the current design uses light mode exclusively, these tokens are structured to support future dark mode implementation:

- Neutral colors are positioned on a perceptual scale (900 = darkest, 50 = lightest)
- Surface layers maintain consistent light-to-dark progression
- All text colors already use named tokens (not hex), ready for mode switching
- Consider inverting neutral ramp in dark mode: `--text-primary: #F9F8F5` etc.

---

## Design System Principles

1. **Purposeful Color**: Each color has a specific function (accent, status, surface elevation)
2. **Readable Typography**: Type scale is limited to 8 sizes with clear hierarchy
3. **Generous Spacing**: Breathing room reduces cognitive load
4. **Consistent Interaction**: Buttons, fields, and touch targets follow unified patterns
5. **Accessible Contrast**: All combinations meet WCAG standards
6. **Performance**: Minimal shadows and animations; prefer opacity/color changes
7. **Semantic Markup**: Structure reflects content importance, not style

---

## File Structure Reference

The HTML file (`daily-goals-app.html`) implements these tokens via CSS custom properties in the `:root` selector. To modify the design:

1. **Colors**: Update hex values in CSS variables
2. **Typography**: Adjust font-size/weight in component classes
3. **Spacing**: Modify `--space-*` values for consistent re-scaling
4. **Borders**: Change `--radius-*` or `--border-color` globally
5. **Animations**: Update transition durations and easing curves

All changes propagate automatically to dependent components.

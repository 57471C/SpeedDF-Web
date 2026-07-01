---
name: speedDF
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb873'
  on-tertiary: '#4b2800'
  tertiary-container: '#e89337'
  on-tertiary-container: '#5b3200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb873'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#080e1c'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  surface-1: '#0f172a'
  surface-2: '#1e293b'
  surface-3: '#334155'
  slate-50: '#f8fafc'
  text-primary: '#f8fafc'
  text-secondary: '#94a3b8'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  '2xl': 1rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

# speedDF — Design System
## Identity
**speedDF** is a modern PDF viewer/editor built around one idea: speed. The visual identity reflects that — nothing decorative, nothing slow. Dark slate ground, a single cyan accent, and a lightning bolt that means what it says.
---
## Color
### Core Palette
| Token | Hex | Role |
|-------|-----|----------|
| `slate-950` | `#0f172a` | App icon tile, badge bg |
| `slate-800` | `#1e293b` | Document body surface |
| `slate-700` | `#334155` | Strokes, page lines, fold shadow |
| `cyan-500` | `#06b6d4` | Lightning bolt, primary accent |
| `sky-400` | `#38bdf8` | Bolt inner highlight / gradient start |
| `slate-50` | `#f8fafc` | PDF file icon page body |
| `background` | `#080e1c` | page/window background |

### Accent Usage
Cyan is the **only** chromatic color in the system. It appears exclusively on:
- The lightning bolt in the app icon
- The lightning bolt in the PDF file icon badge
- Interactive states in the UI (hover, focus rings, active tabs)

### Dark Mode
The application is dark-mode native. There is no light mode variant. All surfaces use the slate scale; no pure blacks or pure whites.
---
## Typography
### Typefaces
| Face | Weight | Use |
|------|--------|-----|
| **Space Grotesk** | 500, 700 | Headings, labels, brand wordmark |
| **Inter** | 400, 500, 600, 700 | Body, UI controls, data |

### Wordmark
`speed` in slate-100, `DF` in cyan-400.
---
## Application UI Principles
### Surface Hierarchy
```
Background   #080e1c   ← page/window background
Surface 1    #0f172a   ← panels, sidebars
Surface 2    #1e293b   ← cards, input areas
Surface 3    #334155   ← dividers, borders, inactive states
```
### Spacing
Base unit: **4px**. All spacing is a multiple of 4. Prefer 8, 12, 16, 24, 32, 48.
---
## Design Constraints
1. **One accent color.** Cyan only.
2. **No gradients in the UI.** Gradients belong to the icons only. App surfaces use flat slate.
3. **Fluid and responsive corners.** Support rounded corners up to fully fluid corners (`rounded-2xl`) and pill-shaped elements (`rounded-full`) for a premium SaaS look.
4. **Dark mode only.**

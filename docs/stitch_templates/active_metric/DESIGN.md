---
name: Active Metric
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b25'
  surface-container: '#1d1f29'
  surface-container-high: '#282934'
  surface-container-highest: '#32343f'
  on-surface: '#e1e1ef'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#004ced'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffb4a1'
  on-tertiary: '#611300'
  tertiary-container: '#bf3003'
  on-tertiary-container: '#ffddd5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbd2'
  tertiary-fixed-dim: '#ffb4a1'
  on-tertiary-fixed: '#3c0800'
  on-tertiary-fixed-variant: '#891e00'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343f'
typography:
  display-score:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  gutter: 12px
  card-gap: 16px
  touch-target-min: 44px
---

## Brand & Style

The design system is engineered for high-stakes clarity and athletic precision. It targets competitive social groups and tournament organizers who require instantaneous data entry and clear performance visibility. The aesthetic is **Corporate / Modern** with a lean toward **Minimalism**, ensuring that the interface never competes with the data it presents. 

In its dark-mode configuration, the system provides a focused, "command-center" atmosphere. The emotional response should be one of "effortless control." By utilizing a card-based architecture and a generous clear-space rhythm, the UI evokes the organized, professional feel of a premium fitness or finance application. It avoids unnecessary flourish, focusing instead on functional density and tactile feedback.

## Colors

This design system utilizes a high-utility dark palette rooted in "Action Blue" for primary interactions and navigational cues. The dark mode background uses a deep grayscale spectrum to provide a high-contrast, focused canvas for mobile use in various lighting conditions.

Participant differentiation is handled via a spectrum of vibrant, high-saturation accent colors. These accents must be used sparingly—primarily for player avatars, score indicators, and chart lines—to maintain the professional aesthetic of the environment. All primary actions remain consistent in the primary blue to ensure they are the most legible and actionable elements on the dark canvas.

## Typography

**Lexend** is selected as the sole typeface for the design system due to its origins in reading proficiency and its exceptional clarity in numerical display. Its expanded character widths and open counters make it ideal for quick glances at scores on mobile devices, particularly as light text on a dark background.

- **Numbers:** Use `display-score` for active totals. Bold weights ensure numbers remain legible even in high-glare outdoor environments.
- **Hierarchy:** Use `label-caps` (Uppercase) for category headers and table labels to create a distinct visual break from user-generated content.
- **Readability:** Body text maintains a 1.5 line-height to ensure participant names and historical logs are easily scannable.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for one-handed mobile use. It relies on a 4px baseline grid to ensure mathematical harmony across all components.

- **Safe Zones:** A standard 16px horizontal margin is applied to the main viewport.
- **Touch Targets:** All interactive elements, specifically score increment/decrement buttons, must adhere to a minimum 44px square area.
- **Scanning Rhythm:** Information is grouped into vertical stacks. Content-heavy views (like leaderboards) should use 12px gutters between list items to maintain clear separation without wasting vertical screen real estate.

## Elevation & Depth

In this dark-themed system, elevation is primarily conveyed through **Tonal Layers**, where higher surfaces are represented by lighter shades of gray. This creates a sense of physical hierarchy that is native to dark UI patterns.

- **Level 0 (Background):** The base layer uses the deep background tone (`#111318`).
- **Level 1 (Cards):** Primary content containers use a slightly lighter gray (`#1d1f24`) to separate the data from the canvas.
- **Level 2 (Modals/Overlays):** Active inputs or pop-overs use a more elevated tone (`#33353a`) to pull the element toward the user.
- **Interactive Depth:** Buttons should use a subtle inner glow or a more vibrant shade on tap to provide haptic-like visual feedback, maintaining the system's sleek, modern feel.

## Shapes

The shape language is **Rounded**, favoring an approachable but disciplined look. 

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Containers:** Large cards and statistics modules use a 1rem (16px) radius to soften the edges of the data-heavy layout.
- **Avatars:** Participant identifiers should be perfectly circular (pill-shaped) to contrast against the rectangular grid of the card-based layout.

## Components

### Cards
Cards are the primary organizational unit, defined by their elevated surface color. Every card should have a consistent 16px internal padding. Header sections within cards should use a subtle bottom border to separate titles from the data body.

### Score Inputs
Use "Stepper" style controls for rapid score adjustment. These consist of a central numerical value flanked by large `-` and `+` buttons. The buttons should use the `Primary Blue` for positive increments and a muted neutral for decrements to emphasize progress.

### Participant Chips
Small, rounded indicators used in lists. These must incorporate the participant's assigned accent color as a left-side "status bar" or a circular color swatch next to the name to ensure visibility against the dark background.

### Statistics Visuals
Progress bars and bar charts should use a "Soft Fill" (20% opacity of the accent color) for the track and 100% opacity for the progress value. All bars must have rounded caps to match the system's shape language.

### Buttons
- **Primary:** Filled Primary Blue with high-contrast text.
- **Secondary:** Outlined Blue or Gray with a 1px border.
- **Ghost:** No background/border, used for "Cancel" or "Back" actions to minimize visual noise.
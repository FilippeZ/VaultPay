---
name: Neo-Fiduciary
colors:
  surface: '#0f141b'
  surface-dim: '#0f141b'
  surface-bright: '#353942'
  surface-container-lowest: '#090e15'
  surface-container-low: '#171c23'
  surface-container: '#1b2027'
  surface-container-high: '#252a32'
  surface-container-highest: '#30353d'
  on-surface: '#dee2ed'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dee2ed'
  inverse-on-surface: '#2c3139'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#7dffa2'
  on-secondary: '#003918'
  secondary-container: '#05e777'
  on-secondary-container: '#00622e'
  tertiary: '#f3f5ff'
  on-tertiary: '#283141'
  tertiary-container: '#d0d9ee'
  on-tertiary-container: '#565f71'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#62ff96'
  secondary-fixed-dim: '#00e475'
  on-secondary-fixed: '#00210b'
  on-secondary-fixed-variant: '#005226'
  tertiary-fixed: '#dae2f8'
  tertiary-fixed-dim: '#bec7db'
  on-tertiary-fixed: '#131c2b'
  on-tertiary-fixed-variant: '#3e4758'
  background: '#0f141b'
  on-background: '#dee2ed'
  surface-variant: '#30353d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  gutter: 16px
---

## Brand & Style
The design system is engineered for the high-stakes world of digital finance, where security must meet hyper-modernity. The brand personality is **authoritative yet agile**, evoking a sense of institutional stability through a "Dark Mode First" philosophy. 

The aesthetic blends **Corporate Modern** with **Subtle Glassmorphism**. It avoids the playfulness of typical consumer apps in favor of a "Financial Cockpit" feel—precise, high-density, and premium. Surfaces are deep and layered, using light and transparency to guide the eye rather than loud colors. The emotional response should be one of total control and sophisticated wealth management.

## Colors
The palette is built on a foundation of **Deep Charcoal (#0A0F16)** and **Navy-tinted Slate (#101928)** to establish a secure, "vault-like" environment. 

- **Primary (Neon Blue):** Used for primary actions, progress indicators, and active states. It represents the "electric" nature of instant digital transactions.
- **Secondary (Emerald Green):** Reserved exclusively for financial growth, positive balances, and successful confirmations.
- **Accents:** Use high-contrast white for primary text and a muted steel-blue for secondary information. 
- **Functional Colors:** Error states use a sharp, vibrant Crimson (#FF3B30) to ensure immediate visibility against the dark backdrop.

## Typography
The system utilizes **Inter** for its exceptional legibility and systematic feel across all UI elements. To lean into the "high-tech" requirement, **Geist** is introduced for labels and monospaced data (account numbers, transaction amounts), providing a developer-grade precision to the financial data.

- **Headlines:** Should use tight letter-spacing to feel impactful and modern.
- **Numerical Data:** Always use tabular figures to ensure columns of currency align perfectly in lists and tables.
- **Hierarchy:** Use font weight rather than size to differentiate importance, maintaining a clean, streamlined look.

## Layout & Spacing
This design system employs a **4px baseline grid** for micro-spacing and a **12-column fluid grid** for desktop, collapsing to a **single column with 24px side margins** on mobile.

- **Financial Density:** Space should be used to separate "modules" of information. High-value data (Total Balance) gets significant breathing room (stack-lg), while transaction lists use compact spacing (stack-sm) to show more history at once.
- **Safe Areas:** Ensure all interactive elements maintain a minimum 44px hit target, even if the visual representation is smaller.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism**, not traditional drop shadows.

- **Level 0 (Base):** Deep Charcoal (#0A0F16).
- **Level 1 (Cards/Modules):** Navy Slate (#101928) with a 1px stroke of white at 10% opacity.
- **Level 2 (Overlays/Modals):** Semi-transparent Navy Slate with a 20px background blur (backdrop-filter) and a subtle inner glow on the top edge to simulate light hitting the rim of the glass.
- **Borders:** Use "Ghost Borders"—ultra-thin (1px) lines with low-opacity (15-20%) primary or neutral colors to define boundaries without adding visual bulk.

## Shapes
A consistent **16px (rounded-lg)** corner radius is applied to all primary containers and cards to soften the technical edge of the app. 

- **Buttons:** Use 12px roundedness for a slightly more compact, focused look.
- **Inputs:** Match the button radius (12px).
- **Status Indicators:** Use fully circular (pill-shaped) enclosures for chips and tags to contrast against the more structural card shapes.

## Components
- **Buttons:** 
  - *Primary:* Solid Neon Blue with black text for maximum contrast. No shadow.
  - *Secondary:* Ghost style with 1px Neon Blue border and subtle glass background.
- **Cards:** Use the Level 1 elevation specs. The card header should feature a monoline icon in Neon Blue.
- **Transaction Lists:** Clean rows with 1px bottom dividers (10% white). Left-aligned merchant name (Inter Bold), right-aligned amount (Geist Mono).
- **Input Fields:** Darker than the background surface with a 1px border that glows (box-shadow: 0 0 8px) in Neon Blue when focused.
- **Glass Chips:** Small, semi-transparent labels for categories (e.g., "Food", "Travel") with a subtle backdrop blur.
- **Data Visualization:** Line charts should use a Neon Blue stroke with a soft gradient fill (Primary to Transparent) and no grid lines for a minimalist look.
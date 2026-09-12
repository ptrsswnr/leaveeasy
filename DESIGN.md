---
name: LeaveEasy
description: ระบบขอลาออนไลน์ — ธีม Claymorphism สดใส สนุกสนาน
colors:
  primary: "#8b5cf6"
  primary-deep: "#7c3aed"
  neutral-bg: "#efe9ff"
  neutral-line: "#ddd3fb"
  neutral-text: "#362a5e"
  neutral-muted: "#7c6fa0"
  danger: "#fb7185"
  success: "#34d399"
  status-pending-bg: "#fef3c7"
  status-pending-text: "#92400e"
  status-approved-bg: "#d1fae5"
  status-approved-text: "#065f46"
  status-rejected-bg: "#fecdd3"
  status-rejected-text: "#9f1239"
  status-ai-bg: "#ddd6fe"
  status-ai-text: "#4c1d95"
  neutral-surface-input: "#ffffff"
typography:
  numeral:
    fontFamily: "'Leelawadee UI', 'Sarabun', 'Segoe UI', 'Noto Sans Thai', sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.2
  display:
    fontFamily: "'Leelawadee UI', 'Sarabun', 'Segoe UI', 'Noto Sans Thai', sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.3
  title:
    fontFamily: "'Leelawadee UI', 'Sarabun', 'Segoe UI', 'Noto Sans Thai', sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: "'Leelawadee UI', 'Sarabun', 'Segoe UI', 'Noto Sans Thai', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Leelawadee UI', 'Sarabun', 'Segoe UI', 'Noto Sans Thai', sans-serif"
    fontSize: "15px"
    fontWeight: 700
rounded:
  sm: "14px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  sm: "12px"
  md: "18px"
  lg: "28px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-ghost:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.md}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  button-ok:
    backgroundColor: "{colors.success}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "22px"
  badge-pending:
    backgroundColor: "{colors.status-pending-bg}"
    textColor: "{colors.status-pending-text}"
    rounded: "{rounded.pill}"
---

# Design System: LeaveEasy

## Overview

**Creative North Star: "The Clay Workshop"**

LeaveEasy's screens read like soft clay tiles pressed into a lavender tabletop — every card, button, table row, and stat tile is molded from the same pale-violet material as the page itself, and the only thing that tells one shape from another is light: a soft highlight catching its raised top-left edge, a soft shadow pooling at its bottom-right. Nothing is drawn with a hard line. The system is playful and tactile without being loud — the primary violet is reserved for things you can act on (buttons, links, the active nav item), so the calm lavender ground never fights for attention with the one color that means "press me."

This is an internal HR tool for a small workplace (20–100 people), not a marketing surface, so the fun stays in texture and touch rather than motion or noise: a button visibly presses inward when clicked, a table row presses in when you hover it, a form field sits in a crisp white slot so typing is never in doubt against the lavender field around it.

**Key Characteristics:**
- Every surface (cards, buttons at rest, stat tiles, nav) shares the page's own lavender fill — depth comes only from paired soft shadows, never a second background color.
- Zero hairline borders anywhere except a 2px white ring around form fields, which exists purely so a field reads as legible on the lavender ground.
- Status is still color-coded (amber/green/rose), but every status pill and alert is now a soft pill or rounded card with its own gentle shadow instead of a 1px tinted border.

## Colors

A single monochromatic lavender fills the whole page and every surface on it; a single saturated violet carries every actionable element, and warm status hues (amber/green/rose) stay reserved for meaning, never decoration.

### Primary
- **Workshop Violet** (`#8b5cf6`): every button, link, active nav state, and stat-tile number. The one color a user should read as "this does something."
- **Workshop Violet, Deep** (`#7c3aed`): link hover, nav hover/active text, button-ghost's label color.

### Neutral
- **Clay Lavender** (`#efe9ff`): the page background and the fill of every card, button-ghost, stat tile, table row, and the navbar — the monochrome surface the whole system is molded from.
- **Soft Lavender Line** (`#ddd3fb`): the only place a literal line survives — the comment left-rule and the dashed divider between detail-page field rows.
- **Ink Violet** (`#362a5e`): primary text color, deep enough to read clearly on both white and lavender.
- **Dusty Plum** (`#7c6fa0`): secondary text — subtitles, hints, table headers, comment metadata.
- **Field White** (`#ffffff`): the deliberate one-off surface for form fields only (see the No-Border Rule) — never used for cards, buttons, or any other surface.

### Named Rules
**The No-Border Rule.** Every boundary is drawn by a paired soft shadow (a light highlight top-left, a soft dark shadow bottom-right), never a 1px border. The single exception is the 2px white ring on form fields — that ring exists to keep a field legible against the lavender ground, not to draw a boundary, and it turns violet on focus instead of gaining an outline.

**The Monochrome Surface Rule.** Cards, buttons-at-rest (ghost variant), stat tiles, table rows, and the navbar all share the page's own lavender fill. Nothing gets a second "surface color" — depth comes from shadow, and color stays reserved for what the user can act on.

## Typography

**Body/Display Font:** Leelawadee UI, with Sarabun, Segoe UI, Noto Sans Thai, sans-serif as fallbacks (one stack for the whole system — no separate display face).

**Character:** Plain and legible first; weight (800 on headings, numbers, labels) does the job a second display face would otherwise do.

### Hierarchy
- **Display** (800, 30px, 1.3): page `<h1>` titles.
- **Title** (800, 22px, 1.3): section `<h2>` headings.
- **Numeral** (800, 44px, 1.2): the big count on dashboard stat tiles only.
- **Body** (400, 17px, 1.7): all running text and form input text; drops to 16px under 640px.
- **Label** (700, 15px): field labels, subtitles, hints, table headers, badges (14px).

## Layout

Single-column content capped at 960px, centered, with generous outer padding (28px top, 16px sides, 60px bottom; tightens to 20/12/50px under 640px). Table rows are not a flat grid — each `<tr>` is its own rounded, shadowed pill with 10px vertical spacing between rows (`border-spacing: 0 10px`), so a table reads as a stack of clay chips rather than a bordered grid. One breakpoint (640px) collapses the nav's user block to full width and shrinks table cell padding/text.

## Elevation & Depth

The system has no flat surfaces and no drop-shadow-as-afterthought either — depth is the entire visual language. Every raised element (cards, buttons, stat tiles, badges, alerts, table rows) carries a paired directional shadow: a soft dark shadow bottom-right (`rgba(139,122,191,.45)`) and a soft light highlight top-left (`rgba(255,255,255,.85)`), simulating material pressed up out of the lavender ground. Pressed/active states invert this into a single inset dark shadow, and form fields and a hovered clickable table row use a full inset pair (light+dark) to read as pressed *into* the surface rather than resting on it.

### Shadow Vocabulary
- **Card-raised** (`10px 10px 22px var(--เงาเข้ม), -10px -10px 22px var(--เงาสว่าง)`): cards.
- **Row/Button-raised** (`5px–6px` offset, same pair, smaller blur): table rows, buttons, badges, alerts.
- **Field-inset** (`inset 3px 3px 8px var(--เงาเข้ม), inset -3px -3px 8px var(--เงาสว่าง)`): form fields at rest.
- **Pressed-inset** (`inset 4px 4px 10px rgba(0,0,0,.25)`): a button mid-click, or a clickable table row on hover.

### Named Rules
**The Light-From-Top-Left Rule.** Every shadow pair keeps its highlight top-left and its shadow bottom-right, system-wide — a light source never shifts direction between components, or the clay illusion breaks.

## Shapes

Corners are consistently rounded and scale with the element's importance: 24px on cards, 20px on stat tiles, 14–16px on buttons/inputs/table-row corners, and full pill (999px) on badges. No sharp corners, no borders standing in for shape — radius plus shadow is the entire form language.

## Components

### Buttons
- **Shape:** 16px radius, 12px/24px padding, bold (700) label text.
- **Primary:** solid Workshop Violet fill, white text, raised shadow pair.
- **Hover / Focus:** lifts 2px (`translateY(-2px)`) and darkens slightly (`brightness(.95)`).
- **Active (pressed):** drops back to resting position and swaps to a single dark inset shadow — the system's one "pressed into clay" moment.
- **Ghost / Danger / Ok:** same shape and shadow language; ghost fills with the page's own lavender and violet-deep text, danger fills coral (`#fb7185`), ok fills mint (`#34d399`).

### Cards / Containers
- **Corner Style:** 24px.
- **Background:** the page's own Clay Lavender — never white, never a darker tint.
- **Shadow Strategy:** Card-raised (see Elevation).
- **Border:** none.

### Inputs / Fields
- **Style:** white fill (the one deliberate break from the monochrome-surface rule, for legibility), 14px radius, 2px white ring, Field-inset shadow.
- **Focus:** the 2px ring turns Workshop Violet; no separate outline or glow.

### Table Rows
- **Style:** each row is an individual Clay Lavender pill (16px radius, Row-raised shadow), not a bordered grid line.
- **Clickable state:** cursor becomes a pointer and hover swaps to a full inset shadow pair, reading as the row pressing inward.

### Badges / Status Pills
- **Style:** full-pill radius, small raised shadow, no border. Color still carries meaning: amber = รอพิจารณา, mint-green = อนุมัติ, rose = ไม่อนุมัติ.

### Navigation
- **Style:** shares the page's Clay Lavender fill rather than a solid brand-color bar; a soft shadow underneath separates it from the content below. Links are bold body text that turns Workshop Violet Deep on hover or when active — no underline, no pill highlight.

## Do's and Don'ts

### Do:
- **Do** keep every card/button-ghost/stat-tile/row on the same Clay Lavender fill as the page — depth from shadow only.
- **Do** keep the light-top-left / dark-bottom-right shadow direction consistent on every raised element.
- **Do** keep form fields white — it's the system's one deliberate surface-color exception, and it exists for legibility.
- **Do** keep the three status hues (amber/mint/rose) reserved for `รอพิจารณา` / `อนุมัติ` / `ไม่อนุมัติ` only — never reuse them decoratively.

### Don't:
- **Don't** add a 1px border anywhere as a substitute for a shadow pair — that breaks the clay illusion instantly.
- **Don't** give a card, stat tile, or button-ghost a background color different from the page background — a second "card color" contradicts the Monochrome Surface Rule.
- **Don't** introduce a second display typeface — the system carries its whole hierarchy on one font stack and font-weight alone.
- **Don't** flatten the pressed/active state to a plain color change — the inset-shadow "press" is this system's signature interaction; losing it makes buttons feel dead.

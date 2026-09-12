# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three roles, per `leaveeasy-spec.md` topic 2:
- **employee (ผู้ขอลา)** — submits leave requests, views their own requests.
- **manager (ผู้อนุมัติ)** — reviews every request, approves/rejects, comments.
- **hr (ฝ่ายบุคคล)** — everything a manager can do, plus manages leave types, assigns approvers, sees the org-wide summary.

## Product Purpose

LeaveEasy replaces paper forms, chat messages, and verbal leave requests at small workplaces, where requests get lost and nobody can confirm whether one was approved. It centralizes every leave request in one place: an employee submits it, a manager decides, and the outcome is recorded for everyone to look back on. Success is a single shared record — no lost requests, and a clear approve/reject history any role can check.

## Positioning

Narrowly scoped to the submit → review → decide → record loop for leave requests — not a general-purpose HR suite. Sized for a workplace of 20–100 people with 1–3 approving managers, so it should stay lightweight rather than grow enterprise-HRIS complexity.

## Operating Context

- Built incrementally as a course project (ADT-RAISE Non-Degree Batch 2, Module 2, weeks 6–9), following `leaveeasy-spec.md`. Feature scope for each week is locked by that spec; design work should not expand functionality beyond what the spec has unlocked so far without the user's explicit go-ahead — this applies to scope, not to visual/UX craft (see Product Principles).
- Runs entirely in the browser against Firebase — no custom backend server.
- Recently added an AI assistant (OpenRouter, `google/gemini-2.5-flash-lite`) that (a) suggests a leave type and a title from the typed reason, and (b) writes a short summary of a request for the approver to read. Both are advisory only — neither ever changes `status`; a human always makes and confirms the actual decision.

## Capabilities and Constraints

- **No framework, no build step** — plain HTML, CSS, and JavaScript only (explicitly no React/Vue/Tailwind/Next.js/bundler). This is a binding course requirement, not legacy debt to migrate away from.
- One `.html` file per screen; shared styling in `css/`; shared behavior in `js/`, loaded via plain `<script>` tags (no ES modules, no imports) so every page also opens directly via `file://`.
- Backend is Firebase only: Firestore (direct reads/writes from the browser), Firebase Authentication, Firebase Hosting.
- All on-screen copy is in Thai; field/file names are in English.
- Fixed set of leave types (currently ลาพักร้อน / ลาป่วย / ลากิจ, editable by `hr`) and exactly 3 status values (รอพิจารณา / อนุมัติ / ไม่อนุมัติ) with forward-only transitions — no reopening a decided request.

## Brand Commitments

Product name is **LeaveEasy** (Thai: ระบบขอลาออนไลน์), often paired with a 🔧 emoji in project docs.

## Evidence on Hand

All data in the running system is fictional placeholder data (see `js/data.js`) — the spec explicitly forbids real personal data (real names, phone numbers, ID numbers, or other sensitive info). Future work must not fabricate real testimonials, logos, or user photos; any sample content should stay consistent with the existing fictional Thai names already in use.

## Product Principles

1. One shared source of truth for every leave request — nothing gets lost to paper, chat, or memory.
2. Built for a small workplace's daily use (20–100 employees, 1–3 approvers) — resist enterprise-HR-suite complexity.
3. AI suggestions are advisory only. A human always makes and confirms the real decision — leave type, title, and especially approve/reject.
4. The user has asked design work to aim for full production quality, not a scaled-down "student project" look — but that ambition is about craft and UX polish, never about adding functionality beyond what `leaveeasy-spec.md`'s current week unlocks.
5. Must keep running with zero build step and zero custom backend — plain HTML/CSS/JS plus Firebase, openable via `file://` or a static file server.

## Accessibility & Inclusion

Not explicitly established in the spec — no confirmed requirement yet.

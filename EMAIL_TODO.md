# Email flows — status and TODO

Working doc for planning transactional email (contact, beta, investor) and team notifications.

---

## Quick summary

| Flow | Provider | To submitter? | To team? | If API key missing |
|------|----------|-----------------|----------|-------------------|
| **Contact / beta** (`handle-form-submission`) | Resend | **No** | Yes → `hello@exotiq.ai` | Skips email silently; still returns success |
| **Investor** (`handle-investor-submission`) | Resend | Yes (welcome) | Yes → `hello@exotiq.ai` | Welcome + team skip; DB insert may still run until email step fails |

Frontend contact success copy now states there is **no automatic confirmation email** for the contact form (see `ContactPage.tsx`).

---

## What is implemented today

### 1. `supabase/functions/handle-form-submission`

- **Google Sheets** (optional): appends a row if `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEET_ID` are set; otherwise warns and continues.
- **Resend** (optional): `sendEmailNotification()` → `POST https://api.resend.com/emails`
  - **From:** `Exotiq Forms <noreply@exotiq.ai>`
  - **To:** `hello@exotiq.ai` only
  - **Body:** HTML summary of beta or contact submission
- **No email** is sent to the person who submitted the contact/beta form.

### 2. `supabase/functions/handle-investor-submission`

- **Database:** inserts/upserts `investor_contacts` via Supabase REST (requires `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
- **Resend** (when `RESEND_API_KEY` is set):
  - **Welcome** → submitter’s email (template from `email-templates.ts`), **from** `Gregory @ Exotiq <hello@exotiq.ai>`
  - **Notification** → `hello@exotiq.ai` with submission details
- **Email log:** writes to DB after send (see function for `logEmailNotification`).

### 3. Frontend

- Forms call Edge Functions over HTTPS; they do **not** call Resend directly.
- `env.example` documents **Vite** vars only; **Edge Function secrets** are set in Supabase (Dashboard → Project → Edge Functions → Secrets), not in `env.example`.

---

## Configuration checklist (verify in production)

Use this when pairing with Resend + Supabase tomorrow.

- [ ] **`RESEND_API_KEY`** set for **each** deployed function that sends mail (`handle-form-submission`, `handle-investor-submission`).
- [ ] **Resend domain**: `exotiq.ai` verified; sending addresses allowed:
  - `noreply@exotiq.ai` (forms)
  - `hello@exotiq.ai` (investor “from” — must match verified domain)
- [ ] **Resend dashboard**: check logs for bounces, domain/DKIM issues, and that test sends arrive.
- [ ] **Google Sheets** (contact/beta only): `GOOGLE_SHEETS_API_KEY`, `GOOGLE_SHEET_ID` if you rely on the sheet as source of truth.
- [ ] **Investor function**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` present (required for DB path).

---

## Gaps and product decisions (what to work on)

### A. Contact / beta — submitter experience

- [ ] **Decision:** Do we want a **confirmation email** to the user (e.g. “We received your message”)?
- [ ] If yes: add second Resend call in `handle-form-submission` with a small HTML template; use `to: [formData.email]`; consider rate limiting / abuse.
- [ ] **Decision:** Should missing `RESEND_API_KEY` still return `success: true`? (Today: yes, for UX; ops lose signal unless Sheets/logs are checked.)

### B. Consistency

- [ ] Align **from** addresses and branding between forms (`noreply@…`) and investor (`hello@…`) if desired.
- [ ] Optional: centralize Resend helper in `supabase/functions/_shared/` (one place for API URL, error handling, tags).

### C. Reliability and observability

- [ ] Add structured logging or tags on Resend payloads for contact vs beta vs investor.
- [ ] Optional: store “email attempted / failed” for contact submissions (investor path already logs some of this).

### D. Documentation

- [ ] Add a short “Supabase secrets” subsection to `env.example` or internal runbook (names only, no real keys): `RESEND_API_KEY`, `GOOGLE_SHEETS_*`, etc.

### E. QA script for tomorrow

- [ ] Submit **contact** form → confirm row in Sheet (if enabled) and **one** email to `hello@exotiq.ai`.
- [ ] Submit **investor** form → confirm DB row, **welcome** to test inbox, **notification** to `hello@exotiq.ai`.
- [ ] Temporarily unset `RESEND_API_KEY` in a dev project and confirm behavior matches expectations (silent skip vs error).

---

## File reference

| Piece | Location |
|-------|-----------|
| Contact / beta + internal Resend | `supabase/functions/handle-form-submission/index.ts` |
| Investor welcome + internal Resend | `supabase/functions/handle-investor-submission/index.ts` |
| Investor welcome template | `supabase/functions/handle-investor-submission/email-templates.ts` |
| Contact success UI | `src/pages/ContactPage.tsx` |

---

*Last updated: 2026-03-29 — align with repo before each work session.*

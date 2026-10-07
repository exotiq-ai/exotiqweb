# Handoff → renter-app (book.exotiq.rent) workstream: legal document alignment

From: exotiq.ai workstream · Date: 2026-10-06 · Owner: Gregory Ringler
Read with: `Drive_Exotiq_Policy/05_Current_2026-10/EXOTIQ_AI_LEGAL_HUB_HANDOFF_2026-10-06.md` and `docs/legal/TRACKING_AND_CONSENT_PLAN_2026-10.md`.
Nothing here edits the signed renter ToS v2.0.0. Everything below is aligned to it.

## 1. Document names and homes (chosen; use these everywhere)

The signed ToS §1.4 incorporates documents by exact title, so page titles must match. URLs stay as they are today because checkout, Lovable and the footer already link to them.

| Public title (exact) | doc_id | version | Canonical URL | Notes |
|---|---|---|---|---|
| Terms (hub, not a contract) | none | none | exotiq.ai/terms | Anchors `#renter-terms`, `#operator-terms`. Stripe's single Terms URL |
| Drive Exotiq Terms of Service | `terms` | 2.0.0 | book.exotiq.rent/terms | Signed. Never mirrored |
| Exotiq Command Center Platform Agreement | `operator-terms` | next = **2.0.0** | exotiq.ai/operator-terms | See §3.4: v1 already exists |
| Drive Exotiq Marketplace Addendum | `operator-marketplace-addendum` | 1.0.0 (counsel-gated) | exotiq.ai/marketplace-addendum | Operators accept on first listing |
| Website Terms of Use | `website-terms` | 2.0.0 | exotiq.ai/website-terms | Moved off `/terms` |
| Exotiq Privacy Policy | `privacy` | 2.0.0 | exotiq.ai/privacy | Master. Stripe's Privacy URL |
| Drive Exotiq Privacy Notice | `renter-privacy` | follow renter app | book.exotiq.rent/privacy | Must agree with the master |
| Drive Exotiq Cookie Policy | `cookies` | 2.0.0 | exotiq.ai/cookies | Company-wide, all sites |
| Drive Exotiq SMS and Text Messaging Policy | `sms` | 2.0.0 | exotiq.ai/sms-terms | Keep URL; add alias `/sms` |
| Drive Exotiq Copyright and DMCA Policy | `dmca` | 2.0.0 | exotiq.ai/dmca | Unpublished until the agent is registered |
| Acceptable Use Policy | `aup` | 1.0.0 | exotiq.ai/acceptable-use | Exists in the app suite |
| Data Processing Agreement | `dpa` | 1.0.0 | exotiq.ai/dpa | Exists in the app suite |

Rule from ToS §1.6 ("the version in effect when your booking was confirmed governs"): incorporated documents (Privacy Notice, Cookie, SMS, DMCA) must keep every prior version at a stable archive URL (`exotiq.ai/legal/archive/<doc_id>/<version>`). The assent log should record the version of each document the renter saw.

Mailboxes (used identically on every page): support@, legal@, privacy@, security@, compliance@, dmca@, hello@ at exotiq.ai. `dmca@` is the DMCA address (the live site and app already use it; the July draft's `copyright@` is dropped).

Notice address: Exotiq Inc., 1001 S Main St #6709, Kalispell, MT 59901 (Gregory confirmed).

## 2. Cookie and consent model — one policy, per-site facts

| Site | Today | Target |
|---|---|---|
| exotiq.ai | Opt-in, everything off until a choice | Geo split in Phase B: EU/UK/CH opt-in, US opt-out, GPC honored |
| book.exotiq.rent | US opt-out, optional cookies default ON, GPC honored (owner + counsel confirmed 2026-10-06) | Unchanged |
| app.exotiq.ai | Not measured | Needs an inventory from the app owner |

**Please send me** a cookie and storage inventory for book.exotiq.rent in the same format I produced for exotiq.ai (first visit, after reject, after accept: third-party hosts, cookie names with durations, localStorage and sessionStorage keys). The master Cookie Policy cannot be published without it, and the SMS draft's own footer says an unverified inventory is itself a compliance exposure.

Phase A edits on exotiq.ai that you do not need to touch: footer Cookie Settings control, GPC handling, corrected inventory.

## 3. Contradictions found (each needs a decision recorded here)

3.1 **Consent model.** See §2. The June 14 app legal suite and the live exotiq.ai Cookie Policy say "does not use advertising/retargeting" and promise a footer Cookie Settings link. Both are untrue today. Fix on exotiq.ai (me). Renter app: confirm the same facts hold for book.exotiq.rent.

3.2 **Renter data ownership.** Operator Terms §4.5 says renter data is the operator's Customer Data under the operator's own privacy policy, operator solely responsible for consents. Marketplace Addendum §9.1 says the operator is an independent controller. The signed ToS and Drive Exotiq Privacy Notice treat Exotiq as collecting renter data itself. Resolution proposed: for Drive Exotiq marketplace bookings both Exotiq and the operator are independent controllers of their own copies; for the operator's own direct bookings the operator is controller and Exotiq is processor under the DPA. Operator Terms §4.5 gets rewritten to say so. Counsel to confirm.

3.3 **Fee language.** Operator Terms §2.2 describes a 10% renter-side fee plus 10% host-side fee, 20% total. The Lovable handback sets one Service fee (exact gross-up) plus operator-side taxes, and the ToS requires "Service fee", never "booking fee". §2.2 is stale and also uses "renter-side fee … added to booking total", which is junk-fee language. Rewrite to match ToS §8.1 and the handback.

3.4 **The operator agreement already exists.** The "new" Command Center Platform Agreement in the hub handoff is a revision of the existing Terms and Conditions (19 Articles, last updated 2026-06-14, found at `Downloads/Exotiq_App_Legal_Suite_2026-06-14/terms_2026-06-14.html` and the earlier Word version in `Downloads/files (3)/`). Existing operators accepted it in the app. So: treat it as `operator-terms/1.0.0`; the revision is `2.0.0` and requires re-assent. **Open for the backend/Lovable:** how is operator assent recorded today, and who builds the re-assent prompt in app.exotiq.ai.

3.5 **Three arbitration regimes.** Renter ToS §22: consumer arbitration, county venue, opt-out. Operator Terms §18: AAA Commercial, Delaware, individual only (fine for B2B). Live Website Terms Article VI: AAA Commercial plus class waiver for consumers, which conflicts with §22. Resolution: the July Website Terms draft §16 (defer to ToS §22 for renters; Delaware courts otherwise). Counsel to confirm retirement of the live Article VI.

3.6 **Sub-processor lists disagree.** The Privacy Policy lists Stripe, Supabase, ElevenLabs, Google Gemini, OpenAI, Anthropic, Resend, GoHighLevel, Twilio, telematics providers. The DPA sub-processor table lists only Supabase, Stripe and Google Gemini, while its own purposes name Resend, GoHighLevel and Twilio. The site also loads Meta, Google Analytics and Tag Manager, PostHog, Apollo, Calendly and Google Fonts, listed nowhere. Create one master sub-processor list and make the Privacy Policy, DPA and renter Privacy Notice cite it.

3.7 **Retention.** One table for every document (see below). Conflicts today: ToS and handback "7 years from acceptance" vs the decided "7 years from booking completion"; SMS draft "as long as necessary" vs the Privacy Policy and DPA "at least 5 years"; SMS message content 24 months appears only in the draft.

| Record | Retain |
|---|---|
| Booking records and assent audit trail | 7 years from booking completion (**backend retention job must use completion, not acceptance**) |
| Tax and transaction records | 7 years |
| SMS consent and opt-in evidence | 5 years after the last message or withdrawal |
| SMS opt-out suppression | as long as SMS is operated |
| SMS message content | 24 months |
| Voice recordings (Rari) | 30 days |

3.8 **Breach-notice promise.** Privacy Policy: "within 72 hours of confirmed discovery". Many state laws allow longer, and a hard promise is a contractual exposure. Counsel to choose between that and "without undue delay and as required by law". Check the DPA matches.

3.9 **Text-message brand and registration.** Policies speak as "Exotiq" and "Drive Exotiq". The A2P campaigns must register the same brand and the sample messages must carry it. Do not publish the SMS policy until the campaigns are approved (Gregory's task). The SMS policy must keep: program names, frequency, "message and data rates may apply", STOP/HELP, and the sentence that mobile numbers and consent are not shared with third parties for marketing. Consent checkbox text on the renter checkout must match policy §2.2 word for word.

3.10 **DMCA.** No Copyright Office registration exists (Gregory's to-do). Page unpublished until it does. Agent name still a placeholder.

3.11 **Domains. RESOLVED: driveexotiq.com is live and is a separate property.** It is a community and waitlist site ("Good Cars. Better Company."), on Cloudflare, with its own legal pages: `/terms` (Website Terms, updated 2026-09-08), `/privacy`, `/cookies`, `/dmca`, `/sms`. It says the marketplace is "upcoming" at exotiq.rent, takes no bookings or payments, and runs a stricter, better-documented cookie model than exotiq.ai (see the tracking plan §5a). Four properties therefore exist: exotiq.ai, driveexotiq.com, book.exotiq.rent, app.exotiq.ai. Contradictions against it:
- **Two Cookie, Privacy, SMS and DMCA documents under the same names.** The signed ToS §1.4 incorporates "the Drive Exotiq Cookie Policy" etc. without a URL. driveexotiq.com publishes documents with those names, and exotiq.ai publishes company-wide ones. Pick one canonical set. Recommendation: exotiq.ai hosts the canonical documents, each with a per-property inventory section, and driveexotiq.com's pages redirect to them. Needs your decision and the driveexotiq.com owner (the Astro build in `DriveExotiq-Astra`, not verified).
- **SMS URL:** driveexotiq.com uses `/sms`, exotiq.ai uses `/sms-terms`. The plan adds `/sms` as an alias on exotiq.ai.
- **Website Terms arbitration:** driveexotiq.com's Terms also use AAA arbitration in Delaware with a class waiver for consumers, conflicting with ToS §22 the same way exotiq.ai's do. Whether the signed ToS supersedes them must be stated on both sites.
- **DMCA:** driveexotiq.com's page also shows the `[DMCA Designated Agent]` placeholder.
- **Consent record:** `driveexotiq_cookie_consent` (local storage, no expiry) vs `exotiq_consent` cookie (180 days). Not a legal conflict; note it when the policies describe retention of choices.
- **Exotiq.rent vs book.exotiq.rent:** driveexotiq.com names exotiq.rent as the marketplace; the renter app is book.exotiq.rent. Confirm the canonical renter host.

3.12 **Operator template.** Operator Terms §8.1 "No Legal Document Templates" conflicts with any plan for Exotiq to supply a rental-agreement template. Open item with Gregory; do not change §8.1 yet.

3.13 **Apollo.** Removed from exotiq.ai's website (decision 2026-10-07). Do not list Apollo as a website sub-processor. If the app uses Apollo for anything else, that belongs in the master sub-processor list under its own purpose.

## 4. What I need you to do on the renter-app side

1. Link ToS §1.4 documents to the final URLs in §1 above.
2. Keep the Privacy Notice's "Booking agreements" section (MP-32) at "7 years following booking completion" and tell the backend retention job.
3. Provide the book.exotiq.rent cookie and storage inventory (§2).
4. EU/UK and UAE notice variants: proposal is that they live on the master as `exotiq.ai/privacy#eu-uk` and `#uae`, and the renter notice links there. Confirm.
5. Record the document version in each assent row.

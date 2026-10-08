# Gregory's personal to-do — legal and tracking (2026-10-06)

These need your hands, an account login, or a decision. Claude cannot do them.

## Do this week

1. **Register a DMCA Designated Agent with the U.S. Copyright Office.** Online filing at copyright.gov/dmca-directory, about $6, renews every 3 years. Without it, Exotiq has no safe harbor for operator-uploaded photos. Use `dmca@exotiq.ai` as the agent email and the Kalispell address (ask counsel whether the "#6709" mailbox is acceptable as the agent address). Put a 3-year renewal reminder on your calendar. Also confirm the `dmca@exotiq.ai` mailbox is monitored. The DMCA page stays unpublished until this is done.
2. **Confirm these mailboxes exist and reach a person:** support@, legal@, privacy@, security@, compliance@, dmca@, hello@ (all @exotiq.ai). The signed renter ToS names the first five. Stripe's support field must point to a monitored one.
3. **Stripe settings** (only after the hub and master privacy are live): Business website `https://exotiq.ai`, Terms `https://exotiq.ai/terms`, Privacy `https://exotiq.ai/privacy`, Support `support@exotiq.ai` or `/support`, descriptor `EXOTIQ`. Then run one test checkout on each side.

## Decisions I need from you

4. **Operator rental-agreement template. OPEN, come back to this.** You said operators will bring their own rental agreements until counsel signs off. If Exotiq ever supplies a template that protects, lists and indemnifies Exotiq, three things collide:
   - Your operator Terms say Exotiq provides **no legal document templates** (Article VIII, §8.1). Supplying one reverses that.
   - Writing the contract the operator signs with the renter pulls Exotiq closer to being "the rental company", which is exactly what ToS §3.1/§3.2 and the Addendum §1.1 say Exotiq is not. It could weaken the platform-not-rental-company position.
   - A template that indemnifies Exotiq against the operator's own renters is a contract between operator and renter; the renter is not a party to your Terms, so the protection has to come from your operator-side indemnity (§15.1) and the Addendum, not from the template.
   Safer middle path to put to counsel: keep operators supplying their own rental agreements, and require them by contract to include a short list of mandatory clauses (Drive Exotiq ToS acknowledgment, damage and loss allocation, insurance, no claims against Exotiq). Exotiq publishes the clause list, not a full contract. I will draft that clause list for counsel when you say go.
5. **Meta Pixel and Apollo. DECIDED 2026-10-07:** Apollo's website tracker removed (you use the extension). Meta Pixel stays opt-in until counsel answers the wiretap question. Nothing needed from you.
6. **Counsel.** Defaulting to MKT-14 unless you say otherwise. The plan has two **COUNSEL** questions (CIPA exposure for the Meta Pixel, and cookieless analytics in the EU/UK).

## A2P text-message registration (your hands, in the SMS provider's console)

The path I recommend, in order:

1. Pick **one** sender platform for registration. Your docs list both GoHighLevel and Twilio. GoHighLevel sends through Twilio, so register once, in GoHighLevel's trust center.
2. **Brand registration:** Exotiq Inc., legal name and EIN exactly as on the IRS letter. Carriers match the address to the IRS record, so check that the Kalispell mailbox is what the IRS has on file.
3. **Campaigns, one per program, not one for all:**
   - Booking and trip notifications (renters)
   - Operator account alerts
   - Marketing (separate, express written consent)
4. Each campaign needs: the opt-in method with a screenshot of the real checkbox, the public SMS policy URL, 2 to 3 sample messages that include the brand name and "Reply STOP to opt out, HELP for help", and a description that matches the SMS policy text word for word. Use the same brand name in messages as you register ("Drive Exotiq").
5. Registration must be finished before the SMS policy is published, because the policy states the programs and numbers. Do not publish the policy first.

## Retention — my answer to "is 5 years enough?"

The clock is not how long you run the program, it is how long someone can sue you afterward. Recommended, one table across every document:

| Record | Keep | Why |
|---|---|---|
| Booking records and assent audit trail | 7 years from booking completion | Your decision; covers contract claims and tax records |
| Tax and transaction records | 7 years | Standard |
| SMS consent and opt-in evidence | 5 years after last message or withdrawal | TCPA suits have a 4-year limit; 5 gives a buffer. This is where your 5-year instinct is right |
| SMS opt-out suppression list | as long as you text | You must keep honoring opt-outs |
| SMS message content | 24 months | Support and disputes |
| Voice recordings | 30 days | As published |

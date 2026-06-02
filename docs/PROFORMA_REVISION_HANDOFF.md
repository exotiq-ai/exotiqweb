# AI Handoff — 5-Year Proforma Revision

**Document Type:** Financial Model Update  
**Date:** May 28, 2026  
**For:** AI agent updating the Exotiq 5-year proforma  
**Priority:** HIGH — Pricing model has changed, proforma must reflect new revenue structure  

---

## Why This Revision

The Exotiq pricing model has been restructured from a 4-tier flat-rate SaaS model to a 2-tier per-vehicle model + Enterprise. Additionally, three distinct revenue streams must now be modeled: **SaaS subscriptions**, **marketplace commissions**, and **insurance/damage waiver revenue**.

The existing proforma was built around flat tiers ($49/$99/$199/Custom) with a single SaaS revenue line. This revision replaces that entirely.

---

## Revenue Stream 1: SaaS Subscriptions (Per-Vehicle Recurring)

### New Pricing Structure

| Plan | Price (Monthly) | Price (Annual) | Fleet Range |
|------|----------------|----------------|-------------|
| **Pro** | $39/vehicle/month | $390/vehicle/year | 1–15 vehicles |
| **Business** | $29/vehicle/month | $290/vehicle/year | 16–50 vehicles |
| **Enterprise** | Custom (model at $25/vehicle/mo) | Custom | 51+ vehicles |

### Key Modeling Notes

- **All features included on every plan** — no add-on upsells or feature gates. Remove any "Premium Add-ons" revenue line from the old model.
- **Annual billing saves 2 months** — annual customers pay 10x monthly rate instead of 12x. Model the revenue impact of annual vs monthly mix.
- **Revenue scales linearly with fleet size** — a 30-vehicle Business customer = $870/mo ($10,440/yr). This is significantly higher ARPU than the old flat $199/mo cap.
- **Enterprise placeholder**: Model Enterprise at $25/vehicle/month as a starting assumption. Flag this for manual override once real Enterprise contracts close.

### ARPU Modeling (replace old $475/mo projected ARPU)

Model blended ARPU based on customer distribution assumptions:

| Segment | % of Customers | Avg Fleet Size | Monthly ARPU |
|---------|---------------|----------------|-------------|
| Pro | 60% | 8 vehicles | $312/mo |
| Business | 30% | 28 vehicles | $812/mo |
| Enterprise | 10% | 80 vehicles | $2,000/mo |
| **Blended** | **100%** | — | **~$631/mo** |

> **Note:** These distribution assumptions are illustrative. Adjust based on actual pipeline data. The critical difference from the old model: ARPU now scales with fleet size rather than capping at a flat tier price.

### Annual Billing Mix Assumption

| Year | Monthly % | Annual % | Revenue Discount Impact |
|------|-----------|----------|------------------------|
| Y1 | 80% | 20% | -3.3% |
| Y2 | 65% | 35% | -5.8% |
| Y3 | 50% | 50% | -8.3% |
| Y4 | 45% | 55% | -9.2% |
| Y5 | 40% | 60% | -10.0% |

Annual billing discount = (annual customers × 2 months free) / total potential revenue.

---

## Revenue Stream 2: Marketplace Commissions (Drive Exotiq)

### Overview

Drive Exotiq is a consumer-facing rental marketplace at **exotiq.rent** where renters discover and book exotic vehicles from Exotiq-managed fleets. Exotiq takes a commission (take rate) on each booking processed through the marketplace.

### ⚠️ TAKE RATE — PLACEHOLDER (requires business decision)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   MARKETPLACE TAKE RATE: ____%                      │
│                                                     │
│   Recommended modeling range: 8–15%                 │
│                                                     │
│   Industry benchmarks:                              │
│   • Turo: 25–35% (host side)                        │
│   • Getaround: 40%                                  │
│   • Airbnb: 3% host + 14% guest                     │
│   • VRBO: 5% host                                   │
│                                                     │
│   Exotiq positioning: Lower than Turo to drive       │
│   operator adoption. Operators already pay SaaS      │
│   fee, so marketplace take rate should be additive   │
│   not punitive.                                      │
│                                                     │
│   Suggested scenarios to model:                     │
│   • Conservative: 8%                                │
│   • Base: 10%                                       │
│   • Aggressive: 15%                                 │
│                                                     │
│   Decision owner: Gregory Ringler                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Marketplace GMV Assumptions

Model marketplace Gross Merchandise Value (GMV) based on:

```
GMV = marketplace_active_vehicles × avg_daily_rate × 365 × marketplace_utilization_rate
```

| Assumption | Value | Source |
|-----------|-------|--------|
| Avg daily rate (exotic) | $1,500 | Industry benchmark |
| Marketplace utilization rate | Start 5%, grow to 15% by Y5 | Conservative — marketplace is new |
| Marketplace vehicle adoption | % of SaaS fleet that lists on Drive Exotiq | See ramp below |

### Marketplace Adoption Ramp (% of SaaS-managed vehicles listed on Drive Exotiq)

| Year | Marketplace Adoption | Rationale |
|------|---------------------|-----------|
| Y1 | 20% | Launch year, included free in all plans |
| Y2 | 45% | Operators see booking volume, word of mouth |
| Y3 | 65% | Featured listings drive Business plan upgrades |
| Y4 | 75% | Network effects strengthen |
| Y5 | 85% | Marketplace becomes primary demand channel |

### Revenue Formula

```
marketplace_revenue = GMV × take_rate
```

Model this as a separate line item from SaaS revenue. Show GMV, take rate, and net marketplace revenue distinctly.

---

## Revenue Stream 3: Insurance / Damage Waiver

### Overview

Exotiq offers a per-day damage waiver protection plan sold to **renters** (not operators) at the point of booking. This is charged per rental day on top of the vehicle rental rate.

### Pricing

```
Damage Waiver: $89/day per booking
```

### Modeling Assumptions

| Assumption | Value | Notes |
|-----------|-------|-------|
| Waiver price | $89/day | Fixed rate, all vehicle classes |
| Avg booking duration | 2.5 days | Exotic rental average |
| Waiver attach rate Y1 | 35% | New product, optional |
| Waiver attach rate Y3 | 55% | Trust builds, conversion optimized |
| Waiver attach rate Y5 | 65% | Industry norm for opt-in protection |
| COGS / claims payout | TBD — model at 30–40% of waiver revenue | Depends on underwriting partner or self-insurance |

### Revenue Formula

```
waiver_revenue = total_bookings × attach_rate × $89 × avg_booking_days
total_bookings = total_managed_vehicles × 365 × utilization_rate
```

> **Important:** This revenue stream applies to ALL bookings (both direct bookings through operator sites and marketplace bookings through Drive Exotiq). The waiver is offered at checkout regardless of booking channel.

### Margin Assumption

If Exotiq self-underwrites (holds the risk):
- **Gross margin: 60–70%** (after claims reserves)

If Exotiq uses a partner/MGA model:
- **Revenue share to Exotiq: 25–40%** of the $89 (net revenue $22–$36/day)
- Flag this as a structural decision that changes the P&L significantly

**Model both scenarios** and flag for decision.

---

## Unit Economics Refresh

The old proforma used these metrics (now stale):

| Metric | Old Value | Status |
|--------|-----------|--------|
| CAC | $450 | ⚠️ Refresh — free trial changes acquisition funnel |
| LTV | $8,500 | ⚠️ Refresh — per-vehicle pricing raises LTV for larger fleets |
| LTV:CAC | 18.9:1 | ⚠️ Recalculate |
| Gross Margin | 87% | ⚠️ Refresh — insurance claims and marketplace ops change cost structure |
| Monthly Churn | <3% | ⚠️ Refresh — free trial may affect early churn |
| Blended ARPU | $475/mo | ⚠️ Replace — see ARPU table above |

### New Unit Economics to Model

**LTV Formula:**
```
LTV = blended_ARPU × gross_margin × (1 / monthly_churn_rate)
```

**Blended ARPU** should now include all three revenue streams per customer:
```
blended_ARPU = SaaS_ARPU + (marketplace_revenue_per_customer / month) + (waiver_revenue_per_customer / month)
```

**CAC Considerations:**
- "Start Free Trial" (no credit card) = lower friction but potentially higher volume of unqualified signups
- Model a **trial-to-paid conversion rate** (suggest 15–25% as starting range)
- CAC should reflect cost per *paid* customer, not per trial signup

**Gross Margin by Revenue Stream:**

| Stream | Gross Margin | Rationale |
|--------|-------------|-----------|
| SaaS | 85–90% | Pure software, infrastructure costs only |
| Marketplace | 75–85% | Payment processing + support costs |
| Insurance/Waiver | 60–70% (self) or 85%+ (partner model, net revenue) | Claims reserves or partner rev share |
| **Blended** | Model as weighted average | Changes as revenue mix shifts |

---

## 5-Year Customer Growth Assumptions

Replace the old 3-year projection (50 → 250 → 500 customers) with a 5-year model:

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|-----|-----|-----|-----|-----|
| New trial signups | 600 | 1,800 | 4,000 | 7,000 | 10,000 |
| Trial → paid conversion | 18% | 22% | 25% | 25% | 25% |
| New paying customers | 108 | 396 | 1,000 | 1,750 | 2,500 |
| Churned customers | 10 | 55 | 180 | 400 | 650 |
| Net new customers | 98 | 341 | 820 | 1,350 | 1,850 |
| Cumulative paying customers | 98 | 439 | 1,259 | 2,609 | 4,459 |
| Avg vehicles per customer | 10 | 12 | 14 | 16 | 18 |
| Total managed vehicles | 980 | 5,268 | 17,626 | 41,744 | 80,262 |

> **Note:** These are illustrative growth assumptions. Adjust based on actual funnel data, marketing spend, and sales capacity. The key structural change is that revenue scales with *vehicles managed*, not just *customers acquired*.

---

## Proforma Structure (Recommended Layout)

### Income Statement — Monthly/Annual Columns, 5-Year Horizon

```
REVENUE
├── SaaS Subscription Revenue
│   ├── Pro tier revenue (customers × avg vehicles × $39)
│   ├── Business tier revenue (customers × avg vehicles × $29)
│   ├── Enterprise tier revenue (customers × avg vehicles × $25)
│   └── Annual billing discount adjustment
├── Marketplace Revenue (Drive Exotiq)
│   ├── Gross Merchandise Value (GMV)
│   ├── Take rate (____%)
│   └── Net marketplace commission revenue
├── Insurance / Damage Waiver Revenue
│   ├── Total bookings eligible
│   ├── Attach rate
│   ├── Gross waiver revenue ($89 × days × attach rate)
│   └── Net waiver revenue (after claims/partner share)
└── TOTAL REVENUE

COST OF REVENUE
├── Infrastructure & hosting
├── Payment processing (Stripe fees ~2.9% + $0.30)
├── Insurance claims reserves / partner payouts
├── Marketplace operations
└── TOTAL COGS

GROSS PROFIT
GROSS MARGIN %

OPERATING EXPENSES
├── Sales & Marketing
│   ├── Paid acquisition
│   ├── Content marketing
│   └── Sales team
├── Product & Engineering
│   ├── Engineering salaries
│   ├── AI/ML infrastructure (MotorIQ)
│   └── Third-party tools
├── General & Administrative
│   ├── Legal, compliance, insurance
│   ├── Office & operations
│   └── Finance & HR
└── TOTAL OPEX

EBITDA
EBITDA MARGIN %

NET INCOME (LOSS)
```

### Key Metrics Dashboard (model monthly, display quarterly)

```
SAAS METRICS
├── MRR / ARR
├── MRR Growth Rate (MoM)
├── Net Revenue Retention (NRR)
├── Blended ARPU
├── Customers by tier (Pro / Business / Enterprise)
├── Total vehicles managed
└── Annual billing mix %

MARKETPLACE METRICS
├── GMV
├── Take rate
├── Net marketplace revenue
├── Marketplace active vehicles
├── Marketplace adoption rate (% of SaaS fleet)
└── Avg booking value

INSURANCE METRICS
├── Total eligible bookings
├── Attach rate
├── Gross waiver revenue
├── Claims ratio
└── Net waiver margin

UNIT ECONOMICS
├── CAC (cost per paid customer)
├── LTV (blended, all revenue streams)
├── LTV:CAC ratio
├── Payback period (months)
├── Monthly churn rate
└── Trial-to-paid conversion rate

CASH FLOW
├── Cash burn rate
├── Runway (months)
├── Break-even month
└── Cumulative cash position
```

---

## Revenue Mix Evolution (Target)

Show how the revenue mix shifts over 5 years as marketplace and insurance scale:

| Stream | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|-----|-----|-----|-----|-----|
| SaaS Subscriptions | 85% | 70% | 55% | 45% | 40% |
| Marketplace Commissions | 5% | 12% | 20% | 25% | 28% |
| Insurance / Waiver | 10% | 18% | 25% | 30% | 32% |

> This shows the business evolving from a pure SaaS model to a **platform model** with multiple monetization layers on the same customer base. This is the investor narrative: each customer generates increasingly more revenue as marketplace and insurance adoption compound.

---

## What to Remove from the Old Proforma

- ❌ Old 4-tier flat pricing ($49 / $99 / $199 / Custom)
- ❌ "Premium Add-ons" revenue line (all features now included)
- ❌ "Transaction Fees (20%)" — replaced by marketplace commission model
- ❌ "Merchant Services (7%)" — fold into COGS as Stripe processing fees
- ❌ Founder pricing / beta discounts
- ❌ Overage pricing per vehicle (no overages in new model)
- ❌ Old ARPU of $475/mo (replace with blended ARPU calculation)

---

## Sensitivity Analysis (Model These Scenarios)

### Scenario 1: Conservative
- Take rate: 8%
- Waiver attach rate: 30% → 50% by Y5
- Customer growth: 70% of base assumptions
- Insurance model: Partner (net 30% of waiver price)

### Scenario 2: Base Case
- Take rate: 10%
- Waiver attach rate: 35% → 65% by Y5
- Customer growth: 100% of base assumptions
- Insurance model: Self-underwritten (60% margin)

### Scenario 3: Aggressive
- Take rate: 15%
- Waiver attach rate: 45% → 75% by Y5
- Customer growth: 130% of base assumptions
- Insurance model: Self-underwritten (70% margin)

---

## Open Decisions (Flag for Gregory)

1. **Marketplace take rate** — What % does Exotiq charge on Drive Exotiq bookings? (See placeholder above)
2. **Insurance model** — Self-underwrite vs. partner/MGA? This is the single biggest swing factor in the P&L.
3. **Enterprise pricing floor** — Is $25/vehicle/mo the right assumption, or should Enterprise be modeled differently (e.g., platform fee + per-vehicle)?
4. **Marketplace fee structure** — Does the take rate come from the operator side, the renter side, or split? (Affects GMV reporting and operator perception)
5. **Annual billing cash flow** — Do annual customers pay upfront? If so, model the cash flow benefit (prepaid revenue) vs. deferred revenue recognition.

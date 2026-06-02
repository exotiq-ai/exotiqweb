# Exotiq 5-Year Proforma — Pricing Update Handoff

**Date:** May 28, 2026
**Source file:** `/Users/g.r./Documents/EXOTIQ/Corporate/FINANCIALS/Exotiq 5 Year Proforma Final (SA).xlsx`
**Purpose:** Self-contained instructions for an AI to update the proforma from the old flat-tier SaaS pricing to the new per-vehicle pricing model, add new revenue streams, and refresh unit economics.

---

## 1. Current Workbook Structure

The workbook has **9 sheets**. All cells contain **hardcoded values** (zero formulas preserved). Every derived cell must be recalculated when assumptions change.

| # | Sheet Name | Dimensions | Description |
|---|-----------|-----------|-------------|
| 1 | **Assumptions** | A1:C57 | All input assumptions: fundraising, pricing, acquisition, marketplace, COGS, personnel, S&M, G&A |
| 2 | **Use of Cash** | A1:D20 | Pre-Seed ($2M) and Series A ($25M) allocation breakdown |
| 3 | **Monthly P&L (Y1-Y2)** | A1:Y37 | Monthly income statement, Mar 2026 – Feb 2028 (24 months) |
| 4 | **Monthly Cash Flow (Y1-Y2)** | A1:Y17 | Monthly cash flow, Mar 2026 – Feb 2028 |
| 5 | **Annual P&L (Y1-Y5)** | A1:F36 | Annual income statement, 2026–2030 (columns B–F) |
| 6 | **Cash Flow & Balance Sheet** | A1:F26 | Annual cash flow + simplified balance sheet, 2026–2030 |
| 7 | **Summary Dashboard** | A1:F35 | Key metrics dashboard: growth, revenue, profitability, cash, unit economics, marketplace |
| 8 | **Headcount Plan** | A1:L20 | Quarterly headcount by role, Q1 2026 – Q4 2028 + 2029, 2030 |
| 9 | **SENSITIVITY ANALYSIS** | A1:H87 | 6-scenario sensitivity on marketplace params (utilization, take rate, ADR) |

---

## 2. Current Assumptions (Sheet: "Assumptions") — What Must Change

### 2A. SaaS Pricing — REPLACE ENTIRELY

**Current (cells A10:B14):**
| Cell | Label | Value |
|------|-------|-------|
| A10 | Section header | `SAAS PRICING (MONTHLY)` |
| A11 / B11 | Starter (up to 10 vehicles) | $290 |
| A12 / B12 | Professional (up to 25 vehicles) | $399 |
| A13 / B13 | Business (up to 75 vehicles) | $899 |
| A14 / B14 | Enterprise (up to 150 vehicles) | $1,799 |

**Replace with:**
| Cell | New Label | New Value |
|------|-----------|-----------|
| A10 | `SAAS PRICING (PER-VEHICLE)` | *(header)* |
| A11 / B11 | `Pro (1–15 vehicles)` | `$39/vehicle/month` |
| A12 / B12 | `Pro Annual` | `$390/vehicle/year (save 2 months)` |
| A13 / B13 | `Business (16–50 vehicles)` | `$29/vehicle/month` |
| A14 / B14 | `Business Annual` | `$290/vehicle/year (save 2 months)` |

Add a new row:
| Cell | Label | Value |
|------|-------|-------|
| A15 / B15 | `Enterprise (51+ vehicles)` | `Custom (exclude from model or use placeholder)` |

> **NOTE:** The old model used a blended MRR-per-customer based on tier splits. The new model needs an **average vehicles per customer** assumption to compute ARPU. See Section 4 for the new calculation method.

### 2B. Customer Acquisition — ADD VEHICLE ASSUMPTIONS

**Current (cells A16:B24) — keep these rows but augment:**

| Cell | Label | Current Value | Action |
|------|-------|---------------|--------|
| A17 / B17 | Starting Customers (Mar 2026) | 3 | Keep |
| A18 / B18 | New/Month: Y1 | 8 | Keep |
| A19 / B19 | New/Month: Y2 | 12 | Keep |
| A20 / B20 | New/Month: Y3 | 20 | Keep |
| A21 / B21 | Y4-Y5 Growth | 40% YoY | Keep |
| A22 / B22 | Tier Split | 40% / 40% / 15% / 5% | **CHANGE** → see below |
| A23 / B23 | Annual Churn Rate | 5% | Keep (but see unit economics refresh) |
| A24 / B24 | Annual Prepay Rate | 70% | Keep |

**Change tier split (A22/B22):**
Old: `40% / 40% / 15% / 5%` (Starter / Pro / Biz / Enterprise)
New: `60% / 30% / 10%` (Pro / Business / Enterprise)
Or rename: `Tier Split: Pro / Business / Enterprise`

**Add new vehicle-count assumptions (insert after row 24):**

| New Cell | Label | Value | Notes |
|----------|-------|-------|-------|
| A25 / B25 | `Avg Vehicles per Pro Customer` | `8` | Midpoint of 1–15 range |
| A26 / B26 | `Avg Vehicles per Business Customer` | `30` | Midpoint of 16–50 range |
| A27 / B27 | `Avg Vehicles per Enterprise Customer` | `75` | Placeholder — custom pricing |
| A28 / B28 | `Enterprise Monthly Rate (placeholder)` | `$25/vehicle/month` | Discounted from Business; mark TBD |

> **IMPORTANT:** These vehicle-count assumptions drive the entire revenue model. Label them clearly as adjustable inputs.

### 2C. Onboarding Fees — REVIEW

**Current (cells A26:B28 → will shift due to insertions above):**
- Starter / Professional: $2,500
- Business / Enterprise: $5,000

**Action:** Rename tiers to match new names (Pro → $2,500; Business/Enterprise → $5,000). Keep amounts or adjust as desired.

### 2D. Marketplace — UPDATE TAKE RATE

**Current (cells A30:B38):**
| Cell | Label | Current Value | Action |
|------|-------|---------------|--------|
| A30 | Section header | `MARKETPLACE (Launch Q1 2027)` | Keep |
| A31 / B31 | SaaS Adoption Rate Y1 | 45% | Keep |
| A32 / B32 | SaaS Adoption Rate Y2+ | 60% | Keep |
| A33 / B33 | Take Rate | 20% (10% guest + 10% host) | **MARK AS TBD PLACEHOLDER** |
| A34 / B34 | ADR | $350 | Keep |
| A35 / B35 | Utilization Rate | 65% | Keep |
| A36 / B36 | Annual GMV per Vehicle | $83,037 | Recalculate from ADR × 365 × Utilization |
| A37 / B37 | Revenue per Vehicle per Year | $16,607 | Recalculate: GMV × Take Rate |
| A38 / B38 | Marketplace Ramp | 10% to 85% over 48 months | Keep |

**Changes:**
1. **B33 (Take Rate):** Change cell value to `TBD — PLACEHOLDER` or keep 20% but add a note in column C: `"← PLACEHOLDER: Set actual marketplace commission rate here. This IS the take rate on exotiq.rent bookings."`
2. Recalculate B36 and B37 whenever B33, B34, or B35 change.

### 2E. COGS — KEEP BUT ADD INSURANCE LINE

**Current (cells A40:B42):**
| Cell | Label | Value |
|------|-------|-------|
| A41 / B41 | SaaS COGS (% of SaaS Rev) | 15% |
| A42 / B42 | Marketplace COGS (% of Mkt Rev) | 5% |

**Add new rows:**
| New Cell | Label | Value | Notes |
|----------|-------|-------|-------|
| A43 / B43 | `Insurance/Damage Waiver COGS (% of Insurance Rev)` | `TBD — PLACEHOLDER` | Exotiq's cost on the waiver; suggested starting point 40–60% |

### 2F. NEW SECTION: Insurance / Damage Waiver Assumptions

**Add after COGS section (around row 43, adjust for insertions):**

| Cell | Label | Value | Notes |
|------|-------|-------|-------|
| A_new | Section header | `INSURANCE / DAMAGE WAIVER` | New section |
| next | `Damage Waiver Daily Rate` | `$89` | Per-day rate charged to renters |
| next | `Average Booking Duration (days)` | `TBD — PLACEHOLDER` | Suggested starting: 3–5 days |
| next | `Waiver Attach Rate (% of bookings)` | `TBD — PLACEHOLDER` | % of marketplace bookings that purchase waiver; suggested 40–60% |
| next | `Exotiq Margin on Waiver` | `TBD — PLACEHOLDER` | After insurer/underwriter costs; suggested 30–50% |
| next | `Insurance Rev per Booking` | `= $89 × Avg Duration × Attach Rate` | Derived |
| next | `Insurance Profit per Booking` | `= Insurance Rev per Booking × Margin` | Derived |

---

## 3. Revenue Stream Mapping: Old → New

| Old Revenue Line | Old Location | New Revenue Line | Action |
|-----------------|-------------|-----------------|--------|
| SaaS MRR (flat tier-based) | Monthly P&L Row 9, Annual P&L Row 12 | **SaaS Revenue (per-vehicle)** | **REPLACE** calculation method entirely (see Section 4) |
| Onboarding Revenue | Monthly P&L Row 10 | **Onboarding Revenue** | Keep; update tier names |
| Marketplace Revenue | Monthly P&L Row 12, Annual P&L Row 13 | **Marketplace Revenue** | Keep structure; update take rate to reference TBD placeholder |
| *(not present)* | — | **Insurance / Damage Waiver Revenue** | **ADD** as new row below Marketplace Revenue |
| *(not present)* | — | **Stripe Connect / Payment Processing** | **ADD** if desired; or note that payment processing margin is embedded in SaaS COGS |
| Premium Add-ons (3%) | Referenced on investor page only, not in proforma | — | **REMOVE** — no add-on gates in new model |
| Transaction Fees (2% on direct bookings) | Referenced on investor page only | Marketplace Take Rate | **CLARIFY** — the old "2% transaction fee" on direct bookings is effectively replaced by the marketplace take rate on exotiq.rent bookings |

---

## 4. SaaS Revenue Calculation — New Method

### Old Method (replace this)
The old model computed SaaS MRR using a blended average across 4 tiers:
```
Blended MRR per Customer = (40% × $290) + (40% × $399) + (15% × $899) + (5% × $1,799)
                         ≈ $116 + $159.60 + $134.85 + $89.95 = $500.40
SaaS MRR = Total Customers × $500.40
```
(Verified: Row 9 of Monthly P&L shows B9 = 3 customers × ~$326 ≈ $979, suggesting a slightly different blended rate for the starting cohort.)

### New Method (implement this)

**Step 1: Calculate Blended Revenue Per Customer**
```
Pro ARPU    = Avg Vehicles per Pro Customer × $39/vehicle/month = 8 × $39 = $312/month
Biz ARPU   = Avg Vehicles per Business Customer × $29/vehicle/month = 30 × $29 = $870/month
Ent ARPU   = Avg Vehicles per Enterprise Customer × Enterprise Rate = 75 × $25 = $1,875/month

Blended ARPU = (Pro% × Pro ARPU) + (Biz% × Biz ARPU) + (Ent% × Ent ARPU)
             = (60% × $312) + (30% × $870) + (10% × $1,875)
             = $187.20 + $261.00 + $187.50
             = $635.70/month per customer
```

**Step 2: Compute Monthly SaaS MRR**
```
SaaS MRR = Total Active Customers × Blended ARPU
```

**Step 3: Compute Annual SaaS Revenue**
Apply annual prepay discount (70% of customers pay annually = save 2 months = 10/12 of monthly rate):
```
Annual SaaS Revenue = SaaS MRR × 12 adjusted for:
  - 70% of revenue at annual rate (×10/12 effective monthly)
  - 30% at monthly rate
  
Effective annual multiplier = (0.70 × 10) + (0.30 × 12) = 7.0 + 3.6 = 10.6
Annual SaaS Revenue = Average MRR over the year × 10.6
```
Or more simply, compute month by month and sum.

### Where to Update

**Monthly P&L (Y1-Y2) — Row 9 (SaaS MRR):**
- For each month column (B through Y), replace the hardcoded value with:
  `= Total Customers [Row 6, same column] × Blended ARPU`
- Blended ARPU should reference the Assumptions sheet cells

**Annual P&L (Y1-Y5) — Row 12 (SaaS Revenue):**
- Sum of monthly SaaS MRR for the year, or:
  `= Average Active Customers × Blended ARPU × 12 (adjusted for prepay)`

---

## 5. Insurance / Damage Waiver Revenue — New Line Item

### Add to Monthly P&L (Y1-Y2)

Insert a new row between Row 12 (Marketplace Revenue) and Row 13 (TOTAL REVENUE). Call it **"Insurance / Damage Waiver Revenue"**.

**Formula logic (for months after marketplace launch, Q2 2027 onward):**
```
Monthly Insurance Revenue =
  Total Marketplace Bookings × Waiver Attach Rate × $89 × Avg Booking Duration

Where:
  Total Marketplace Bookings = Marketplace GMV for month / (ADR × Avg Booking Duration)
  
Simplified:
  Insurance Revenue = (Marketplace GMV / ADR) × Waiver Attach Rate × $89
```

This uses marketplace GMV (which already accounts for vehicles, utilization, and ramp) to derive booking count, then applies the waiver.

**Exotiq's net margin on insurance:**
```
Insurance Gross Profit = Insurance Revenue × Exotiq Margin on Waiver
```
Add a corresponding COGS row for Insurance.

### Add to Annual P&L (Y1-Y5)
Insert a new row for Insurance Revenue between SaaS Revenue (Row 12) and Marketplace Revenue (Row 13), then update Total Revenue (Row 14) to sum all three.

### Add to Summary Dashboard
Add a new row in the Marketplace section (after Row 35) for Insurance/Waiver Revenue.

---

## 6. Marketplace Revenue — Verify and Update

The marketplace model is already well-structured. Confirm these stay consistent:

**Marketplace GMV formula:**
```
GMV = Active Marketplace Vehicles × ADR × 365 × Utilization Rate / 12 (monthly)
Active Marketplace Vehicles = Total Customer Vehicles × Adoption Rate × Ramp %
```

**Marketplace Revenue:**
```
= GMV × Take Rate
```

**Action items:**
1. The Take Rate (currently 20% in Assumptions B33) should be clearly marked as a **TBD placeholder** so the user can set it when decided.
2. Add a note that the marketplace take rate IS the commission (guest + host side combined). The old investor page's "Transaction Fees (2% on direct bookings)" is a separate/legacy concept and should not be carried forward.
3. The `Total Customer Vehicles` needs to be computed from the new per-vehicle model:
   ```
   Total Fleet Vehicles = (Pro Customers × Avg Vehicles Pro) + (Biz Customers × Avg Vehicles Biz) + (Ent Customers × Avg Vehicles Ent)
   ```

---

## 7. Unit Economics Refresh (Summary Dashboard, Rows 25–30)

The old investor page cited: CAC $450, LTV $8,500, 87% gross margin, <3% monthly churn. The proforma's Summary Dashboard already has different (more detailed) values, but all need refreshing for the new pricing.

### 7A. ARPU (Add new row)

**Add to Summary Dashboard (after Row 13 or in Unit Economics section):**
```
Blended Monthly ARPU = $635.70 (or whatever the Assumptions inputs compute)
Blended Annual ARPU = ARPU × 10.6 (prepay-adjusted) ≈ $6,738/year
```

### 7B. CAC (Row 26)

**Current formula logic (reverse-engineered from values):**
```
CAC = Total S&M Spend / New Customers
Y1: $211,340 / 75 = $2,818 ✓
Y2: $1,112,119 / 144 = $7,723 ✓
```

**Action:** This formula is correct conceptually. It will auto-update if S&M spend changes. Just verify after all revenue changes that the S&M amounts (which scale as % of revenue) still make sense.

### 7C. LTV (Row 27)

**Current:** 3-year LTV. Values: $13,348 → $17,455 over 5 years.

**New calculation:**
```
LTV = Blended Annual ARPU × (1 / Annual Churn Rate)
    = Blended Annual ARPU × 20 (at 5% churn = 20-year theoretical lifetime)

Or for 3-year bounded LTV:
LTV (3-Year) = Blended Annual ARPU × 3 × (1 - churn adjustment)
             ≈ $6,738 × 3 × 0.95^1.5
             ≈ $6,738 × 2.78
             ≈ $18,732
```

**Action:** Recalculate using new blended ARPU. Consider including marketplace and insurance revenue per customer in an "expanded LTV" metric.

### 7D. LTV:CAC (Row 28)

```
LTV:CAC = LTV / CAC
```
Should recalculate automatically once LTV and CAC are updated.

### 7E. Gross Margin (Row 17)

**Current:** 85% in Y1 (SaaS only), rising to 94.6% by Y5 (marketplace-heavy).

**New consideration:** Insurance revenue will have lower margins (30–50% vs 85–95%). The blended gross margin needs to weight:
```
Blended Gross Margin = (SaaS Rev × 85%) + (Marketplace Rev × 95%) + (Insurance Rev × Insurance Margin)
                       / Total Revenue
```

### 7F. Churn (Row 30)

**Current:** 5% annual across all years.

**Action:** The old investor page cited "<3% monthly churn." These are inconsistent (3% monthly ≈ 31% annual, not 5%). The 5% annual in the proforma is the correct/conservative figure. Keep it but add a note:
```
Column C note: "5% annual = ~0.43% monthly. Old investor materials citing <3% monthly were aspirational."
```

---

## 8. Sheet-by-Sheet Update Instructions

### Sheet 1: Assumptions
1. Replace rows 10–14 with new per-vehicle pricing (Section 2A)
2. Update tier split in row 22 (Section 2B)
3. Insert vehicle-count assumption rows (Section 2B)
4. Mark marketplace take rate as TBD placeholder (Section 2D)
5. Add Insurance/Damage Waiver assumption section (Section 2F)
6. Add Insurance COGS row (Section 2E)
7. Renumber/adjust all subsequent rows after insertions

### Sheet 2: Use of Cash
- No pricing changes needed. Marketplace development allocation stays the same.
- **Optional:** Add a line item or note about insurance/waiver infrastructure build cost if relevant.

### Sheet 3: Monthly P&L (Y1-Y2)
1. **Row 9 (SaaS MRR):** Recalculate all 24 months using new per-vehicle ARPU × customer count
2. **Row 10 (Onboarding Revenue):** Update tier names in any labels; amounts may stay
3. **Insert new row:** "Insurance / Damage Waiver Revenue" between current rows 12 and 13
4. **Row 13 (TOTAL REVENUE):** Update to sum SaaS + Onboarding + Marketplace + Insurance
5. **Row 16 (SaaS COGS):** Recalculate as 15% of new SaaS Revenue
6. **Insert new row:** "Insurance COGS" (Insurance Rev × Insurance COGS %)
7. **Row 18 (Total COGS):** Update to sum all COGS lines
8. **Row 20 (Gross Profit):** = Total Revenue - Total COGS
9. **Row 21 (Gross Margin):** = Gross Profit / Total Revenue
10. **Row 30 (Sales Commissions):** Currently `=SaaS Revenue × 10% ACV commission / 12`. Verify this still makes sense with per-vehicle pricing — commissions may need to be on new customer revenue, not total.
11. **Row 31 (Marketing):** Y1 = $10K/mo fixed; Y2+ = 15% of total revenue. The Y2+ formula will auto-scale if total revenue changes, but verify the cutover month.
12. **Row 33 (G&A):** Y1 = $5K/mo; Y2+ = 8% of total revenue. Same note.
13. **Row 34 (Total OpEx):** Resum all OpEx lines
14. **Row 36 (EBITDA):** = Gross Profit - Total OpEx
15. **Row 37 (EBITDA Margin):** = EBITDA / Total Revenue

### Sheet 4: Monthly Cash Flow (Y1-Y2)
1. **Row 5 (EBITDA):** Should mirror Monthly P&L Row 36 values
2. **Row 6 (Deferred Revenue):** Recalculate — annual prepay creates deferred revenue. With new ARPU, the monthly deferral recognition changes.
3. **All derived rows:** Recalculate from updated inputs

### Sheet 5: Annual P&L (Y1-Y5)
1. **Row 8 (Ending SaaS MRR):** = December customer count × Blended ARPU
2. **Row 9 (Ending SaaS ARR):** = Ending MRR × 12
3. **Row 12 (SaaS Revenue):** Sum of monthly SaaS revenue for the year
4. **Insert row:** Insurance/Damage Waiver Revenue
5. **Row 14 (Total Revenue):** Sum all revenue lines
6. **Rows 15-16:** Recalculate SaaS % and Marketplace % (add Insurance %)
7. **Row 17 (Marketplace GMV):** Recalculate using new total fleet vehicles
8. **Rows 20-22 (COGS):** Recalculate; add Insurance COGS
9. **Rows 24-25 (Gross Profit / Margin):** Recalculate
10. **Row 29 (S&M):** Recalculate (scales with revenue in Y2+)
11. **Row 30 (G&A):** Recalculate (scales with revenue in Y2+)
12. **Row 31 (Total OpEx):** Resum
13. **Rows 34-36:** Recalculate EBITDA, margins, net income

### Sheet 6: Cash Flow & Balance Sheet
1. **Row 6 (EBITDA):** Mirror Annual P&L
2. **Row 7 (Deferred Revenue):** Recalculate based on new annual prepay amounts
3. **All derived rows:** Recalculate

### Sheet 7: Summary Dashboard
1. **Rows 10-11:** Update SaaS MRR and ARR with new per-vehicle calculations
2. **Row 12 (Total Revenue):** Mirror Annual P&L
3. **Row 13 (YoY Growth):** Recalculate
4. **Rows 16-19:** Recalculate gross profit/margin and EBITDA/margin
5. **Row 22 (Cash):** Mirror Cash Flow sheet
6. **Rows 26-29 (Unit Economics):** Full refresh per Section 7
7. **Add new row:** Blended Monthly ARPU
8. **Add new row:** Insurance/Waiver Revenue
9. **Row 35 (Take Rate):** Mark as TBD or keep 20% with note

### Sheet 8: Headcount Plan
- No direct pricing changes needed.
- **Optional:** If insurance/waiver operations require staff (claims processing, etc.), add a row.

### Sheet 9: SENSITIVITY ANALYSIS
1. **Row 8 (BASE CASE):** Update Revenue per Vehicle per Year if take rate changes
2. **Rows 5-10 (Scenarios):** Recalculate E column (Rev/Vehicle/Yr) for each scenario
3. **Rows 14-20 (Total Revenue by Scenario):** Recalculate — SaaS revenue base changes
4. **Rows 22-29 (Marketplace Revenue):** Recalculate if marketplace params change
5. **Rows 31-38 (EBITDA):** Recalculate
6. **Rows 40-47 (Cash Balance):** Recalculate
7. **Rows 49-56 (Y5 Comparison):** Recalculate all metrics
8. **Rows 59-68 (2-Way Revenue Sensitivity):** Rebuild table with new SaaS base
9. **Rows 71-80 (2-Way EBITDA Sensitivity):** Rebuild

**Consider adding:** Insurance revenue sensitivity scenarios (waiver attach rate × margin matrix).

---

## 9. Current Key Figures (Snapshot for Comparison)

Save these to verify changes look reasonable after update:

| Metric | Y1 (2026) | Y2 (2027) | Y3 (2028) | Y4 (2029) | Y5 (2030) |
|--------|-----------|-----------|-----------|-----------|-----------|
| Customers (EoP) | 75 | 219 | 443 | 755 | 1,172 |
| New Customers | 75 | 144 | 240 | 336 | 468 |
| SaaS Revenue | $358,810 | $1,340,052 | $2,811,504 | $4,681,542 | $7,332,240 |
| Marketplace Revenue | $0 | $4,825,886 | $39,152,354 | $92,976,939 | $165,135,621 |
| Total Revenue | $358,810 | $6,165,938 | $41,963,858 | $97,658,481 | $172,467,861 |
| Gross Margin | 85.0% | 92.8% | 94.3% | 94.5% | 94.6% |
| EBITDA | -$789,351 | $2,280,241 | $26,574,712 | $64,993,750 | $117,126,062 |
| EBITDA Margin | -220.0% | 37.0% | 63.3% | 66.6% | 67.9% |
| Ending Cash | $1,472,361 | $29,434,250 | $57,029,454 | $123,344,261 | $242,144,610 |
| Ending MRR | $30,283 | $111,307 | $225,891 | $376,791 | $589,834 |
| Ending ARR | $363,396 | $1,335,684 | $2,710,692 | $4,521,492 | $7,078,008 |
| CAC | $2,818 | $7,723 | $27,203 | $44,434 | $56,077 |
| LTV (3-Year) | $13,348 | $17,072 | $17,707 | $17,300 | $17,455 |
| LTV:CAC | 4.7x | 2.2x | 0.7x | 0.4x | 0.3x |
| Marketplace GMV | $0 | $24,129,429 | $195,761,771 | $464,884,694 | $825,678,105 |
| Take Rate | 20% | 20% | 20% | 20% | 20% |
| Headcount (EoP) | 4 | 9 | 16 | 28–40 | 40–49 |

### Expected Directional Changes After Update

| Metric | Direction | Rationale |
|--------|-----------|-----------|
| SaaS Revenue | **↑ significantly** | Old blended ARPU ≈ $500/customer/mo; new ≈ $636/customer/mo (+27%) |
| SaaS MRR | **↑** | Same reason |
| Total Revenue | **↑** | Higher SaaS base + new insurance line |
| Gross Margin | **↓ slightly** | Insurance revenue has lower margins (30–50% vs 85–95%) diluting the blend |
| EBITDA | **↑** | Higher revenue, OpEx scales as % of revenue |
| S&M spend | **↑** | Marketing Y2+ is 15% of total revenue — higher base = higher spend |
| G&A | **↑** | G&A Y2+ is 8% of total revenue |
| CAC | **↑** | Higher S&M / same customer count |
| LTV | **↑** | Higher ARPU → higher lifetime value |
| LTV:CAC | **mixed** | Both numerator and denominator increase |

---

## 10. Placeholder Cells — TBD Summary

These cells require user input before the model is finalized. Mark each with a distinctive fill color (e.g., yellow) and a column-C note.

| Assumption | Suggested Location | Placeholder Value | Notes |
|-----------|-------------------|-------------------|-------|
| Marketplace Take Rate | Assumptions B33 | 20% (current) | Mark clearly: "TBD — set actual rate. This is the marketplace commission (same as take rate)." |
| Enterprise Monthly Rate | New Assumptions row | $25/vehicle/month | Placeholder for custom pricing |
| Avg Booking Duration | New Insurance section | 3 days | Affects insurance revenue |
| Waiver Attach Rate | New Insurance section | 50% | % of bookings purchasing waiver |
| Exotiq Margin on Waiver | New Insurance section | 40% | After underwriter costs |
| Insurance COGS % | New COGS row | 60% | = 1 - Exotiq margin |
| Avg Vehicles per Pro Customer | New Assumptions row | 8 | Adjustable |
| Avg Vehicles per Business Customer | New Assumptions row | 30 | Adjustable |
| Avg Vehicles per Enterprise Customer | New Assumptions row | 75 | Adjustable |

---

## 11. Old Investor Page Revenue Mix — Reconciliation

The investor page currently shows this revenue mix:
```
SaaS Subscriptions:    70%
Transaction Fees:      20%  (2% on direct bookings)
Merchant Services:      7%  (payment processing)
Premium Add-ons:        3%
```

**Map to new model:**
| Old Line | New Line | Notes |
|----------|----------|-------|
| SaaS Subscriptions (70%) | SaaS Revenue (per-vehicle) | Repriced entirely |
| Transaction Fees (20%) | Marketplace Revenue (take rate on exotiq.rent) | The old "2% on direct bookings" concept is replaced by the marketplace take rate. These are NOT the same thing — marketplace is a higher-margin platform business. |
| Merchant Services (7%) | Embedded in SaaS COGS or broken out as Stripe Connect line | If Exotiq earns a spread on payment processing via Stripe Connect, model as a separate revenue line. Otherwise, treat processing fees as a COGS offset. |
| Premium Add-ons (3%) | **REMOVE** | All features included on every plan. No add-on gates. |

**New target revenue mix (steady-state, Year 3+):**
The proforma already shows marketplace dominating (93%+ of total revenue by Y3). With the new per-vehicle SaaS pricing, SaaS revenue goes up but marketplace still dominates. Insurance adds a third meaningful stream.

---

## 12. Growth Projections — Old vs New Comparison

**Old investor page 3-year projection:**
| | Year 1 | Year 2 | Year 3 |
|---|--------|--------|--------|
| Customers | 50 | 250 | 500 |
| MRR | $4,500 | $22,500 | $45,000 |
| ARR | $54K | $270K | $540K |
| Margin | 45% | 65% | 70% |

**Current proforma (from actual file):**
| | Year 1 | Year 2 | Year 3 |
|---|--------|--------|--------|
| Customers | 75 | 219 | 443 |
| Ending MRR | $30,283 | $111,307 | $225,891 |
| ARR | $363K | $1.34M | $2.71M |
| Gross Margin | 85% | 92.8% | 94.3% |

The proforma is already more aggressive than the old investor page on revenue (higher ARPU per customer) but more conservative on customer count. After the pricing update, the gap will widen further since per-vehicle pricing increases ARPU by ~27%.

**Action:** The investor page projections should be updated to match the proforma outputs after the update, not the other way around.

---

## 13. Verification Checklist

Run these checks after completing all updates:

### A. Sanity Checks
- [ ] **Blended ARPU:** Verify Assumptions sheet computes ~$636/customer/month (or whatever the final vehicle assumptions yield)
- [ ] **Y1 SaaS Revenue:** 3 starting customers growing to 75 by Dec 2026, at ~$636 blended ARPU. Expected Y1 SaaS Revenue should be roughly $300K–$500K (old was $359K; new should be somewhat higher given 27% ARPU increase)
- [ ] **Y1 Total Revenue = SaaS only** (marketplace launches Q1 2027, insurance follows marketplace)
- [ ] **Insurance Revenue = $0** for all of 2026 and Q1 2027 (marketplace not live yet)
- [ ] **Total Revenue = SaaS + Onboarding + Marketplace + Insurance** on every sheet
- [ ] **COGS rows sum correctly** on every sheet
- [ ] **Gross Profit = Revenue - COGS** on every sheet
- [ ] **EBITDA = Gross Profit - Total OpEx** on every sheet

### B. Cross-Sheet Consistency
- [ ] Monthly P&L Y1 (Mar–Dec 2026) totals match Annual P&L column B (2026)
- [ ] Monthly P&L Y2 (Jan–Dec 2027) totals match Annual P&L column C (2027)
- [ ] Annual P&L EBITDA matches Cash Flow sheet Row 6
- [ ] Summary Dashboard metrics match Annual P&L values
- [ ] Ending Cash on Cash Flow sheet matches Summary Dashboard Row 22

### C. Sensitivity Analysis
- [ ] BASE CASE revenue matches Annual P&L
- [ ] All 6 scenarios recalculated with new SaaS base
- [ ] 2-way sensitivity tables refreshed
- [ ] Notes updated if any assumption descriptions changed

### D. Placeholder Audit
- [ ] All TBD cells have yellow fill and column-C notes
- [ ] Marketplace take rate clearly labeled as placeholder
- [ ] All insurance assumptions clearly labeled as placeholder
- [ ] Enterprise pricing clearly labeled as placeholder

### E. Revenue Mix Validation
- [ ] Y1: 100% SaaS (marketplace not live)
- [ ] Y2: SaaS + Marketplace (insurance should appear mid-year)
- [ ] Y3+: Marketplace dominates but all three streams present
- [ ] No "Premium Add-ons" line anywhere
- [ ] No "Transaction Fees" line (replaced by marketplace)

### F. Unit Economics
- [ ] ARPU reflects new per-vehicle pricing
- [ ] LTV recalculated with new ARPU
- [ ] CAC = S&M / New Customers (verify S&M didn't break)
- [ ] LTV:CAC > 3.0x in Year 1 (healthy threshold)
- [ ] Payback period in months is reasonable (< 18 months for Y1)

---

## 14. Technical Notes for the AI

1. **No formulas exist.** Every cell is a hardcoded value. When you update the file, you have two options:
   - (a) Insert proper Excel formulas so the model is dynamic going forward
   - (b) Recalculate and write new hardcoded values
   - **Strongly prefer option (a)** — the whole point of a proforma is sensitivity to assumption changes.

2. **Use openpyxl** (Python) or a similar library. The file is `.xlsx` format, standard Open XML.

3. **Row insertion will shift references.** When adding Insurance Revenue and COGS rows, all downstream row numbers in this document shift. Track your insertions and adjust references accordingly.

4. **Column layout:**
   - Monthly P&L: B = Mar 2026, C = Apr 2026, ..., K = Dec 2026, L = Jan 2027, ..., Y = Feb 2028
   - Annual P&L: B = 2026 (Y1), C = 2027 (Y2), D = 2028 (Y3), E = 2029 (Y4), F = 2030 (Y5)

5. **Marketplace ramp curve:** The current model ramps marketplace adoption from 10% to 85% over 48 months. This is a separate curve from the SaaS adoption rate. The monthly marketplace revenue values in the Monthly P&L show the ramp starting in Apr 2027 (column O) at $187,526 and growing rapidly.

6. **Deferred revenue:** 70% of customers prepay annually. This creates a deferred revenue liability that unwinds monthly. The Cash Flow sheet tracks this separately. With higher per-vehicle ARPU, the deferred revenue amounts will increase proportionally.

7. **Annual prepay math:** Annual billing saves 2 months (pay for 10, get 12). So annual price = monthly price × 10. This means:
   - Pro Annual: $39 × 10 = $390/vehicle/year
   - Business Annual: $29 × 10 = $290/vehicle/year

8. **Headcount plan is independent.** Personnel costs in the P&L should reference the Headcount Plan but are currently hardcoded. If you rebuild with formulas, link Personnel costs to Headcount Plan × salary assumptions.

9. **The "Engineering & Product" line in Monthly P&L Row 26 has anomalous values** (B26 = $1,964,736 in March 2026). Cross-referencing with Monthly Cash Flow Row 13, this appears to be the Beginning Cash balance that was accidentally placed in this cell, or a copy-paste artifact. The correct Engineering & Product monthly cost should be ~$0 in Mar 2026 (no engineers hired yet per Headcount Plan) growing to ~$26,667/month by Q3 2026. Investigate and fix this.

10. **File path:** `/Users/g.r./Documents/EXOTIQ/Corporate/FINANCIALS/Exotiq 5 Year Proforma Final (SA).xlsx`
    - Create a backup before modifying: copy to `Exotiq 5 Year Proforma Final (SA) — BACKUP PRE-PRICING-UPDATE.xlsx`

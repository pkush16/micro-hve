<!-- markdownlint-disable-file -->
<!-- markdown-table-prettify-ignore-start -->
# 10-Minute Delivery App — MVP Product Requirements Document (PRD)
Version 1.0 | Status Draft | Owner TBC | Team Wipro / micro-hve | Target 2-Day Sprint | Lifecycle MVP POC

## Progress Tracker
| Phase | Done | Gaps | Updated |
|-------|------|------|---------|
| Context | ✅ | — | 2026-04-19 |
| Problem & Users | ✅ | — | 2026-04-19 |
| Scope | ✅ | — | 2026-04-19 |
| Requirements | ✅ | Status transition timing TBD | 2026-04-19 |
| Metrics & Risks | ✅ | — | 2026-04-19 |
| Operationalization | ✅ | — | 2026-04-19 |
| Finalization | ⏳ | Awaiting stakeholder sign-off | 2026-04-19 |
Unresolved Critical Questions: 1 | TBDs: 2

---

## 1. Executive Summary

### Context
The 10-minute delivery segment is fast-growing in last-mile logistics. This MVP is a 2-day Proof-of-Concept (POC) web application that simulates the complete customer journey — browse, cart, checkout, and mock delivery tracking — within a 10-minute window. No backend, no payment gateway, and no authentication are required. The entire application runs on local/session state in the browser.

### Core Opportunity
Validate the end-to-end user experience of a hyper-local 10-minute delivery service with the lowest possible build cost. The POC acts as a stakeholder alignment artefact and a reusable frontend foundation for future iterations.

### Goals
| Goal ID | Statement | Type | Baseline | Target | Timeframe | Priority |
|---------|-----------|------|----------|--------|-----------|----------|
| G-001 | Ship a working end-to-end POC | Delivery | None | Full user flow completable without errors | 2 days | P0 |
| G-002 | Simulate 10-minute delivery experience | UX Validation | None | Timer accurate ±1s; 4 mock statuses displayed in sequence | 2 days | P0 |
| G-003 | Responsive on mobile and desktop | Accessibility | None | No layout issues at 375px, 768px, 1280px | 2 days | P0 |
| G-004 | Keep implementation dependency-free | Engineering | None | Zero external API calls; no backend required | 2 days | P0 |

---

## 2. Problem Definition

### Current Situation
There is no existing system — this is a greenfield POC. The team needs a tangible demo to evaluate the 10-minute delivery UX concept before committing to backend infrastructure.

### Problem Statement
Stakeholders cannot assess the viability or usability of a 10-minute delivery experience without a working prototype. Building a full system before validating UX assumptions is high-risk and costly.

### Root Causes
* No existing frontend prototype to demonstrate the concept.
* Uncertainty about user flow and interaction patterns for hyper-local delivery.
* Need for rapid, low-cost validation before Phase 2 investment decisions.

### Impact of Inaction
Without this POC, the team risks investing in backend infrastructure and payment integration before validating whether the core UX resonates with users or stakeholders.

---

## 3. Users & Personas

| Persona | Goals | Pain Points | Impact |
|---------|-------|------------|--------|
| **Demo User / Evaluator** | Experience the full order-to-delivery flow in one session | Cannot visualise the concept without a live prototype | Primary — drives all UX decisions |
| **Stakeholder / Sponsor** | Assess concept viability and approve next phase | Needs a tangible artefact, not slide decks | High — go/no-go decision maker |
| **Developer** | Build and iterate fast within 2-day constraint | Scope creep; external dependencies slow delivery | High — must stay within local-state-only boundary |

### User Journey (Happy Path)
```
Browse Catalog
    ↓ Search / scroll to find product
Add to Cart (with quantity)
    ↓ Adjust or remove as needed
View Cart Summary
    ↓ Review itemised list + total
Checkout — Enter Delivery Address
    ↓ Submit order
Order Confirmation Screen (unique Order ID shown)
    ↓ 10-min timer starts automatically
Delivery Tracking Screen
    ↓ Status: Order Confirmed → Preparing → Out for Delivery → Delivered
Mock Delivery Confirmation (at 10:00 → 00:00)
```

---

## 4. Scope

### In Scope
* Product catalog page — fixed static inventory (name, image, price, available qty)
* Product search by name
* Shopping cart — add, adjust quantity, remove, total price
* Checkout form — delivery address (street, city, postcode)
* Order confirmation screen with unique client-side order ID
* Delivery tracking screen with 10-minute countdown timer
* Mock status updates: Order Confirmed → Preparing → Out for Delivery → Delivered
* Mock delivery confirmation at timer completion
* Responsive web UI (mobile + desktop)
* Local/session state management — no backend

### Out of Scope
* Payment gateway or any financial transaction
* Real inventory or backend database
* User authentication or accounts
* Real GPS tracking or actual logistics
* Push / browser notifications
* Native mobile app (iOS / Android)
* Admin or operations dashboard
* Data persistence across page refreshes

### Assumptions
* Product catalog data is static and pre-seeded in code.
* Order IDs are generated client-side (e.g., UUID v4 or timestamp-based).
* Timer accuracy via `Date`-based elapsed calculation + Page Visibility API is sufficient.
* All stakeholders accept mock/simulated delivery — no real fulfilment.
* 2-day build means no design review cycle; functional correctness over visual polish.

### Constraints
* Build time: **≤ 2 days** (hard constraint).
* No external APIs, no backend, no third-party services.
* Responsive web only — no native app.
* No real payment or PII handling.

---

## 5. Product Overview

### Value Proposition
A fully interactive, dependency-free web POC that lets any stakeholder experience a convincing 10-minute delivery journey in under 15 minutes — enabling confident go/no-go decisions for Phase 2.

### Differentiators
* Zero-backend architecture — runs entirely in the browser.
* 2-day delivery — fastest path to a stakeholder-ready demo.
* Reusable component foundation for future iterations.

### UX / UI
Four screens in a linear flow: Catalog → Cart → Checkout → Tracking. Simple, functional UI; no design system required for MVP. Responsive layout using CSS flexbox/grid. UX Status: Functional MVP (polish deferred to Phase 2).

---

## 6. Functional Requirements

| FR ID | Title | Description | Goals | Personas | Priority | Acceptance Criteria | Notes |
|-------|-------|-------------|-------|----------|----------|---------------------|-------|
| FR-001 | Display Product Catalog | Show fixed inventory list with name, image, price, and available qty for each product | G-001, G-004 | Demo User | P0 | All products rendered with all 4 attributes; no broken images | Static data in code |
| FR-002 | Browse Products | User can scroll through full catalog | G-001 | Demo User | P0 | All items visible without any interaction required | — |
| FR-003 | Search Products by Name | Real-time or on-submit filter of catalog by product name | G-001 | Demo User | P0 | Matching products shown within 1s; empty state shown for no results | Case-insensitive |
| FR-004 | Add Product to Cart | User selects a product and desired quantity; item added to cart | G-001 | Demo User | P0 | Item appears in cart with correct name, qty, and unit price | Respect available qty |
| FR-005 | Adjust Cart Quantity | User can increase or decrease quantity of a cart item | G-001 | Demo User | P0 | Subtotal and grand total update immediately on change | Min qty = 1 |
| FR-006 | Remove Cart Item | User can remove any item from cart | G-001 | Demo User | P0 | Item removed; totals recalculate correctly; cart empty state shown if no items remain | — |
| FR-007 | View Cart Summary | Cart screen shows itemised list (name, qty, subtotal) and grand total | G-001 | Demo User | P0 | All items and correct grand total displayed | — |
| FR-008 | Checkout — Address Collection | Checkout form collects street, city, and postcode | G-001 | Demo User | P0 | Form validates all 3 fields are non-empty before allowing submission | No backend submit |
| FR-009 | Order Confirmation + Unique Order ID | On checkout submit, display confirmation screen with unique order ID | G-001 | Demo User, Stakeholder | P0 | Order ID is unique per session; address and cart summary shown on confirmation screen | Client-side UUID |
| FR-010 | Start 10-Minute Countdown Timer | Timer begins at 10:00 immediately on order confirmation | G-002 | Demo User | P0 | Timer visible; starts at 10:00; counts down to 00:00 | — |
| FR-011 | Mock Delivery Status Updates | Display status sequence: Order Confirmed → Preparing → Out for Delivery → Delivered | G-002 | Demo User, Stakeholder | P0 | Each status shown at defined interval; active status visually highlighted | See timing table below |
| FR-012 | Mock Delivery Confirmation | "Delivered" state shown when timer reaches 00:00 | G-002 | Demo User | P0 | Delivered status active at or before 00:00; user sees completion screen | — |
| FR-013 | Background Timer Continuity | Timer does not pause when browser tab is in background | G-002 | Demo User | P0 | On tab return, timer reflects correct elapsed time; status is consistent | Use Page Visibility API + Date.now() |

### Status Transition Timing (Proposed)

| Status | Trigger Time | Timer Display |
|--------|-------------|--------------|
| Order Confirmed | 0:00 (immediate) | 10:00 |
| Preparing | ~2:00 elapsed | ~8:00 remaining |
| Out for Delivery | ~6:00 elapsed | ~4:00 remaining |
| Delivered | 10:00 elapsed | 00:00 |

> ⚠️ **Open Question OQ-001**: Confirm these transition times with the Product Owner before implementation.

---

## 7. Non-Functional Requirements

| NFR ID | Category | Requirement | Metric / Target | Priority | Validation | Notes |
|--------|----------|-------------|----------------|----------|-----------|-------|
| NFR-001 | Performance | Page load time | Initial load < 2s on standard broadband | P0 | Manual browser check | Static assets only |
| NFR-002 | Responsiveness | Layout integrity across viewports | No overflow or overlap at 375px, 768px, 1280px | P0 | Browser DevTools responsive mode | — |
| NFR-003 | Reliability | Timer accuracy | ±1 second over 10-minute window | P0 | Manual timing test | Date.now()-based delta |
| NFR-004 | Usability | Task completion | User can complete full flow in < 5 minutes with no instructions | P1 | Informal walkthrough with 1–2 observers | — |
| NFR-005 | Maintainability | Zero external dependencies (for POC) | No npm packages required for core logic | P0 | `package.json` audit | Framework allowed (React/Vue/vanilla) |
| NFR-006 | Accessibility | Basic keyboard navigation | All interactive elements reachable via Tab key | P1 | Manual keyboard test | Full WCAG deferred to Phase 2 |

---

## 8. Data & Analytics

### Inputs
* Static product catalog array (hard-coded in source or JSON file): `{ id, name, image, price, availableQty }`
* User-entered delivery address fields: `street`, `city`, `postcode`
* User cart actions: add, update qty, remove

### Outputs / Events
* Order record: `{ orderId, items[], address, placedAt }`
* Timer state: `{ startTime, elapsedSeconds, currentStatus }`
* Delivery status transitions: logged to local state

### Metrics & Success Criteria
| Metric | Type | Baseline | Target | Window | Source |
|--------|------|----------|--------|--------|--------|
| Full flow completion rate | UX | — | 100% in demo session | POC demo | Manual observation |
| Timer accuracy | Technical | — | ±1 second | 10 min | Manual test |
| Responsive breakpoint pass rate | UI | — | 100% at 3 breakpoints | POC demo | DevTools |
| Build completion within 2 days | Delivery | — | All P0 FRs shipped | Sprint end | Dev checklist |

---

## 9. Dependencies

| Dependency | Type | Criticality | Owner | Risk | Mitigation |
|-----------|------|------------|-------|------|-----------|
| Static product data (images, names, prices) | Content | High | Dev team | Placeholder data may look unrealistic | Use royalty-free images + realistic grocery/FMCG names |
| Frontend framework choice (React / Vue / Vanilla) | Technical | Medium | Dev team | Framework overhead in 2-day sprint | Choose familiar stack; vanilla JS acceptable |
| Browser Page Visibility API | Platform | Medium | Dev team | Minor browser compatibility edge cases | Widely supported; fallback to Date.now() delta |

---

## 10. Risks & Mitigations

| Risk ID | Description | Severity | Likelihood | Mitigation | Owner | Status |
|---------|-------------|---------|-----------|-----------|-------|--------|
| R-001 | Scope creep (auth, payments, backend) | High | Medium | Strictly enforce Out of Scope; defer all additions to Phase 2 | Product Owner | Open |
| R-002 | Timer drift in background tabs | Medium | Medium | Use `Date.now()` delta + Page Visibility API, not `setInterval` counter | Dev team | Open |
| R-003 | 2-day timeline slippage | High | Low | All P0 requirements are frontend-only; no integration points | Dev team | Open |
| R-004 | Static product data appears unconvincing | Low | Low | Use realistic grocery/FMCG product names, prices, and free images | Dev team | Open |

---

## 11. Privacy, Security & Compliance

### Data Classification
Demo / synthetic data only. No real PII is collected or stored.

### PII Handling
The checkout address form collects a delivery address for display purposes only. It is stored in session state and never transmitted to any server. No persistence beyond the browser session.

### Threat Considerations
None applicable for a local-state-only POC with no backend, authentication, or network calls.

### Regulatory / Compliance
Not applicable for this POC phase.

---

## 12. Operational Considerations

| Aspect | Requirement | Notes |
|--------|------------|-------|
| Deployment | Static file hosting (GitHub Pages, Vercel, or local dev server) | No server-side runtime required |
| Rollback | Not applicable — static files; redeploy previous build | — |
| Monitoring | None for POC | Deferred to Phase 2 |
| Alerting | None for POC | Deferred to Phase 2 |
| Support | Dev team self-serves during 2-day sprint | — |
| Capacity Planning | Single-user demo; no scale consideration | — |

---

## 13. Rollout & Launch Plan

### 2-Day Sprint Phases

| Phase | Target | Gate Criteria | Owner |
|-------|--------|--------------|-------|
| Day 1 AM | Project scaffold + product catalog + search | FR-001, FR-002, FR-003 working | Dev team |
| Day 1 PM | Shopping cart (add, adjust, remove, summary) | FR-004 → FR-007 working | Dev team |
| Day 2 AM | Checkout form + order confirmation + order ID | FR-008, FR-009 working | Dev team |
| Day 2 PM | Delivery tracking screen + timer + statuses + responsive polish | FR-010 → FR-013 + NFR-001, NFR-002, NFR-003 passing | Dev team |
| Day 2 EOD | Internal demo / stakeholder walkthrough | All P0 FRs verified; no blocking bugs | Product Owner |

### Feature Flags
Not applicable for POC — all features ship together.

---

## 14. Open Questions

| Q ID | Question | Owner | Deadline | Status |
|------|----------|-------|---------|--------|
| OQ-001 | Confirm mock status transition times (0min / 2min / 6min / 10min) | Product Owner | Day 1 start | Open |
| OQ-002 | Confirm minimum delivery address fields (street + city + postcode proposed) | Product Owner | Day 1 start | Open |

---

## 15. Changelog

| Version | Date | Author | Summary | Type |
|---------|------|-------|---------|------|
| 1.0 | 2026-04-19 | PRD Builder Agent | Initial draft from requirements.md and BRD | Created |

---

## 16. References & Provenance

| Ref ID | Type | Source | Summary | Conflict Resolution |
|--------|------|--------|---------|--------------------|
| REF-001 | Requirements | `.github/requirements.md` | Core feature list: catalog, cart, checkout, 10-min timer, mock statuses, responsive UI | Source of truth |
| REF-002 | BRD | `docs/brds/10min-delivery-mvp-brd.md` | Business objectives, stakeholders, BR-001–016 | Aligned; BRD informs this PRD |

---

## 17. Appendices

### Glossary
| Term | Definition |
|------|-----------|
| POC | Proof of Concept — a working demo to validate assumptions before full investment |
| Local state | Data stored in browser memory (React state, Vue reactive data, or vanilla JS variables) — not persisted to a server |
| Page Visibility API | Browser API that exposes whether a tab is active or hidden, used to keep the timer accurate in background tabs |
| MVP | Minimum Viable Product — the smallest set of features that delivers demonstrable value |
| Mock status | A simulated delivery status update triggered by a timer, not by real logistics events |

Generated 2026-04-19T19:50:05Z by PRD Builder Agent (mode: requirements-integration)
<!-- markdown-table-prettify-ignore-end -->

---
title: "10-Minute Delivery App — MVP Business Requirements Document"
description: "BRD for the MVP of a 10-minute delivery POC application covering product catalog, cart, order placement, and mock delivery tracking."
author: "Business Analyst"
ms.date: "2026-04-19"
ms.topic: "business-requirements"
---

# Business Requirements Document: 10-Minute Delivery App MVP

---

## 1. Business Context and Background

The 10-minute delivery space has become a high-growth segment in last-mile logistics. This initiative is a Proof-of-Concept (POC) that simulates the end-to-end customer journey of a hyper-local delivery service — from product browsing to mock delivery confirmation — within a 10-minute window.

The MVP is scoped to a responsive web application with a fixed product inventory, no payment gateway, and simulated delivery tracking. This POC is intended to validate core user-flow assumptions and serve as a baseline for future iterations.

---

## 2. Problem Statement and Business Drivers

| Driver | Description |
|--------|-------------|
| **Market Validation** | Demonstrate the viability of a 10-minute delivery UX before committing to full-scale infrastructure investment. |
| **Stakeholder Alignment** | Provide a tangible artefact for internal stakeholders to evaluate the concept and prioritise features. |
| **Speed-to-Demo** | Deliver a working POC quickly with minimal dependencies (no payment, no real inventory backend). |

---

## 3. Business Objectives and Success Metrics

| ID | Objective | Success Metric | Baseline | Target |
|----|-----------|----------------|----------|--------|
| OBJ-01 | Enable end-to-end order flow simulation | User can complete full journey: browse → cart → checkout → tracking | None (new) | 100% of user steps completable without error |
| OBJ-02 | Validate 10-minute delivery experience | Timer starts on order confirmation and completes at 10 minutes | None (new) | Timer accuracy ±1 second; mock status updates fire on schedule |
| OBJ-03 | Responsive multi-device accessibility | App renders correctly on desktop and mobile viewports | None (new) | No layout breakage at 375px, 768px, 1280px widths |
| OBJ-04 | Demonstrate search and browse usability | Users can find products via catalog browse and search | None (new) | Product located within 3 interactions |

---

## 4. Stakeholders and Roles

| Role | Stakeholder | Interest / Responsibility |
|------|-------------|--------------------------|
| **Sponsor / Product Owner** | To Be Confirmed | Approves scope; defines go/no-go criteria for next phase |
| **End User (Customer)** | Simulated consumer | Browses, adds to cart, places order, tracks delivery |
| **Development Team** | Wipro / micro-hve team | Builds, tests, and deploys the POC |
| **Business Analyst** | Author | Captures and validates requirements |
| **QA / Reviewer** | To Be Confirmed | Validates acceptance criteria |

---

## 5. Scope

### 5.1 In Scope

- Product catalog display with fixed/static inventory (name, image, price, available quantity)
- Product search and browse functionality
- Shopping cart (add, adjust quantity, remove items, view summary with total price)
- Checkout flow: delivery address collection, order confirmation with unique order ID
- 10-minute countdown timer triggered on order placement
- Mock delivery status updates: *Order Confirmed → Preparing → Out for Delivery → Delivered*
- Mock delivery confirmation on timer completion
- Responsive web UI
- Local state management (cart, order, timer)

### 5.2 Out of Scope

- Payment gateway or financial transaction processing
- Real inventory management or backend database
- User authentication / account management
- Real-time GPS or actual logistics integration
- Push notifications or native mobile app
- Admin / operations dashboard

---

## 6. Business Requirements

### 6.1 Product Catalog

| ID | Requirement | Linked Objective | Priority | Acceptance Criteria |
|----|-------------|-----------------|----------|---------------------|
| BR-001 | The system shall display a fixed inventory of products, each showing name, image, price, and available quantity. | OBJ-01, OBJ-04 | Must Have | All products display all four attributes; no broken images |
| BR-002 | The system shall allow users to browse products in a catalog view. | OBJ-01, OBJ-04 | Must Have | All catalog items visible in a scrollable/pageable list |
| BR-003 | The system shall allow users to search products by name. | OBJ-04 | Must Have | Search returns matching products within 1 second; empty state shown for no results |

### 6.2 Shopping Cart

| ID | Requirement | Linked Objective | Priority | Acceptance Criteria |
|----|-------------|-----------------|----------|---------------------|
| BR-004 | The system shall allow users to add products to the cart with a specified quantity. | OBJ-01 | Must Have | Added item appears in cart with correct quantity and price |
| BR-005 | The system shall allow users to adjust item quantities in the cart. | OBJ-01 | Must Have | Quantity updates reflect in item subtotal and cart total immediately |
| BR-006 | The system shall allow users to remove items from the cart. | OBJ-01 | Must Have | Item removed; totals recalculate correctly |
| BR-007 | The system shall display a cart summary with an itemised list and total price. | OBJ-01 | Must Have | Summary shows each item (name, qty, subtotal) and an accurate grand total |

### 6.3 Order Placement

| ID | Requirement | Linked Objective | Priority | Acceptance Criteria |
|----|-------------|-----------------|----------|---------------------|
| BR-008 | The system shall provide a simple checkout process that does not require payment integration. | OBJ-01 | Must Have | User can complete checkout without entering any payment details |
| BR-009 | The system shall collect a delivery address from the user during checkout. | OBJ-01 | Must Have | Address fields (street, city, postcode minimum) captured and displayed on confirmation |
| BR-010 | The system shall generate a unique order ID upon order confirmation and display it to the user. | OBJ-01 | Must Have | Order ID is unique per session; displayed on confirmation screen |

### 6.4 Delivery Tracking

| ID | Requirement | Linked Objective | Priority | Acceptance Criteria |
|----|-------------|-----------------|----------|---------------------|
| BR-011 | The system shall start a 10-minute countdown timer immediately upon order placement. | OBJ-02 | Must Have | Timer visible on delivery tracking screen; begins at 10:00 and counts down |
| BR-012 | The system shall display mock delivery status updates in sequence: *Order Confirmed → Preparing → Out for Delivery → Delivered*. | OBJ-02 | Must Have | Each status displays at appropriate intervals within the 10-minute window |
| BR-013 | The system shall display a mock delivery confirmation when the 10-minute timer completes. | OBJ-02 | Must Have | "Delivered" status shown at or before timer reaches 00:00 |
| BR-014 | The timer shall continue to function when the browser tab is in the background. | OBJ-02 | Must Have | Timer does not pause or reset when tab loses focus; status remains consistent on return |

### 6.5 Non-Functional / Cross-Cutting

| ID | Requirement | Linked Objective | Priority | Acceptance Criteria |
|----|-------------|-----------------|----------|---------------------|
| BR-015 | The application shall be responsive and usable on mobile, tablet, and desktop viewports. | OBJ-03 | Must Have | No horizontal scroll, no overlapping elements at 375px, 768px, and 1280px widths |
| BR-016 | Cart and order state shall be managed locally within the session without requiring a backend API. | OBJ-01 | Must Have | Full user flow completable without any network calls to external services |

---

## 7. Current and Future Business Processes

### 7.1 Current State (Baseline)
No existing system — this is a greenfield POC.

### 7.2 Future State (MVP User Flow)

```
[Browse Catalog] → [Search / Filter] → [Add to Cart]
       ↓
[View Cart & Adjust] → [Proceed to Checkout]
       ↓
[Enter Delivery Address] → [Confirm Order]
       ↓
[Order ID Generated] → [10-min Timer Starts]
       ↓
[Status: Order Confirmed] → [Preparing] → [Out for Delivery] → [Delivered]
```

---

## 8. Data and Reporting Requirements

| ID | Data Element | Source | Notes |
|----|-------------|--------|-------|
| DR-001 | Product catalog (name, image, price, qty) | Static/local data | Fixed dataset for POC; no backend required |
| DR-002 | Cart state (items, quantities, totals) | Local state | Session-scoped; does not persist across page refresh |
| DR-003 | Order record (order ID, address, items) | Local state | Unique order ID generated client-side (e.g., UUID) |
| DR-004 | Delivery status sequence | Hardcoded / timer-driven | Status transitions at predefined time intervals |

---

## 9. Benefits and High-Level Economics

| Benefit | Type | Description |
|---------|------|-------------|
| Rapid stakeholder alignment | Strategic | Tangible demo reduces ambiguity and accelerates go/no-go decisions |
| Low build cost | Economic | No third-party integrations; purely frontend reduces dev complexity and cost |
| Reusable foundation | Technical | Component-based UI can be extended in subsequent phases |
| Risk reduction | Risk | Validates UX assumptions before investing in real logistics/payment infrastructure |

---

## 10. Risks and Assumptions

### 10.1 Assumptions

- Product catalog data is predefined and static for the POC.
- No real users, real addresses, or real deliveries are involved.
- Timer accuracy is sufficient using browser-native `setInterval`/`setTimeout` with visibility API support.
- The POC is a demo environment; data persistence beyond a browser session is not required.

### 10.2 Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Timer inaccuracy in background tabs | Medium | Medium | Use `Page Visibility API` + `Date`-based elapsed time calculation |
| Scope creep (payment, auth requests) | Medium | High | Strictly enforce Out of Scope boundary; defer to Phase 2 |
| Static data feels unrealistic | Low | Low | Use representative product names, images, and prices |

---

## 11. Approval and Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner / Sponsor | TBC | | |
| Business Analyst | | 2026-04-19 | |
| Development Lead | TBC | | |

---

*Document Status: **Draft** — Pending stakeholder review and sign-off.*

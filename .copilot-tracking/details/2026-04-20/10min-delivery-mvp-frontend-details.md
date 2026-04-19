<!-- markdownlint-disable-file -->
# Implementation Details: 10-Minute Delivery MVP Frontend

## Context Reference

Sources: .copilot-tracking/research/2026-04-20/tech-stack-research.md, .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md, docs/prds/10min-delivery-mvp.md

## Implementation Phase 1: Project setup and architecture baseline

<!-- parallelizable: false -->

### Step 1.1: Scaffold Vue 3 plus Vite application

Initialize the project using Vue 3 plus Vite and establish the baseline directory structure for views, components, composables, utilities, styles, and mock data.

Files:
* package.json - Define scripts and dependencies for local development and production build
* vite.config.js - Configure build behavior and development server defaults
* src/main.js - Bootstrap Vue app and register router
* src/App.vue - Create app shell and root layout container

Discrepancy references:
* Addresses DR-01 by documenting unresolved script and dependency baseline as a required setup decision before implementation.

Success criteria:
* Vue 3 plus Vite app starts locally with development server
* Baseline folders exist and match planned architecture

Context references:
* .copilot-tracking/research/2026-04-20/tech-stack-research.md (Lines 150-221) - Selected stack and setup commands
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 30-74) - Architecture and file-level starting points

Dependencies:
* Node.js and npm installed
* Access to project workspace root

### Step 1.2: Establish routing and top-level view flow

Implement 4-screen routing for Catalog, Cart, Checkout, and Tracking. Confirm route transitions align with MVP flow and do not require backend dependencies.

Files:
* src/router/index.js - Define route map and navigation flow
* src/views/CatalogView.vue - Product catalog screen entry point
* src/views/CartView.vue - Cart summary and quantity control screen
* src/views/CheckoutView.vue - Checkout form and submission screen
* src/views/TrackingView.vue - Countdown and delivery timeline screen

Success criteria:
* Route navigation works end-to-end across all 4 screens
* Screen flow stays client-side and frontend-only

Context references:
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 64-88) - Required views and route structure
* docs/prds/10min-delivery-mvp.md (Lines 1-260) - Functional flow and page expectations

Dependencies:
* Step 1.1 completion

### Step 1.3: Finalize lint and test toolchain baseline

Decide and configure lint and test tooling before phase-level validation commands are executed. Confirm package scripts exist for lint and build, and define whether test commands are mandatory or conditional for the POC.

Files:
* package.json - Add or confirm lint, build, and test scripts
* README.md - Document agreed local validation command set for implementers

Discrepancy references:
* Addresses DR-01 by introducing an explicit gating decision before required validation execution.

Success criteria:
* Lint and build scripts are confirmed and runnable
* Test command expectation is explicitly documented as required or conditional

Context references:
* .copilot-tracking/research/2026-04-20/tech-stack-research.md (Lines 301-303) - Tooling baseline marked as TBD
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 111-116) - Unresolved lint/test baseline gap

Dependencies:
* Step 1.2 completion

### Step 1.4: Validate phase changes

Run lint and build commands for setup and routing files after this phase completes.

Validation commands:
* npm run lint - Validate Vue files, router configuration, and script quality
* npm run build - Verify production bundle compiles successfully

## Implementation Phase 2: Core domain logic and UI behavior

<!-- parallelizable: true -->

### Step 2.1: Implement cart, checkout, and order state with Composition API

Create composables for cart updates, checkout form state, and order tracking state. Keep all state in browser memory and avoid external services.

Files:
* src/composables/useCart.js - Cart item operations and totals
* src/composables/useCheckout.js - Checkout form state and validation rules
* src/composables/useOrderTracking.js - Order lifecycle and tracking state
* src/data/mockCatalog.js - Static product data for catalog rendering

Discrepancy references:
* Addresses DD-01 by explicitly selecting built-in Vue reactivity over external state libraries.

Success criteria:
* Add, update, and remove cart operations behave correctly
* Checkout validation blocks invalid submissions
* Order state transitions are available to tracking view

Context references:
* .copilot-tracking/research/2026-04-20/tech-stack-research.md (Lines 107-148) - State management and form handling recommendations
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 42-61) - Domain state composable architecture

Dependencies:
* Implementation Phase 1 completion

### Step 2.2: Implement countdown timer and delivery status progression

Build a timer utility using Date.now delta tracking with visibility-aware corrections, then wire it to tracking UI status milestones.

Files:
* src/utils/countdownTimer.js - Visibility-safe countdown timer implementation
* src/utils/orderStatusFlow.js - Map elapsed time to status transitions
* src/components/CountdownTimer.vue - UI timer presentation
* src/components/DeliveryTimeline.vue - UI status timeline presentation

Success criteria:
* Timer accuracy remains within plus or minus one second
* Status transitions follow expected order and timing boundaries
* Tab hide/show does not break elapsed-time correctness

Context references:
* .copilot-tracking/research/2026-04-20/tech-stack-research.md (Lines 97-106) - Timer reliability pattern
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 49-55) - Utility and component split recommendation

Dependencies:
* Step 2.1 completion

### Step 2.3: Validate phase changes

Run scoped quality checks for logic-heavy modules in this phase.

Validation commands:
* npm run lint - Ensure composables, utilities, and components pass lint rules
* npm run build - Confirm timer and tracking integrations compile in production build
* npm run test -- countdownTimer orderStatusFlow - Run focused utility tests if test runner is configured

## Implementation Phase 3: Responsive styling, accessibility, and integration polish

<!-- parallelizable: false -->

### Step 3.1: Implement responsive layouts and interaction polish

Apply baseline visual styles with CSS Grid/Flexbox and ensure breakpoint behavior at 375px, 768px, and 1280px.

Files:
* src/styles/base.css - Global style tokens and resets
* src/styles/layout.css - Core page and component layout rules
* src/styles/responsive.css - Breakpoint-specific overrides
* src/components/ProductList.vue - Product rendering and responsive controls
* src/components/CartSummary.vue - Cart summary interactions
* src/components/CheckoutForm.vue - Form layout, field states, and validation messaging

Success criteria:
* Key screens render correctly at all required breakpoints
* Keyboard navigation is functional for primary interactions
* Checkout validation feedback is visible and understandable

Context references:
* .copilot-tracking/research/2026-04-20/tech-stack-research.md (Lines 119-123) - Styling approach recommendation
* .copilot-tracking/research/subagents/2026-04-20/tech-stack-plan-context-research.md (Lines 90-104) - Validation focus and responsive checks

Dependencies:
* Implementation Phase 1 and Implementation Phase 2 completion

### Step 3.2: Validate phase changes

Run lint/build and manual smoke checks for integrated user flow.

Validation commands:
* npm run lint - Validate templates, styling hooks, and script interactions
* npm run build - Verify final static bundle is generated
* Manual smoke check - Catalog to Cart to Checkout to Tracking route progression
* Manual responsive check - Confirm behavior at 375px, 768px, and 1280px

## Implementation Phase 4: Validation

<!-- parallelizable: false -->

### Step 4.1: Run full project validation

Execute all validation commands for the project:
* npm run lint
* npm run build
* npm run test -- countdownTimer orderStatusFlow (or equivalent targeted high-value checks)
* Run full test suite only if test tooling is configured and required by project baseline

### Step 4.2: Fix minor validation issues

Iterate on lint errors, build warnings, and test failures. Apply fixes directly when corrections are straightforward and isolated.

### Step 4.3: Report blocking issues

When validation failures require changes beyond minor fixes:
* Document the issues and affected files.
* Provide the user with next steps.
* Recommend additional research and planning rather than inline fixes.
* Avoid large-scale refactoring within this phase.

### Step 4.4: Publish implementation outcome summary and deferred scope handoff

Record implementation completion status, list artifacts produced, and summarize unresolved or deferred work items for follow-on planning.

Files:
* .copilot-tracking/changes/2026-04-20/10min-delivery-mvp-frontend-changes.md - Implementation summary output target
* .copilot-tracking/plans/logs/2026-04-20/10min-delivery-mvp-frontend-log.md - Deferred scope and follow-on work reference

Success criteria:
* Completion summary references implemented scope and validation outcomes
* Deferred items are explicitly linked to planning log WI entries

## Dependencies

* Node.js and npm compatible with selected Vite version
* Vue 3 plus Vite scaffold commands
* Frontend-only scope agreement from research constraints

## Success Criteria

* Planned phases can be executed in order with explicit validation gates
* All P0 MVP frontend behaviors are mapped to actionable implementation steps
* Deferred scope and unresolved research gaps are captured in planning log
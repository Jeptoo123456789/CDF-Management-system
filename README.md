# Northstar CDF Management System

A dependency-free runnable front-end MVP for the Constituency Development Fund system described in `CDF-MANAGEMENT-SYSTEM-ARCHITECTURE.md`.

## Run

Open `index.html` directly in a browser. No build step or package installation is required.

## Included MVP surfaces

- Programme overview with fund movement, KPIs, action queue, and recent transactions
- Bursary priority queue with weighted score breakdown and instant-approval eligibility
- Approval and disbursement interaction feedback
- Infrastructure portfolio with project budgets, spend, progress, and proof coverage
- Evidence review queue with location, timestamp, file-integrity, and stage checks
- Reporting centre and ward snapshots
- Immutable audit activity view
- Responsive mobile navigation and layouts

## Production path

The current UI uses seeded data and browser-side interactions so it can be reviewed immediately. The target production implementation, database schema, API contracts, payment provider adapter, evidence verification controls, and deployment recommendations are documented in `CDF-MANAGEMENT-SYSTEM-ARCHITECTURE.md`.

The next implementation step is to connect these views to authenticated REST endpoints and PostgreSQL/PostGIS, preserving the state transitions and audit controls specified there.

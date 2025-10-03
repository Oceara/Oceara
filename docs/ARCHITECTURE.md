Oceara - Architecture Overview

Diagram
- The system diagram is available at `docs/architecture.png`.

Layers and Modules
- Frontend Layer (Next.js): `frontend/`
  - App Router pages and dashboards: `frontend/src/app/**`
  - APIs to backend: `frontend/src/lib/api.ts`
  - Mapbox/Three.js visualizations: `frontend/src/app/dashboard/[role]/map`, `.../globe`
  - i18n and UI framework: `frontend/src/i18n/i18n.tsx`

- Backend Services (Express + Prisma): `backend/`
  - API Gateway: `backend/src/index.ts`
  - Routes: `backend/src/routes/**` (ai, pipeline, admin, ngo, compliance)
  - Controllers: `backend/src/controllers/**`
  - Services: `backend/src/services/**` (aiService, pipelineService, exportService, chainService)
  - Auth & RBAC: `backend/src/middleware/auth.ts`
  - Audit Logging: `backend/src/middleware/audit.ts` + `AuditLog` Prisma model
  - Data Models: `backend/prisma/schema.prisma`

- Blockchain Layer (Hardhat): `contracts/`
  - Tokens: `contracts/src/tokens/CarbonCreditERC721.sol`, `...ERC1155.sol`, `...ERC20.sol`
  - Registry: `contracts/src/CarbonRegistry.sol`
  - Deployment: `contracts/scripts/deploy.ts`

Data Flows
- Uploads (Farmer): Frontend → `/api/pipeline/*` → Storage models; optional AI processing via `/api/ai/crown-detection`.
- Admin Approvals: Admin UI → `/api/admin/approve/*` → Ethers service → Registry contracts → `BlockchainLedgerEntry`.
- Exports: Admin UI → `/api/ngo/*` → Export service builds NGO bundles.
- Analytics/Reports: Admin UI → `/api/compliance/*` collecting counts and summaries.

Security & RBAC
- JWT/OAuth2 required for all protected routes, role checks via `requireRole`.

Observability
- Every request logged to `AuditLog` with metadata, actor, status, and duration.



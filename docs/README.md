Oceara Docs

- architecture.png: System architecture diagram
- decisions/: Architecture Decision Records (ADRs)
- api/: OpenAPI spec (planned)

System Architecture
- See architecture.png in this folder. If missing, export your diagram as PNG and save it here.
- Quick map to code:
  - Frontend Layer: `frontend/` (Next.js app, dashboards, maps, globe)
  - API Gateway & Services: `backend/src/index.ts`, `backend/src/routes/*`, `backend/src/controllers/*`, `backend/src/services/*`
  - Persistence: `backend/prisma/schema.prisma` with Prisma Client
  - Blockchain Layer: `contracts/` (ERC-721/1155/20, registry, deploy scripts)
  - Observability & Audit: `backend/src/middleware/audit.ts`, `AuditLog` model
  - External Integrations: `backend/src/routes/ngo.ts`, `backend/src/routes/compliance.ts`



# Shipment Exception Command Center

TypeScript control plane for shipment-exception intake, carrier-rule pressure, resolution routing, and SLA-safe escalation across logistics workflows.

## Why this exists

- Shipment teams lose time when carrier exceptions, SLA clocks, and customer-facing evidence live in separate tools.
- Exceptions often become refunds or churn because the handoff between operations, support, and carrier management breaks down.
- Logistics leaders need to know which shipment is blocked, who owns the next move, and whether the SLA is still recoverable.
- Supply-chain buyers care whether exception handling is auditable and execution-safe, not whether the dashboard uses trendy automation language.

## Why this matters (KG Embedded tie-back)

This repo demonstrates the exception-routing primitive for Supply Chain / Logistics buyers: shipment exceptions tied to carrier rules, SLA pressure, customer-impact blockers, and operator-safe escalation paths. A B2B SaaS buyer would care because fulfillment and exception data often need to surface inside customer-facing tools without exposing unsafe write paths or fragmented operational evidence. Kinetic Gain Embedded extends this into security-first in-product analytics for logistics-aware and SLA-aware reporting across fulfillment and operations workflows, see [kineticgain.com/embedded](https://kineticgain.com/embedded).

## Routes

- `/`
- `/exception-lane`
- `/carrier-rules`
- `/resolution-posture`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/exception-lane`
- `/api/carrier-rules`
- `/api/resolution-posture`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Detail view 1](./screenshots/02-exception-lane-proof.png)
![Detail view 2](./screenshots/03-carrier-rules-proof.png)
![Detail view 3](./screenshots/04-resolution-posture-proof.png)

## Local Development

```powershell
cd shipment-exception-command-center
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5462/](http://127.0.0.1:5462/)
- [http://127.0.0.1:5462/exception-lane](http://127.0.0.1:5462/exception-lane)
- [http://127.0.0.1:5462/carrier-rules](http://127.0.0.1:5462/carrier-rules)
- [http://127.0.0.1:5462/resolution-posture](http://127.0.0.1:5462/resolution-posture)
- [http://127.0.0.1:5462/verification](http://127.0.0.1:5462/verification)

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Kinetic Gain Embedded tie-back](./docs/KINETIC_GAIN_EMBEDDED.md)
- [Changelog](./CHANGELOG.md)

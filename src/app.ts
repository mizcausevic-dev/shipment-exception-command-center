import express from "express";

import {
  carrierRules,
  exceptionLane,
  payload,
  resolutionPosture,
  summary,
  verification
} from "./services/shipmentExceptionService";
import {
  renderCarrierRules,
  renderDocs,
  renderExceptionLane,
  renderOverview,
  renderResolutionPosture,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5462);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/exception-lane", (_req, res) => res.type("html").send(renderExceptionLane()));
app.get("/carrier-rules", (_req, res) => res.type("html").send(renderCarrierRules()));
app.get("/resolution-posture", (_req, res) => res.type("html").send(renderResolutionPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/exception-lane", (_req, res) => res.json(exceptionLane()));
app.get("/api/carrier-rules", (_req, res) => res.json(carrierRules()));
app.get("/api/resolution-posture", (_req, res) => res.json(resolutionPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Shipment Exception Command Center listening on http://127.0.0.1:${port}`);
  });
}

export default app;

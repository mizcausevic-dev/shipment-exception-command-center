import { describe, expect, test } from "vitest";

import {
  carrierRules,
  exceptionLane,
  laneCoverage,
  payload,
  resolutionPosture,
  summary,
  verification
} from "./services/shipmentExceptionService";

describe("shipment-exception-command-center", () => {
  test("summary exposes shipment pressure and blocked recoveries", () => {
    const stats = summary();
    expect(stats.shipmentCount).toBeGreaterThan(2);
    expect(stats.urgentExceptions).toBeGreaterThan(0);
    expect(stats.blockedRecoveries).toBeGreaterThan(0);
  });

  test("carrier rules and lane coverage stay operationally legible", () => {
    expect(carrierRules().length).toBe(4);
    expect(laneCoverage().length).toBeGreaterThan(3);
    expect(resolutionPosture().some((packet) => packet.completenessScore < 80)).toBe(true);
  });

  test("payload bundles the full logistics operator surface", () => {
    expect(exceptionLane().length).toBe(5);
    expect(verification().length).toBe(3);
    expect(payload()).toHaveProperty("shipments");
    expect(payload()).toHaveProperty("rules");
    expect(payload()).toHaveProperty("resolutions");
  });
});

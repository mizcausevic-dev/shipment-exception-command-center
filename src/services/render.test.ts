import { describe, expect, test } from "vitest";

import {
  renderCarrierRules,
  renderDocs,
  renderExceptionLane,
  renderOverview,
  renderResolutionPosture,
  renderVerification
} from "./render";
import {
  carrierRuleMap,
  resolutionPackets,
  shipmentExceptions
} from "../data/sampleShipments";

const renderers = [
  ["overview", renderOverview],
  ["exception-lane", renderExceptionLane],
  ["carrier-rules", renderCarrierRules],
  ["resolution-posture", renderResolutionPosture],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Shipment Exception Command Center");
    expect(html).toContain('href="/exception-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("overview surfaces shipment data and risk tags", () => {
    const html = renderOverview();
    expect(html).toContain(shipmentExceptions[0].shipmentId);
    expect(html).toContain(shipmentExceptions[0].carrier);
    expect(html).toContain('class="tag critical"');
  });

  test("exception lane lists every shipment with owner", () => {
    const html = renderExceptionLane();
    for (const item of shipmentExceptions) {
      expect(html).toContain(item.shipmentId);
      expect(html).toContain(item.owner);
    }
  });

  test("carrier rules show rules, owners, and all readiness tag classes", () => {
    const html = renderCarrierRules();
    for (const rule of carrierRuleMap) {
      expect(html).toContain(rule.ruleId);
      expect(html).toContain(rule.owner);
    }
    expect(html).toContain('class="tag red"');
    expect(html).toContain('class="tag green"');
    expect(html).toContain('class="tag yellow"');
  });

  test("resolution posture shows packets, completeness scores, and audiences", () => {
    const html = renderResolutionPosture();
    for (const packet of resolutionPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.completenessScore));
      expect(html).toContain(packet.audience);
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/carrier-rules");
    expect(html).toContain("/resolution-posture");
  });
});

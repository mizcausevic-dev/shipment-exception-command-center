import { carrierRuleMap, resolutionPackets, shipmentExceptions } from "../data/sampleShipments";

export function summary() {
  return {
    shipmentCount: shipmentExceptions.length,
    urgentExceptions: shipmentExceptions.filter((item) => item.deadlineHours <= 6).length,
    carrierBlockers: carrierRuleMap.filter((item) => item.readiness !== "green").length,
    blockedRecoveries: resolutionPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear customs and terminal-proof blockers first so recoverable exceptions do not spill into refunds and churn."
  };
}

export function exceptionLane() { return shipmentExceptions; }
export function carrierRules() { return carrierRuleMap; }
export function resolutionPosture() { return resolutionPackets; }

export function laneCoverage() {
  const counts = new Map<string, number>();
  for (const item of shipmentExceptions) {
    counts.set(item.lane, (counts.get(item.lane) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([lane, shipmentCount]) => ({ lane, shipmentCount }));
}

export function verification() {
  return [
    "The surface shows that shipment failure is often a routing and evidence-packaging defect, not just a carrier event.",
    "Carrier rules become operational only when owners, SLA clocks, and recovery blockers are mapped into the same lane.",
    "Resolution posture makes refund and customer-impact risk visible before an exception becomes churn or claims leakage."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    shipments: exceptionLane(),
    rules: carrierRules(),
    resolutions: resolutionPosture(),
    lanes: laneCoverage(),
    verification: verification()
  };
}

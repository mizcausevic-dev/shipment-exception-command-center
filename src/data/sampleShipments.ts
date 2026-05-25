export type ShipmentException = {
  shipmentId: string;
  carrier: string;
  lane: string;
  issueType: string;
  evidencePacket: string;
  owner: string;
  deadlineHours: number;
  status: "green" | "yellow" | "red";
  risk: "low" | "watch" | "critical";
  nextAction: string;
  excerpt: string;
};

export type CarrierRule = {
  ruleId: string;
  carrier: string;
  ruleTitle: string;
  requirementType: "documentation" | "sla" | "claims" | "customs";
  targetEvidence: string;
  owner: string;
  readiness: "green" | "yellow" | "red";
  impactArea: string;
  blocker: string;
};

export type ResolutionPacket = {
  packetId: string;
  shipmentId: string;
  carrier: string;
  audience: string;
  completenessScore: number;
  status: "green" | "yellow" | "red";
  dueInHours: number;
  blocker: string;
  decisionNote: string;
};

export const shipmentExceptions: ShipmentException[] = [
  { shipmentId: "SHIP-4108", carrier: "NorthLine Freight", lane: "Boston -> Dallas", issueType: "Missed linehaul transfer", evidencePacket: "Scan trail + terminal note + customer priority flag", owner: "Carrier Ops", deadlineHours: 6, status: "red", risk: "critical", nextAction: "Escalate terminal proof before the customer refund SLA opens.", excerpt: "Carrier exception requires a scan trail and terminal evidence before reroute credit is approved." },
  { shipmentId: "SHIP-4176", carrier: "Harbor Parcel", lane: "Chicago -> Newark", issueType: "Damaged parcel hold", evidencePacket: "Damage photos + station acknowledgement + replacement plan", owner: "Customer Support Ops", deadlineHours: 10, status: "yellow", risk: "watch", nextAction: "Route replacement plan to support and hold outbound promise until station acknowledgement lands.", excerpt: "Damage claims require photos, station acknowledgement, and customer resolution path before reimbursement." },
  { shipmentId: "SHIP-4215", carrier: "Union Air Cargo", lane: "LAX -> Toronto", issueType: "Customs document mismatch", evidencePacket: "Commercial invoice + commodity code + broker note", owner: "Trade Compliance", deadlineHours: 4, status: "red", risk: "critical", nextAction: "Correct invoice-code mismatch before customs detention converts to storage fees.", excerpt: "Cross-border hold cannot clear until the commodity code and invoice details reconcile." },
  { shipmentId: "SHIP-4280", carrier: "Peak Freight Network", lane: "Atlanta -> Denver", issueType: "Late delivery risk", evidencePacket: "Missed-stop explanation + reroute ETA + consignee notice", owner: "Dispatch Reliability", deadlineHours: 12, status: "yellow", risk: "watch", nextAction: "Bundle consignee notice with updated ETA before support confirms recovery.", excerpt: "Recovery path needs missed-stop proof and consignee-facing ETA narrative." },
  { shipmentId: "SHIP-4339", carrier: "Vertex Last Mile", lane: "Phoenix -> Tucson", issueType: "Address correction hold", evidencePacket: "Address verification + customer confirmation + reroute ticket", owner: "Last-Mile Ops", deadlineHours: 18, status: "green", risk: "low", nextAction: "Finalize reroute ticket and watch only for carrier completion.", excerpt: "Address-correction shipments can proceed once customer confirmation and reroute ticket are matched." }
];

export const carrierRuleMap: CarrierRule[] = [
  { ruleId: "CR-21", carrier: "NorthLine Freight", ruleTitle: "Terminal exception proof", requirementType: "sla", targetEvidence: "Terminal note plus scan trail with priority-service flag", owner: "Carrier Ops", readiness: "yellow", impactArea: "Refund avoidance", blocker: "The scan trail exists, but the terminal note is still missing from the packet." },
  { ruleId: "CR-28", carrier: "Union Air Cargo", ruleTitle: "Customs mismatch correction", requirementType: "customs", targetEvidence: "Corrected invoice, commodity code, and broker acknowledgement", owner: "Trade Compliance", readiness: "red", impactArea: "Storage-fee exposure", blocker: "Invoice and commodity code are still inconsistent across broker documents." },
  { ruleId: "CR-33", carrier: "Harbor Parcel", ruleTitle: "Damage claim eligibility", requirementType: "claims", targetEvidence: "Damage photos, station acknowledgement, and replacement-cost note", owner: "Customer Support Ops", readiness: "yellow", impactArea: "Claim reimbursement", blocker: "Station acknowledgement has not yet been routed into the claim packet." },
  { ruleId: "CR-41", carrier: "Peak Freight Network", ruleTitle: "Reroute SLA recovery", requirementType: "documentation", targetEvidence: "Updated ETA, consignee notice, and missed-stop explanation", owner: "Dispatch Reliability", readiness: "green", impactArea: "Customer save", blocker: "No blocker; only outbound packaging remains." }
];

export const resolutionPackets: ResolutionPacket[] = [
  { packetId: "RES-11", shipmentId: "SHIP-4108", carrier: "NorthLine Freight", audience: "VIP support desk", completenessScore: 69, status: "red", dueInHours: 6, blocker: "Terminal evidence is still incomplete.", decisionNote: "Treat as immediate refund-risk exposure until terminal proof arrives." },
  { packetId: "RES-15", shipmentId: "SHIP-4215", carrier: "Union Air Cargo", audience: "Trade compliance lead", completenessScore: 65, status: "red", dueInHours: 4, blocker: "Customs packet still contains conflicting commodity data.", decisionNote: "Escalate before detention converts into irreversible storage-fee exposure." },
  { packetId: "RES-18", shipmentId: "SHIP-4280", carrier: "Peak Freight Network", audience: "Customer operations lead", completenessScore: 84, status: "yellow", dueInHours: 8, blocker: "Consignee notice still needs one final proof bundle.", decisionNote: "Packet is recoverable if the ETA narrative lands before support outreach." }
];

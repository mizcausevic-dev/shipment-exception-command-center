import {
  carrierRules,
  exceptionLane,
  laneCoverage,
  resolutionPosture,
  summary,
  verification
} from "./shipmentExceptionService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root { --bg: #eef2f0; --paper: #fbfcfb; --ink: #182824; --muted: #60716c; --border: #d1dfda; --accent: #0f766e; --accent-2: #2563eb; --yellow: #a16207; --red: #b91c1c; --green: #166534; }
    * { box-sizing: border-box; }
    body { margin: 0; background: linear-gradient(180deg, #e7efec 0%, #f8fbfa 100%); color: var(--ink); font-family: Georgia, "Times New Roman", serif; }
    .shell { max-width: 1380px; margin: 0 auto; padding: 28px; }
    .topbar, .card, .table-wrap { background: rgba(251, 252, 251, 0.95); border: 1px solid var(--border); border-radius: 18px; box-shadow: 0 16px 40px rgba(24, 40, 36, 0.08); }
    .topbar { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .brand { display: flex; gap: 14px; align-items: center; }
    .badge { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: white; display: flex; align-items: center; justify-content: center; font: 700 16px/1 Arial, sans-serif; }
    .eyebrow { font: 600 11px/1.4 Arial, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
    .brand h1 { margin: 0; font: 700 28px/1.1 Arial, sans-serif; }
    .brand p { margin: 3px 0 0; color: var(--muted); font: 14px/1.5 Arial, sans-serif; }
    nav a { text-decoration: none; color: var(--muted); font: 600 13px/1 Arial, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; margin-left: 16px; }
    nav a.active, nav a:hover { color: var(--ink); }
    .hero { display: grid; grid-template-columns: 1.6fr 1fr; gap: 22px; margin-bottom: 22px; }
    .card { padding: 24px; }
    .hero h2 { margin: 8px 0 10px; font: 700 54px/0.98 Georgia, serif; letter-spacing: -0.03em; }
    .hero p, .section p { color: var(--muted); font: 18px/1.6 Arial, sans-serif; margin: 0 0 18px; }
    .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
    .stat { border: 1px solid var(--border); border-radius: 14px; padding: 16px; background: rgba(255,255,255,0.56); }
    .stat label { display: block; color: var(--muted); font: 700 11px/1.4 Arial, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
    .stat strong { display: block; font: 700 40px/1 Arial, sans-serif; margin-bottom: 8px; }
    .stat span { display: block; color: var(--muted); font: 13px/1.5 Arial, sans-serif; }
    .section-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 22px; margin-bottom: 22px; }
    .right-panel h3, .section h3 { margin: 0 0 12px; font: 700 20px/1.2 Arial, sans-serif; }
    .list { display: grid; gap: 12px; }
    .item { border-top: 1px solid var(--border); padding-top: 12px; }
    .item:first-child { border-top: 0; padding-top: 0; }
    .item strong { display: block; font: 700 15px/1.4 Arial, sans-serif; margin-bottom: 4px; }
    .item p, .item span { color: var(--muted); font: 13px/1.6 Arial, sans-serif; margin: 0; }
    .table-wrap { padding: 14px 18px 18px; }
    table { width: 100%; border-collapse: collapse; font: 14px/1.5 Arial, sans-serif; }
    th, td { text-align: left; padding: 14px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    th { color: var(--muted); font: 700 11px/1.4 Arial, sans-serif; letter-spacing: 0.12em; text-transform: uppercase; }
    .tag { display: inline-block; padding: 4px 8px; border-radius: 999px; font: 700 11px/1 Arial, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; background: #e5f3f1; color: var(--accent); }
    .tag.watch, .tag.yellow { background: #fdf1db; color: var(--yellow); }
    .tag.critical, .tag.red { background: #fee5e5; color: var(--red); }
    .tag.green { background: #e7f7ec; color: var(--green); }
    .footer-note { margin-top: 12px; color: var(--muted); font: 13px/1.6 Arial, sans-serif; }
    .card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    @media (max-width: 980px) { .hero, .section-grid, .card-grid { grid-template-columns: 1fr; } .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } nav { display: none; } }
  </style>
</head>
<body><div class="shell">${body}</div></body></html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/exception-lane", label: "Exception Lane" },
    { href: "/carrier-rules", label: "Carrier Rules" },
    { href: "/resolution-posture", label: "Resolution Posture" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];
  return `<div class="topbar"><div class="brand"><div class="badge">KG</div><div><div class="eyebrow">Shipment Exception Command Center</div><h1>Logistics exception and recovery control plane</h1><p>Shipment exceptions, carrier rules, SLA pressure, and recovery-safe escalation in one operator surface.</p></div></div><nav>${links.map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</nav></div>`;
}

function riskClass(value: string) { return value.toLowerCase(); }
function readinessClass(value: string) { if (value === "green") return "green"; if (value === "yellow") return "yellow"; return "red"; }

export function renderOverview() {
  const stats = summary();
  const shipments = exceptionLane();
  const lanes = laneCoverage();
  const rules = carrierRules();
  return layout("Shipment Exception Command Center", `${topbar("/")}
  <div class="hero"><div class="card"><div class="eyebrow">Supply Chain / Logistics</div><h2>Exceptions only stay recoverable when evidence, carrier rules, and SLA clocks move together.</h2><p>This control plane makes shipment pressure, carrier requirements, recovery blockers, and customer-impact risk visible before an exception becomes a refund, claim, or churn event.</p><div class="stat-grid"><div class="stat"><label>Shipments</label><strong>${stats.shipmentCount}</strong><span>Active shipment exceptions modeled through recovery pressure.</span></div><div class="stat"><label>Urgent Exceptions</label><strong>${stats.urgentExceptions}</strong><span>Shipments inside the highest SLA-risk window.</span></div><div class="stat"><label>Carrier Blockers</label><strong>${stats.carrierBlockers}</strong><span>Carrier-rule mappings that still have blockers.</span></div><div class="stat"><label>Blocked Recoveries</label><strong>${stats.blockedRecoveries}</strong><span>Resolution packets that still have incomplete recovery posture.</span></div></div></div><div class="card right-panel"><div class="eyebrow">Operating Recommendation</div><h3>${stats.recommendation}</h3><div class="list">${shipments.slice(0,3).map((item)=>`<div class="item"><strong>${item.carrier} · ${item.shipmentId}</strong><p>${item.lane}</p><span>${item.deadlineHours} hours left · ${item.nextAction}</span></div>`).join("")}</div></div></div>
  <div class="section-grid"><div class="table-wrap section"><div class="eyebrow">Exception Queue</div><h3>Which recoveries are most likely to slip next.</h3><table><thead><tr><th>Shipment</th><th>Packet</th><th>Owner</th><th>Hours Left</th><th>Risk</th></tr></thead><tbody>${shipments.map((item)=>`<tr><td><strong>${item.carrier}</strong><br />${item.shipmentId}<br />${item.lane}</td><td>${item.evidencePacket}</td><td>${item.owner}</td><td>${item.deadlineHours}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Lane Coverage</div><h3>Where recovery pressure is concentrated.</h3><div class="list">${lanes.map((item)=>`<div class="item"><strong>${item.lane}</strong><span>${item.shipmentCount} modeled shipment${item.shipmentCount === 1 ? "" : "s"} in this lane.</span></div>`).join("")}</div></div></div>
  <div class="card section"><div class="eyebrow">Carrier Rules</div><h3>Recovery clarity comes from mapping the carrier rule to the evidence owner, not from logging the exception alone.</h3><div class="card-grid">${rules.map((item)=>`<div class="stat"><label>${item.requirementType}</label><strong style="font-size: 24px;">${item.impactArea}</strong><span>${item.ruleTitle} → ${item.targetEvidence}</span><div class="footer-note"><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span> · ${item.owner} · ${item.blocker}</div></div>`).join("")}</div><div class="footer-note">The buyer value is not exception visibility in the abstract. It is knowing which shipment is recoverable, which proof is missing, and where SLA and customer-impact risk are building.</div></div>`);
}

export function renderExceptionLane() {
  return layout("Shipment Exception Command Center — Exception Lane", `${topbar("/exception-lane")}<div class="card section"><div class="eyebrow">Exception Lane</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">An exception queue should show recovery pressure and ownership, not just a late scan.</h2><p>Each row ties shipment context to the evidence packet, SLA window, and next action needed to keep the recovery path intact.</p></div><div class="table-wrap section" style="margin-top: 22px;"><table><thead><tr><th>Shipment</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead><tbody>${exceptionLane().map((item)=>`<tr><td><strong>${item.carrier}</strong><br />${item.shipmentId}<br />${item.lane}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div>`);
}

export function renderCarrierRules() {
  return layout("Shipment Exception Command Center — Carrier Rules", `${topbar("/carrier-rules")}<div class="card section"><div class="eyebrow">Carrier Rules</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The rule map is where exceptions turn into executable recovery work.</h2><p>This lane maps carrier requirements to evidence targets, owner lanes, readiness, and blockers that still prevent safe resolution routing.</p></div><div class="section-grid" style="margin-top: 22px;"><div class="table-wrap section"><table><thead><tr><th>Carrier Rule</th><th>Target Evidence</th><th>Owner</th><th>Readiness</th></tr></thead><tbody>${carrierRules().map((item)=>`<tr><td><strong>${item.ruleTitle}</strong><br />${item.carrier}<br />${item.impactArea}</td><td>${item.targetEvidence}</td><td>${item.owner}</td><td><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Dependency Blockers</div><h3>Where shipment recovery is likely to stall.</h3><div class="list">${carrierRules().map((item)=>`<div class="item"><strong>${item.ruleId} · ${item.owner}</strong><p>${item.blocker}</p><span>${item.requirementType} · ${item.impactArea}</span></div>`).join("")}</div></div></div>`);
}

export function renderResolutionPosture() {
  return layout("Shipment Exception Command Center — Resolution Posture", `${topbar("/resolution-posture")}<div class="card section"><div class="eyebrow">Resolution Posture</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Recovery risk becomes visible when packet completeness and audience timing are mapped together.</h2><p>This lane surfaces which resolution packets are ready, which still have blockers, and whether the issue is carrier proof, customs mismatch, or customer-save timing.</p></div><div class="card-grid" style="margin-top: 22px;">${resolutionPosture().map((packet)=>`<div class="card section"><div class="eyebrow">${packet.packetId}</div><h3>${packet.carrier}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Completeness</label><strong style="font-size: 30px;">${packet.completenessScore}%</strong><span>${packet.audience}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${readinessClass(packet.status)}">${packet.status}</span></strong><span>${packet.blocker}</span></div></div><div class="footer-note">${packet.dueInHours} hours to deadline · ${packet.decisionNote}</div></div>`).join("")}</div>`);
}

export function renderVerification() {
  return layout("Shipment Exception Command Center — Verification", `${topbar("/verification")}<div class="card section"><div class="eyebrow">Verification</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about logistics exception and recovery systems.</h2><div class="list">${verification().map((item)=>`<div class="item"><strong>${item}</strong></div>`).join("")}</div></div>`);
}

export function renderDocs() {
  return layout("Shipment Exception Command Center — Docs", `${topbar("/docs")}<div class="card section"><div class="eyebrow">Docs</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A control plane for shipment exceptions, carrier rules, and SLA-safe recovery.</h2><p>This repo models the operating layer between exception intake and recovery execution: shipment visibility, carrier-rule mapping, evidence routing, SLA blockers, and operator-safe handoffs.</p><div class="footer-note">Routes: <code>/</code> · <code>/exception-lane</code> · <code>/carrier-rules</code> · <code>/resolution-posture</code> · <code>/verification</code> · <code>/docs</code></div></div>`);
}

# Architecture

## Overview

`shipment-exception-command-center` is a lightweight TypeScript + Express control surface for modeling the operating layer between shipment exceptions, carrier rules, SLA pressure, and recovery-safe escalation.

## Surfaces

- `overview`
  - shipment count
  - urgent exceptions
  - carrier blockers
  - blocked recoveries
- `exception-lane`
  - shipment-by-shipment owner routing
  - evidence packets
  - SLA timing
  - next action
- `carrier-rules`
  - carrier requirement mapping
  - evidence targets
  - readiness and blockers
- `resolution-posture`
  - packet completeness
  - customer-impact timing
  - audience-specific blockers
- `verification`
  - what the repo proves about logistics exception systems

## Data Model

- `ShipmentException`
  - shipment, carrier, lane, issue type, evidence packet, owner, deadline, risk, next action
- `CarrierRule`
  - carrier rule, evidence target, requirement type, owner, readiness, blocker
- `ResolutionPacket`
  - audience, completeness score, SLA window, blocker, decision note

## Design Principle

Exception state should be inspectable by logistics, support, revenue, and executive stakeholders. The system should explain:
- which shipment is under pressure right now
- what carrier rule or evidence requirement is missing
- who owns the next move
- where SLA or customer-impact risk is building

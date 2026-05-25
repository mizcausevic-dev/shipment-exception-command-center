import { payload, summary } from "../src/services/shipmentExceptionService";

console.log("shipment-exception-command-center demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().rules, null, 2));

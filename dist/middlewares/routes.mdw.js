"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_route_1 = __importDefault(require("../routes/blockchain/blockchain.route"));
const wallet_route_1 = __importDefault(require("../routes/wallet/wallet.route"));
function default_1(app) {
    app.use("/blockchain", blockchain_route_1.default);
    app.use("/wallet", wallet_route_1.default);
}
exports.default = default_1;
//# sourceMappingURL=routes.mdw.js.map
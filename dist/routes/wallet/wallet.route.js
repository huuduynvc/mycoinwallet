"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const KeyGenerator_1 = __importDefault(require("../../models/KeyGenerator"));
const router = express_1.default.Router();
router.post("/", (req, res) => {
    const newWalelt = new KeyGenerator_1.default();
    res.send(newWalelt);
});
router.post("/getwallet", (req, res) => {
    var _a;
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.key) {
        const key = req.body.key;
        let balance = 0;
        const value = KeyGenerator_1.default.wallet.map((ele) => {
            if (ele.publicKey === key.publicKey) {
                balance = ele.getBalance();
                return true;
            }
            return false;
        });
        if (value.includes(true)) {
            res.send({ balance });
        }
        else
            res.sendStatus(404);
    }
});
exports.default = router;
//# sourceMappingURL=wallet.route.js.map
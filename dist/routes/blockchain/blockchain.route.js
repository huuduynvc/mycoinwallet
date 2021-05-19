"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    // const myKey = EC.keyFromPrivate(
    //   //"7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf"
    //   //"4ef93a86dd76121046a3c0d21d0b4c9b216010aa68b0b4d28d12a45915a71ec0"
    // );
    // const myWalletAdress = myKey.getPublic("hex");
    // const myBlockChain = BlockChain.instance;
    // const tx1 = new Transaction(myWalletAdress, "some one here", 10);
    // tx1.signTransactions(myKey);
    // myBlockChain.addTransaction(tx1);
    // myBlockChain.minePendingTransactions(myWalletAdress);
    // console.log("is valid? ", myBlockChain.isValidChain());
    // console.log("my wallets", myBlockChain.getBalanceOfAddress(myWalletAdress));
    // myBlockChain.chain[1].transaction[0].amount = 4;
    // console.log("is valid? ", myBlockChain.isValidChain());
    res.send("<h1>ROUTE USER</h1>");
});
exports.default = router;
//# sourceMappingURL=blockchain.route.js.map
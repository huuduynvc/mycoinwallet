import express from "express";
import BlockChain from "./../../models/BlockChain/index";
import { EC } from "./../../models/KeyGenerator/index";
import Transaction from "./../../models/Transaction/index";

const router = express.Router();

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

export default router;

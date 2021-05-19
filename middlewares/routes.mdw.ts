import blockChainRoute from "../routes/blockchain/blockchain.route";
import walletRoute from "../routes/wallet/wallet.route";

export default function (app) {
  app.use("/blockchain", blockChainRoute);
  app.use("/wallet", walletRoute);
}

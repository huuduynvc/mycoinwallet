import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routesMdw from "./middlewares/routes.mdw";
import { Server } from "socket.io";
import TYPE from "./constant";
import BlockChain from "./models/BlockChain/index";
import Transaction from "./models/Transaction";
import MyWallet, { EC } from "./models/KeyGenerator";
import Block from "./models/Block/index";

// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/*  -Configurations & server-  */
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const adminWallet = new MyWallet();

const myBlockChain = BlockChain.instance;

const tx1 = new Transaction(null, adminWallet.publicKey, 10);

myBlockChain.addTransaction(tx1);

// myBlockChain.minePendingTransactions(adminWallet.publicKey);

// console.log(
//   "my wallets",
//   myBlockChain.getBalanceOfAddress(adminWallet.publicKey)
// );

let connectCounter = 0;
const minerBlock = [];

io.on("connection", (socket) => {
  socket.on(TYPE.LOGIN, () => {
    io.to(`${socket.id}`).emit(TYPE.LAST_BLOCK, {
      block: BlockChain.instance.chain[BlockChain.instance.chain.length - 1],
      difficulty: BlockChain.instance.difficulty,
      pendingTransactions: BlockChain.instance.pendingTransactions,
    });
  });

  socket.on(TYPE.MINING_DONE_A_BLOCK, ({ block, minerAddress }) => {
    try {
      const newBlock = new Block(
        block.index,
        block.timestamp,
        block.transaction,
        block.previousHash,
        block.hash,
        block.nonce,
        minerAddress
      );
      if (connectCounter === 1) {
        
        const validAdd = BlockChain.instance.addBlock(newBlock);
        if (validAdd) {
          const transaction = new Transaction(
            null,
            minerAddress,
            BlockChain.instance.miningReward
          );
          BlockChain.instance.addTransaction(transaction);
          io.emit(TYPE.LAST_BLOCK, {
            block,
            difficulty: BlockChain.instance.difficulty,
            pendingTransactions: BlockChain.instance.pendingTransactions,
          });
          io.emit(TYPE.HISTORY_BLOCKCHAIN, BlockChain.instance);
        }
      } else {
        minerBlock.push({ block: newBlock, minerAddress, vote: 0 });
        socket.broadcast.emit(TYPE.MINING_ABLOCK, block);
      }
    } catch (error) {}
  });

  // Listen client get the blockchain
  socket.on(TYPE.GET_BLOCKCHAIN, (callback) => {
    callback(BlockChain.instance);
  });

  socket.on(TYPE.GET_BALANCE, ({ key }, callback) => {
    let balance = 0;
    const value = MyWallet.wallet.map((ele) => {
      if (ele.publicKey === key.publicKey) {
        balance = ele.getBalance();
        return true;
      }
      return false;
    });
    if (value.includes(true)) {
      callback({ balance });
    } else {
      callback({ balance: -1 });
    }
  });

  socket.on(TYPE.START_MINING, (callback) => {
    connectCounter++;
    callback(BlockChain.instance.pendingTransactions);
  });

  socket.on(TYPE.STOP_MINING, () => {
    connectCounter--;
  });

  socket.on(TYPE.VOTE_NEW_BLOCK, ({ block, vote }) => {
    const result = minerBlock.findIndex((ele) => {
      return (
        ele.block.index === block.index &&
        ele.block.previousHash === block.previousHash &&
        ele.block.timestamp === block.timestamp &&
        ele.block.hash === block.hash
      );
    });
    if (result >= 0 && vote) {
      minerBlock[result].vote++;
      if (
        connectCounter === 1 ||
        minerBlock[result].vote >= connectCounter / 2
      ) {
        const validAdd = BlockChain.instance.addBlock(minerBlock[result].block);
        if (validAdd) {
          const transaction = new Transaction(
            null,
            minerBlock[result].minerAddress,
            BlockChain.instance.miningReward
          );
          minerBlock.splice(result, 1);
          BlockChain.instance.addTransaction(transaction);
          io.emit(TYPE.LAST_BLOCK, {
            block,
            difficulty: BlockChain.instance.difficulty,
            pendingTransactions: BlockChain.instance.pendingTransactions,
          });
          io.emit(TYPE.HISTORY_BLOCKCHAIN, BlockChain.instance);
        }
      }
    }
  });

  socket.on(TYPE.SEND_TRANSACTION, (params, callback) => {
    if (
      !params.publicKey ||
      MyWallet.getBalance(params.publicKey) < params.amount
    ) {
      return callback("Invalid The Transaction");
    }
    try {
      const transaction = new Transaction(
        params.publicKey,
        params.payeePublicKey,
        params.amount
      );
      const yourKey = EC.keyFromPrivate(params.privateKey);
      transaction.signTransactions(yourKey);
      BlockChain.instance.addTransaction(transaction);
      io.emit(TYPE.NEW_TRANSACTION, transaction);
    } catch (error) {
      return callback("Invalid The Transaction");
    }
  });
});

app.get("/", (req, res) => res.send(JSON.stringify("Typescript")));

routesMdw(app);

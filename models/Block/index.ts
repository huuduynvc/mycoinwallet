/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CryptoJS from "crypto-js";
import { throws } from "assert";
import Transaction from "./../Transaction";

class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  hash: string;
  nonce: number;
  transaction: Transaction[];
  miner: string;
  constructor(
    index: number,
    timestamp: number,
    transaction: Transaction[],
    previousHash = "",
    hash = "",
    nonce = 0,
    miner = ""
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.transaction = transaction;
    this.nonce = nonce;
    this.miner = miner;
    if (hash === "") this.hash = this.calculateHash();
    else this.hash = hash;
  }

  calculateHash = () => {
    return CryptoJS.SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transaction) +
        this.nonce
    ).toString();
  };

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransactions() {
    for (const tx of this.transaction) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }

  static calculateHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    transaction: Transaction[],
    nonce: number
  ) => {
    return CryptoJS.SHA256(
      index + previousHash + timestamp + JSON.stringify(transaction) + nonce
    ).toString();
  };
}

export default Block;

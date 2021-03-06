export const API = {
    CREATE_WALLET:"/wallet",
    GET_WALLET: "/wallet/getwallet"
};

export const EMIT_TYPE = {
    SEND_TRANSACTION: "SEND_TRANSACTION",
    NEW_TRANSACTION: "NEW_TRANSACTION",
    START_MINING: "START_MINING",
    STOP_MINING: "STOP_MINING",
    MINING_ABLOCK: "MINING_ABLOCK",
    LAST_BLOCK: "LAST_BLOCK",
    LOGIN: "LOGIN",
    MINING_DONE_A_BLOCK: "MINING_DONE_A_BLOCK",
    VOTE_NEW_BLOCK: "VOTE_NEW_BLOCK",
    GET_BALANCE: "GET_BALANCE",
    HISTORY_BLOCKCHAIN: "HISTORY_BLOCKCHAIN",
    GET_BLOCKCHAIN: "GET_BLOCKCHAIN",
}
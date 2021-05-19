export default {
  PRIMARYKEY: "hahahaaaa",
};

export const BASE_URL_CLIENT = "https://dack-d233d.web.app";

const EventSocket = {
  CONNECTION: "connection",
  JOIN: "join",
  ROOM_DATA: "roomData",
  SEND_MESS: "sendMess",
  MESSAGE: "message",
  ON_BOARD: "onboard",
  USER_JOIN: "userjoin",
  GET_INFO_BOARD: "getInfBoard",
  ON_PLAY: "onplay",
  TOAST_WINNER: "toastwinner",
  ON_HOME: "onhome",
  JOIN_PLAY_AS: "joinplayas",
  LEAVE_ROOM: "leaveroom",
  DISCONNECTING: "disconnecting",
  DISCONNECT: "disconnect",
  ALLROOMS: "allrooms",
  JOIN_BOARD: "joinboard",
  QUICK_JOIN: "quickJoin",
  READY: "ready",
  START: "start",
  WAITINGROOM: "waitingroom",
  INVITE: "invite",
  SHOW_INVITE: "showInvite",
  UPDATE_TIME: "updateTime",
  ACCEPT_INVITE: "acceptInvite",
  QUICK_JOIN_FOUND: "quickJoinFound",
  QUICK_JOIN_CANCEL: "quickJoinCancel",
  BAN_USER: "ban-user",
};

export { EventSocket };

import io from "socket.io-client";
import { BASE_URL } from "./enviroment/enviroments";

const socket = io(BASE_URL);
//const socket = io();
export default socket;
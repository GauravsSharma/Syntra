// lib/widgetSocket.js
import { io } from "socket.io-client";

export const widgetSocket = io(process.env.NEXT_PUBLIC_API_URL, {
  autoConnect: false,
  withCredentials: true,
});
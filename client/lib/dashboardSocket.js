// lib/dashboardSocket.js
import { io } from "socket.io-client";

export const dashboardSocket = io(process.env.NEXT_PUBLIC_API_URL, {
  autoConnect: false,
  withCredentials: true,
});
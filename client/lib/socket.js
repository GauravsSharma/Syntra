import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  autoConnect: false,
  withCredentials: true
})

export default socket
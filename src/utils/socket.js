import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace 'http://localhost:3000' with your backend server URL

export default socket;

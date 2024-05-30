import { io } from 'socket.io-client';
import config from './config';


const BackendURL = config.NODE_ENV === "production" ? config.SocketBackendURL : "http://localhost:5000"
console.log("BackendURL", BackendURL);
const socket = io(BackendURL); // Replace 'http://localhost:3000' with your backend server URL


export default socket;

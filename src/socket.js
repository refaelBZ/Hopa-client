import { io } from 'socket.io-client';

//  const URL =  'http://localhost:3000';
// const URL =  "http://10.0.1.47:3000";
 const URL =  "https://hopa-server.onrender.com";


export const socket = io(URL);
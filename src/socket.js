import { io } from 'socket.io-client';

 const URL =  'http://localhost:3000';
//  const URL =  "http://10.0.1.47:3000";


export const socket = io(URL);
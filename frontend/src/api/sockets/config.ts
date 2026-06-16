import { io } from 'socket.io-client'; 

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? undefined : 'http://localhost:4000';

export const socket = io(URL, {
    autoConnect: false,
    auth: (cb) =>{
        cb({token: localStorage.getItem('token')})
    }
});
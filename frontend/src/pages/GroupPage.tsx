import {useEffect, useState} from "react";
import {socket} from "../api/sockets/config.ts";

export default function GroupPage(){
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        /*function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }*/

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        // socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            // socket.off('foo', onFooEvent);
        };
    }, []);

    const handleClick = () => socket.emit("message", {hola: "hola"})

    return (
        <div >
            <button type="button" onClick={handleClick}>akjshd</button>
        </div>
    );
}


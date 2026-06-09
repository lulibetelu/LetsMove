import {useEffect, useState} from "react";
import {socket} from "../../../api/sockets/config.ts";
import {useMessages} from "../../../hooks/groups/useMessages.ts";

interface Props {
    groupId: number
}

export default function GroupChat({groupId}: Props){
    const [isConnected, setIsConnected] = useState(socket.connected);
    const {data, isError, isPending} = useMessages(groupId);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }


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


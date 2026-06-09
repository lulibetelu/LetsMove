import {socket} from "../../api/sockets/config.ts";
import {useEffect} from "react";

export function useSocketEvent<T>(event: string, handler: (value: T) => void) {
    useEffect(() => {
        socket.on(event, handler);
        return () => { socket.off(event, handler); };
    }, [event, handler]);
}
// hooks/useUsername.ts
import { useState, useEffect } from 'react';
import { getUsernameFromId } from '../api/user'; // tu función existente

export function UseUsername(id?: number) {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsernameFromId(id)
            .then(setUsername)
            .catch(() => setUsername(null))
            .finally(() => setLoading(false));
    }, [id]);

    return { username, loading };
}
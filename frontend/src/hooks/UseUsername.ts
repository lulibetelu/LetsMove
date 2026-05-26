import { useState, useEffect } from 'react';
import { getUsernameFromId } from '../api/user.ts';

export function useUsername(id?: number) {
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
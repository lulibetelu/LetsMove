import { useQuery } from "@tanstack/react-query";
import { findOneGroup } from "../../api/group.ts";

export default function useGroup(groupId: number | null) {
    return useQuery({
        queryKey: ['group', groupId],
        queryFn: () => findOneGroup(groupId!),
        // la query solo corre cuando currentUserId tiene un valor válido, si es null, undefined o 0, no ejecuta nada
        enabled: !!groupId,
    });
}

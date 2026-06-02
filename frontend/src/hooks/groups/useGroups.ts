import { useQuery } from "@tanstack/react-query";
import { findUserGroups } from "../../api/group.ts";
import { getCurrentUserId } from "../../api/user.ts";

export function useGroups() {
    const userId = getCurrentUserId();
    return useQuery({
        queryKey: ['groups', userId],
        queryFn: findUserGroups,
        enabled: !!userId,
    });
}

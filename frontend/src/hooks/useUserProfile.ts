import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/user.ts";
import type { UserProfile } from "../types/userTypes.ts";

export function useUserProfile(id: number) {
    return useQuery<UserProfile | null>({
        queryKey: ['userProfile', id],
        queryFn: () => getUserProfile(id),
        enabled: !isNaN(id),
    });
}

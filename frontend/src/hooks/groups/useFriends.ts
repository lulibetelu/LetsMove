import { useQuery } from "@tanstack/react-query";
import { findAllFriends } from "../../api/friend.ts";
import { getCurrentUserId, getUsernameFromId } from "../../api/user.ts";

export interface FriendInfo {
    id: number;
    username: string;
}

export function useFriends() {
    const currentUserId = getCurrentUserId();
    return useQuery({
        queryKey: ['friends', currentUserId],
        queryFn: async () => {
            const friendships: { sender: number; receiver: number; state: string }[] =
                await findAllFriends();
            const accepted = friendships.filter((f) => f.state === 'Accepted');
            const friendIds = accepted.map((f) =>
                f.sender === currentUserId ? f.receiver : f.sender,
            );
            const friends: FriendInfo[] = await Promise.all(
                friendIds.map(async (id: number) => {
                    const username = await getUsernameFromId(id);
                    return { id, username: username ?? `User #${id}` };
                }),
            );
            return friends;
        },
        enabled: !!currentUserId,
    });
}

import type {Group, Member} from "../types/groupTypes.ts";
import {findOneGroup} from "../api/group.ts";

export async function isUserInGroup(userId: number, groupId: number): Promise<boolean>{
    const group: Group = await findOneGroup(groupId)
    const filteredGroup: Member[] = group.groupMembers.filter(member => member.memberId === userId);

    return filteredGroup.length > 0
}
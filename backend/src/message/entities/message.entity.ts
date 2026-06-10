export interface ImageInput {
  content?: string;
  url?: string;
  description?: string;
}

export interface Message {
  id: number;
  groupId: number;
  content: string;
  groupMemberId: number;
  date: Date;
  images?: ImageInput;
  groupMember: {
    id: number;
    userId: number;
    groupId: number;
    isAdmin: boolean;
    user: {
      username: string;
    };
  };
}

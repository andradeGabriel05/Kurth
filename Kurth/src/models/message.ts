import { UserDTO } from "./user";

export type PostDTO = {
    id: number;
    message: string;
    postedAt: string;
    likeCount?: number;
    image?: string;
    user: UserDTO;
    parent: PostDTO;
    reply?: {
        id: number;
        message: string;
        replyUser: {
            name: string;
            username: string;
            avatar: string;
        }
    }
    repostOfId?: number;
}
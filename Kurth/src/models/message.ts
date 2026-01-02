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
        replyId: number;
        message: string;
        replyUser: {
            name: string;
            username: string;
            avatar: string;
        }
    }
    repost?: {
        repostId: number;
        message: string;
        repostUser: {
            name: string;
            username: string;
            avatar: string;
        }
    }
}
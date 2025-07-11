import { PostDTO } from "./message";
import { UserDTO } from "./user";

export type ReplyDTO = {
    id: number;
    message: string;
    postedAt: string;
    message_id: PostDTO;
    likeCount?: number;
    image?: string;
    user: UserDTO,
}
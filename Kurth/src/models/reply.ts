import { MessageDTO } from "./message";
import { UserDTO } from "./user";

export type ReplyDTO = {
    id: number;
    message: string;
    postedAt: string;
    message_id: MessageDTO;
    likeCount?: number;
    image?: string;
    user: UserDTO,
}
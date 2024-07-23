import { MessageDTO } from "./message";
import { UserDTO } from "./user";

export type ReplyDTO = {
    id: number;
    text: string;
    message_id: MessageDTO;
    user: UserDTO,
}
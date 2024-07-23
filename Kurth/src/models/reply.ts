import { MessageDTO } from "./message";
import { UserDTO } from "./user";

export type ReplyDTO = {
    text: string;
    message_id: MessageDTO;
    user: UserDTO,
}
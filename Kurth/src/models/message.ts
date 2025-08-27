import { UserDTO } from "./user";

export type MessageDTO = {
    id: string;
    message: string;
    sentByUser: UserDTO;
    sentToUser: UserDTO;
}
import { UserDTO } from "./user";

export type MessageDTO = {
    id: number;
    message: string;
    postedAt: string;
    image?: string;
    user: UserDTO;

}
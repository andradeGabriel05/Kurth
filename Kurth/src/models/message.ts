import { UserDTO } from "./user";

export type MessageDTO = {
    message: string;
    postedAt: string;
    image: string;
    user: UserDTO;

}
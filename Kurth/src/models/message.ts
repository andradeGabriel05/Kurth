import { UserDTO } from "./user";

export type MessageDTO = {
    id: number;
    message: string;
    posted_at: string;
    image: string;
    user: UserDTO;

}
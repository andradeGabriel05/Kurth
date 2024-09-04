import { UserDTO } from "./user";

export type MessageDTO = {
    id: number;
    message: string;
    postedAt: string;
    likeCount?: number;
    image?: string;
    user: UserDTO;

}
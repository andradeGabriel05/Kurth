import { UserDTO } from "./user";

export type MessageDTO = {
    id: number;
    author: string;
    avatar: string;
    username: string;
    content: string;
    createdAt: string;
    user: UserDTO[];
}
import { UserDTO } from "./user";

export type PostDTO = {
    id: number;
    message: string;
    postedAt: string;
    likeCount?: number;
    image?: string;
    user: UserDTO;
    parent: PostDTO;
    reply?: boolean;
}
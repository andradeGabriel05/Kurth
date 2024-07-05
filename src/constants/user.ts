import { UserDTO } from "../models/user";


export function findAll(): UserDTO[] {
  return user;
}

export function findByUsername(username: string): UserDTO | undefined {
  return user.find((x) => x.username === username);
}

export const user: UserDTO[] = [
  {
    id: 1,
    name: "John",
    username: "@thispersondoesnotexist",
    avatar: "https://thispersondoesnotexist.com/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    followers: 123,
    following: 456,
    posts: 789,
  },
  {
    id: 2,
    name: "Jane",
    username: "@janedoe",
    avatar: "https://thispersondoesnotexist.com/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    followers: 234,
    following: 567,
    posts: 890,
  },
  {
    id: 3,
    name: "Alice",
    username: "@aliceinwonderland",
    avatar: "https://thispersondoesnotexist.com/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    followers: 345,
    following: 678,
    posts: 901,
  },
];

import { MessageDTO } from "../models/message";

export function findAll(): MessageDTO[] {
  return message;
}


const message: MessageDTO[] = [
  {
    id: 1,
    author: "John",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@thispersondoesnotexist",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus placeat alias repellat quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!",
    createdAt: "22/12/2021",
    id_user: 1,
  },
  {
    id: 2,
    author: "Jane",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@janedoe",
    content:
      "Lorem ipsum dolor sit amet quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!",
    createdAt: "21/12/2022",
    id_user: 2,
  },
  {
    id: 3,
    author: "Jane",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@janedoe",
    content:
      "Sed  unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    createdAt: "01/01/2023",
    id_user: 2,
  },
  {
    id: 4,
    author: "Alice",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@aliceinwonderland",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.",
    createdAt: "02/02/2023",
    id_user: 1,
  },
  {
    id: 5,
    author: "Alice",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@aliceinwonderland",
    content:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    createdAt: "03/03/2023",
    id_user: 1,
  }

];

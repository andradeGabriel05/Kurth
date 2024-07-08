import { MessageDTO } from "../models/message";

export function findAll(): MessageDTO[] {
  return message;
}

export function findById(id: number): MessageDTO | undefined {
  return message.find((message) => message.id === id);
}


const message: MessageDTO[] = [
  {
    id: 1,
    author: "John",
    avatar: "https://thispersondoesnotexist.com/",
    username: "@thispersondoesnotexist",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus placeat alias repellat quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!",
    image: "https://www.gov.br/mma/pt-br/lula-e-macron-anunciam-investimentos-de-r-5-4-bi-em-bioeconomia-na-amazonia/lula-macron.jpeg",
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
    image: "https://s2-oglobo.glbimg.com/D8uAPz0F2zLxbPWEu_QcGbQdH2c=/0x450:1188x1281/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/F/k/V7S5DLT5iviyfbpYejYw/lula.jfif",
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
    image: "",
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
    image: "",
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
    image: "",
    createdAt: "03/03/2023",
    id_user: 1,
  }

];

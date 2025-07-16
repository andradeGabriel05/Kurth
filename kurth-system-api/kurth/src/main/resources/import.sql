INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('John', 'thispersondoesnotexist', 'john@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'https://thispersondoesnotexist.com/', 123, 456, 789);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Jane', 'janedoe', 'jane@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'https://thispersondoesnotexist.com/', 234, 567, 890);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Alice', 'aliceinwonderland', 'alice@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 345, 678, 901);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Bob', 'bobsmith', 'bob@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 456, 789, 123);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Emily', 'emilyjones', 'emily@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 567, 890, 234);

INSERT INTO tb_post (message, posted_at, image, like_count, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus placeat alias repellat quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!', TIMESTAMP WITH TIME ZONE '2021-12-22T15:00:00Z', 'https://www.gov.br/mma/pt-br/lula-e-macron-anunciam-investimentos-de-r-5-4-bi-em-bioeconomia-na-amazonia/lula-macron.jpeg', 0, 1);

INSERT INTO tb_post (message, posted_at, image, like_count, user_id) VALUES ('Lorem ipsum dolor sit amet quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!', TIMESTAMP WITH TIME ZONE '2022-12-21T15:00:00Z','https://s2-oglobo.glbimg.com/D8uAPz0F2zLxbPWEu_QcGbQdH2c=/0x450:1188x1281/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/F/k/V7S5DLT5iviyfbpYejYw/lula.jfif',0, 2);

INSERT INTO tb_post (message, posted_at, like_count, user_id) VALUES ('Sed unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', TIMESTAMP WITH TIME ZONE '2023-01-01T15:00:00Z',0, 2);

INSERT INTO tb_post (message, posted_at, like_count, user_id) VALUES ('Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.', TIMESTAMP WITH TIME ZONE '2023-02-02T15:00:00Z', 0, 3);

INSERT INTO tb_post (message, posted_at, like_count, user_id) VALUES ('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.', TIMESTAMP WITH TIME ZONE '2023-03-03T15:00:00Z', 0, 3);

INSERT INTO tb_post (message, posted_at, image, like_count, user_id) VALUES ('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Sed quia non numquam eius modi tempora incidunt. Sed quia non numquam eius modi tempora incidunt.', TIMESTAMP WITH TIME ZONE '2024-03-03T15:00:00Z', 'https://img.lagaceta.com.ar/fotos/notas/2024/03/27/600x400_lula-macron-celebran-lazos-estrategicos-1028985-233606.webp',0, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Concordo completamente com o que foi dito!', TIMESTAMP WITH TIME ZONE '2024-07-26T10:00:00Z', 1, 1, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Muito interessante, obrigado por compartilhar!', TIMESTAMP WITH TIME ZONE '2024-07-26T11:00:00Z', 1, 1, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Essa é uma ótima notícia!', TIMESTAMP WITH TIME ZONE '2024-07-26T12:00:00Z', 0, 3, 3);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Acho que isso vai trazer grandes mudanças.', TIMESTAMP WITH TIME ZONE '2024-07-26T13:00:00Z', 0, 1, 2);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Pode ser um ponto de partida para novas discussões.', TIMESTAMP WITH TIME ZONE '2024-07-26T14:00:00Z', 0, 1, 3);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Concordo! É sempre bom ver ações concretas.', TIMESTAMP WITH TIME ZONE '2024-07-26T15:00:00Z', 0, 2, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('O conteúdo é relevante, obrigado pela atualização.', TIMESTAMP WITH TIME ZONE '2024-07-26T16:00:00Z', 0, 2, 3);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Esses eventos são fundamentais para o futuro.', TIMESTAMP WITH TIME ZONE '2024-07-26T17:00:00Z', 0, 3, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Realmente, as implicações são grandes.', TIMESTAMP WITH TIME ZONE '2024-07-26T18:00:00Z', 0, 3, 2);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Muito bem colocado, é essencial discutir esses pontos.', TIMESTAMP WITH TIME ZONE '2024-07-26T19:00:00Z', 0, 4, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Excelente perspectiva, acredito que isso vai impactar muito.', TIMESTAMP WITH TIME ZONE '2024-07-26T20:00:00Z', 0, 4, 2);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Acho que essa informação pode mudar a forma como vemos o assunto.', TIMESTAMP WITH TIME ZONE '2024-07-26T21:00:00Z', 0, 5, 1);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Interessante, vou acompanhar mais sobre isso.', TIMESTAMP WITH TIME ZONE '2024-07-26T22:00:00Z', 0, 8, 2);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Interessante, vou acompanhar mais sobre isso.', TIMESTAMP WITH TIME ZONE '2025-07-14T12:00:00Z', 0, 8, 2);

INSERT INTO tb_post (message, posted_at, like_count, parent_id, user_id) VALUES ('Interessante, vou acompanhar mais sobre isso.', TIMESTAMP WITH TIME ZONE '2025-07-14T16:00:00Z', 0, 8, 2);
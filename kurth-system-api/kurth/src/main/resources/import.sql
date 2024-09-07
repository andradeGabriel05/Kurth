INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('John', '@thispersondoesnotexist', 'john@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'https://thispersondoesnotexist.com/', 123, 456, 789);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Jane', '@janedoe', 'jane@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'https://thispersondoesnotexist.com/', 234, 567, 890);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Alice', '@aliceinwonderland', 'alice@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 345, 678, 901);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Bob', '@bobsmith', 'bob@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 456, 789, 123);

INSERT INTO tb_user (name, username, email, created_at, password, bio, avatar, followers, following, posts) VALUES ('Emily', '@emilyjones', 'emily@gmail.com', TIMESTAMP WITH TIME ZONE '2022-07-25T15:00:00Z', '123456', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'https://thispersondoesnotexist.com/', 567, 890, 234);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus placeat alias repellat quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!', TIMESTAMP WITH TIME ZONE '2021-12-22T15:00:00Z', 'https://www.gov.br/mma/pt-br/lula-e-macron-anunciam-investimentos-de-r-5-4-bi-em-bioeconomia-na-amazonia/lula-macron.jpeg', 0, 1);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Lorem ipsum dolor sit amet quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!', TIMESTAMP WITH TIME ZONE '2022-12-21T15:00:00Z','https://s2-oglobo.glbimg.com/D8uAPz0F2zLxbPWEu_QcGbQdH2c=/0x450:1188x1281/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/F/k/V7S5DLT5iviyfbpYejYw/lula.jfif',0, 2);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Sed unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', TIMESTAMP WITH TIME ZONE '2023-01-01T15:00:00Z', '',0, 2);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.', TIMESTAMP WITH TIME ZONE '2023-02-02T15:00:00Z', '',0, 3);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.', TIMESTAMP WITH TIME ZONE '2023-03-03T15:00:00Z', '',0, 3);

INSERT INTO tb_message (message, posted_at, image, like_count, user_id) VALUES ('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Sed quia non numquam eius modi tempora incidunt. Sed quia non numquam eius modi tempora incidunt.', TIMESTAMP WITH TIME ZONE '2024-03-03T15:00:00Z', 'https://img.lagaceta.com.ar/fotos/notas/2024/03/27/600x400_lula-macron-celebran-lazos-estrategicos-1028985-233606.webp',0, 1);

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Concordo completamente com o que foi dito!', 1, 1, TIMESTAMP WITH TIME ZONE '2024-07-26T10:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Muito interessante, obrigado por compartilhar!', 2, 2, TIMESTAMP WITH TIME ZONE '2024-07-26T11:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Essa é uma ótima notícia!', 3, 3, TIMESTAMP WITH TIME ZONE '2024-07-26T12:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Acho que isso vai trazer grandes mudanças.', 1, 2, TIMESTAMP WITH TIME ZONE '2024-07-26T13:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Pode ser um ponto de partida para novas discussões.', 1, 3, TIMESTAMP WITH TIME ZONE '2024-07-26T14:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Concordo! É sempre bom ver ações concretas.', 2, 1, TIMESTAMP WITH TIME ZONE '2024-07-26T15:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('O conteúdo é relevante, obrigado pela atualização.', 2, 3, TIMESTAMP WITH TIME ZONE '2024-07-26T16:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Esses eventos são fundamentais para o futuro.', 3, 1, TIMESTAMP WITH TIME ZONE '2024-07-26T17:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Realmente, as implicações são grandes.', 3, 2, TIMESTAMP WITH TIME ZONE '2024-07-26T18:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Muito bem colocado, é essencial discutir esses pontos.', 4, 1, TIMESTAMP WITH TIME ZONE '2024-07-26T19:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Excelente perspectiva, acredito que isso vai impactar muito.', 4, 2, TIMESTAMP WITH TIME ZONE '2024-07-26T20:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Acho que essa informação pode mudar a forma como vemos o assunto.', 5, 1, TIMESTAMP WITH TIME ZONE '2024-07-26T21:00:00Z');

INSERT INTO tb_reply (message, message_id, user_id, posted_at) VALUES ('Interessante, vou acompanhar mais sobre isso.',  5, 2, TIMESTAMP WITH TIME ZONE '2024-07-26T22:00:00Z');

--INSERT INTO tb_like_count (user_id, message_id) VALUES (1, 3);
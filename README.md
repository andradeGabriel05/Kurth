# Create User

To insert a new user in database, enter url "http://localhost:8080/user" in postman and POST as json:

{
    "name": "Nova pessoa",
    "followers": 12,
    "following": 13,
    "posts": 49,
    "created_at": "2022-07-25 15:00:00+00",
    "avatar": "https://thispersondoesnotexist.com/",
    "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    "email": "nova@gmail.com",
    "password": 123456,
    "username": "@novapessoa"
}

# H2 Console

http://localhost:8080/h2-console/

JDBC URL -> jdbc:h2:mem:kurth

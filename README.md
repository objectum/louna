# Getting Started

`yarn install`

Copy file `.env.example`. Rename it to `.env` and set correct variable values to be able to run the local project
<br>

Ensure that PostgreSQL is running and has the required db:

```
set PGPASSWORD=12345
createdb -h 127.0.0.1 -U postgres louna
psql -U postgres -d louna -c "create role louna noinherit login password '1'"
psql -U postgres -d louna -c "alter database louna owner to louna"
```

Start migration on a fresh database

`yarn migration:latest`

<hr>

Start server

`yarn start`

<hr>

## Task 1

Registration:

```
POST http://localhost:5000/user
{
    "login": "myLogin",
    "password": "myPassword"
}
```

Authorization:

```
POST http://localhost:5000/auth - returns sessionId
{
    "login": "myLogin",
    "password": "myPassword"
}
```

Change password:

```
PUT http://localhost:5000/user?sessionId=[sessionId]
{
    "password": "myPassword"
}
```

## Task 2

2 items with minimum suggested_price:

```
GET http://localhost:5000/product/items?sessionId=[sessionId]
```

Use redis cache for https://docs.skinport.com/items:

```
GET http://localhost:5000/product/items?useCache=true&sessionId=[sessionId]
```

## Task 3

Product list:

```
GET http://localhost:5000/product/list?page=0&pageSize=10&sessionId=[sessionId]
```

Product purchase:

```
POST http://localhost:5000/product/purchase?sessionId=[sessionId]
{
    "productId": 1,
    "userId": 1
}
```

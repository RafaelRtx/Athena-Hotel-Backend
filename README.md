# Athena Hotel Documentation
The Athena Hotel project consists in a simple hotel reservation system API that allows users to register, select rooms, and create reservations. this project was made for studies purpose only.
</br>
</br>
<img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SW-logo-clr.png" height="40" align="right">
## Swagger API Documentation
Athena Hotel Api documentation is available in **SwaggerHub**: [https://app.swaggerhub.com/apis/RAFAZELX/athena-hotel/1.0#/](https://app.swaggerhub.com/apis/RAFAZELX/athena-hotel/1.0#/)
</br>
</br>
#



## Environment variables
> Open the **.env.example** file and fill it with the following data, then, rename it to **.env**
```ts

DATABASE_URL= "postgresql://postgres:password@host.docker.internal:5432/postgres?schema=public" // "postgres" is the default database username, and so is the port 5432.
JSON_TOKEN_KEY= " " // JWT secret

```

## Running project in Docker:
> In project folder, use following command:
```bash
$ docker compose up
```
> If you already have the image created, then:
```bash
$ docker compose start
```

## Database initial data:
- The postgres database is going to create the following data automatically during first execution:
> These sample data represents all the rooms available and it will help application to work properly. you can customize it by yourself.
<h3>Room</h3>

| id | quantity | price | bookings | roomType | description | size | bed_size | capacity | floor |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 3 | 4,000 | [0] | SIMPLE_SINGLE | Room desc. | 70 | 120x200 | 2 | 2 |
| 2 | 3 | 4,500 | [0] | PREMIUM_SINGLE | Room desc. | 70 | 120x200 | 2 | 2 |
| 3 | 3 | 5,500 | [0] | SIMPLE_COUPLE | Room desc. | 70 | 160x240 | 2 | 2 |
| 4 | 3 | 6,500 | [0] | PREMIUM_COUPLE | Room desc. | 90 | 160x240 | 2 | 2 |

> The database is also setted to delete all bookings within 2 minutes when the room reaches maximum capacity.

#
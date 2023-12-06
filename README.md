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






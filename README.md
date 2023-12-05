# Athena Hotel Documentation
This is the documentation of athena hotel project. the project consists in a simple hotel reservation system API that allows users to register, select rooms, and create reservations. this project was made for studies purpose only.
</br>
</br>
<img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SW-logo-clr.png" height="40" align="right">
## Swagger API Documentation
Athena Hotel Api documentation is available in **SwaggerHub**: [https://app.swaggerhub.com/apis/RAFAZELX/athena-hotel/1.0#/](https://app.swaggerhub.com/apis/RAFAZELX/athena-hotel/1.0#/)
</br>
</br>
#

## Project setup (Local)
- First, we'll need to create a postgres database. I'll do it using **Docker**.
> use the following commands to pull a docker image and create the database:
```zsh
$ docker pull postgres
```
```zsh
$ docker run --name my-db -e POSTGRES_PASSWORD=my-password -p 5432:5432 -d postgres
```
- **"my-db"**: Image name you want.
- **"my-password"**: database password you want to use.

# Starting project
- clone the project to your local machine:

```bash
$ git clone https://github.com/RafaelRtx/Athena-Hotel-Backend
```
- acess the project folder:

```bash
$ cd Athena-Hotel-Backend
```
- install all dependencies:

```bash
$ npm install
```

## Configuring database and Environment
> Open the **.env.example** file and fill it with the following data, then, rename it to **.env**.
```ts
DATABASE_HOST= localhost // use localhost to run the app locally | use host.docker.internal to run in Docker.
DATABASE_URL= "postgresql://postgres:password@${DATABASE_HOST}:5432/postgres?schema=public" // "postgres" is the default database username, and so is the port 5432.
JSON_TOKEN_KEY= " " // JWT secret

```
- Create prismaORM migrations:
> This command is going to create all the tables into your postgres database and also seed them with a initial data. database must be active.
```bash
$ npx prisma migrate dev --name init
```
- Run the project:
```bash
$ npm run start:dev
```

## Running project in Docker:
> Remember: in the .env file, DATABASE_HOST= 'host.docker.internal'

```bash
$ docker compose up
```
> If you already have the image created, then:
```bash
$ docker compose start
```






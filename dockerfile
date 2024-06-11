FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma generate

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma migrate deploy

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma db seed

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
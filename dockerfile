FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma migrate deploy

RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma db seed

RUN --mount=type=secret,id=JSON_TOKEN_KEY \
    JSON_TOKEN_KEY="$(cat /run/secrets/JSON_TOKEN_KEY)" npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
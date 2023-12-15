FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npx prisma db seed

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
#!/bin/sh

# Migrate the database
npx prisma migrate deploy

# Generate the Prisma client
npx prisma generate

# Seed the database
npx prisma db seed

# Build the application
npm run build

# Start the application in production mode
npm run start:prod
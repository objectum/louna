FROM node:18 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 5000

ENV PORT 5000

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["sh", "-c", "yarn start"]

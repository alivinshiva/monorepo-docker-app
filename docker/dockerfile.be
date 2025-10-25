FROM oven/bun:1

WORKDIR /usr/src/app

COPY . .
RUN apt-get update -y && apt-get install -y openssl
RUN bun install

RUN bun run generate:db

EXPOSE 8080

CMD ["bun", "start:backend"]
From node:24-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5002

ENV NODE_ENV=development
ENV PORT=5002

USER node

CMD [ "pnpm", "run", "dev" ]

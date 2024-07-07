FROM node:18-alpine AS base

FROM base AS deps
USER root
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV BASE_URL=/healthvue
RUN yarn run build


FROM base AS server
USER root
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app

EXPOSE 8080
CMD ["serve","-p","8080"]

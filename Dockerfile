From node:18-alpine as build
# by default root. we need it run COPY, npm commands
USER root
# place we will do rest of the stuffs
WORKDIR /app

# install package.json first so it get cached
COPY package*.json yarn.lock .npmrc ./

# install yarn and then install dependencies
RUN yarn install

# copy from repo to container and run build
COPY . .
RUN yarn build


From node:18-alpine as server
USER root
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist /app

EXPOSE 8080

CMD ["serve","-p","8080"]

From node:18-alpine as build
# by default root. we need it run COPY, npm commands
USER root
# place we will do rest of the stuffs
WORKDIR /app

# install package.json first so it get cached
COPY package*.json yarn.lock ./

# install yarn and then install dependencies
RUN npm config list
RUN yarn install --frozen-lockfile

# copy from repo to container and run build
COPY . .
RUN BASE_URL=/healthvue/ yarn build


From node:18-alpine as server
USER root
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist /app

EXPOSE 8080

CMD ["serve","-p","8080"]

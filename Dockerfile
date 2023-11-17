FROM node:18-alpine
WORKDIR /frontend
COPY . .
RUN yarn install
COPY . .
RUN yarn run build
CMD [ "yarn", "serve" ]
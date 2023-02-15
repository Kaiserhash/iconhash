FROM node:18-alpine
WORKDIR /frontend
COPY . .
RUN yarn install
COPY . .
RUN yarn run build --public-path https://frontend.iconichash.com/static
CMD [ "yarn", "serve" ]
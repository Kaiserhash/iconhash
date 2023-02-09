FROM node:18-alpine
WORKDIR /frontend
COPY . .
RUN yarn install --only=production
RUN yarn run build --public-path https://frontend.iconichash.com/static
EXPOSE 3038
CMD [ "yarn", "serve" ]
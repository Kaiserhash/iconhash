FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN apt-get update && apt-get install -y certbot
RUN mkdir -p /etc/letsencrypt/live/frontend.iconichash.com
RUN mkdir -p /etc/letsencrypt/live/iconichash.com
RUN certbot certonly --webroot -w /var/www/html -d frontend.iconichash.com -d www.frontend.iconichash.com
RUN certbot certonly --webroot -w /var/www/html -d iconichash.com -d www.iconichash.com
RUN cp -r /etc/letsencrypt/live/frontend.iconichash.com /etc/letsencrypt/live/iconichash.com /etc/letsencrypt/live/
EXPOSE 80
EXPOSE 443


CMD ["nginx", "-g", "daemon off;"]
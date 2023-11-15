# Build Stage
FROM nginx AS builder

RUN apt-get update \
    && apt-get install -y curl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && curl -Lo /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 \
    && chmod +x /usr/local/bin/mkcert \
    && mkdir -p /etc/nginx/ssl \
    && mkcert -cert-file /etc/nginx/ssl/frontend.iconichash.com.crt -key-file /etc/nginx/ssl/frontend.iconichash.com.key frontend.iconichash.com \
    && mkcert -cert-file /etc/nginx/ssl/iconichash.com.crt -key-file /etc/nginx/ssl/iconichash.com.key iconichash.com

# Final Stage
FROM nginx

# Copy SSL certificates from the builder stage
COPY --from=builder /etc/nginx/ssl /etc/nginx/ssl

# Copy nginx configuration
COPY ./nginx/nginx_frontend.conf /etc/nginx/nginx_frontend.conf
COPY ./nginx/nginx_wordpress.conf /etc/nginx/nginx_wordpress.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Start nginx with the generated certificates
CMD ["nginx", "-g", "daemon off;"]
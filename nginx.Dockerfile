FROM nginx

# Install dependencies
RUN apt-get update && apt-get install -y curl ca-certificates

# Install mkcert
RUN curl -Lo /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 && \
    chmod +x /usr/local/bin/mkcert

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Copy nginx configuration
COPY ./nginx/nginx_frontend.conf /etc/nginx/conf.d/
COPY ./nginx/nginx_wordpress.conf /etc/nginx/conf.d/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Generate SSL certificates with mkcert
RUN mkcert -cert-file /etc/nginx/ssl/frontend.iconichash.com.crt -key-file /etc/nginx/ssl/frontend.iconichash.com.key frontend.iconichash.com
RUN mkcert -cert-file /etc/nginx/ssl/iconichash.com.crt -key-file /etc/nginx/ssl/iconichash.com.key iconichash.com

# Expose ports
EXPOSE 80
EXPOSE 443

# Start nginx with the generated certificates
CMD ["nginx", "-g", "daemon off;"]
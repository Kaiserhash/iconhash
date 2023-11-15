# Build Stage
FROM httpd AS builder

RUN apt-get update \
    && apt-get install -y curl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && curl -Lo /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 \
    && chmod +x /usr/local/bin/mkcert \
    && mkdir -p /usr/local/apache2/ssl \
    && mkcert -cert-file /usr/local/apache2/ssl/frontend.iconichash.com.crt -key-file /usr/local/apache2/ssl/frontend.iconichash.com.key frontend.iconichash.com \
    && mkcert -cert-file /usr/local/apache2/ssl/iconichash.com.crt -key-file /usr/local/apache2/ssl/iconichash.com.key iconichash.com

# Final Stage
FROM httpd

# Copy SSL certificates from the builder stage
COPY --from=builder /usr/local/apache2/ssl /usr/local/apache2/ssl

# Enable necessary Apache modules
RUN sed -i '/#LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
    && sed -i '/#LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copy Apache configuration files
COPY ./apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./apache/apache_frontend.conf /usr/local/apache2/conf/extra/apache_frontend.conf
COPY ./apache/apache_wordpress.conf /usr/local/apache2/conf/extra/apache_wordpress.conf

# Expose ports
EXPOSE 80 443

# Start Apache in the foreground
CMD ["httpd-foreground"]
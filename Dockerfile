FROM composer:2 AS composer

WORKDIR /var/www

COPY composer.json composer.lock ./

RUN composer install \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

FROM php:8.5-cli

WORKDIR /var/www

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer /var/www/vendor ./vendor

COPY . .

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

#!/bin/sh

# Останавливаем скрипт при первой ошибке
set -e

echo "Starting deployment..."

# Проверяем наличие переменной окружения
if [ -z "$SERVER_DESTINATION_PATH" ]; then
    echo "Error: SERVER_DESTINATION_PATH is not set"
    exit 1
fi

# Проверяем существование директории
if [ ! -d "$SERVER_DESTINATION_PATH" ]; then
    echo "Error: Directory $SERVER_DESTINATION_PATH does not exist"
    exit 1
fi

# Копируем .env файл если существует
if [ -f ".env.deploy" ]; then
    echo "Copying .env.deploy to server..."
    cp .env.deploy "$SERVER_DESTINATION_PATH/.env"
fi

# Устанавливаем pm2 глобально, если он не установлен
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi

# Переходим в директорию проекта
echo "Changing to project directory: $SERVER_DESTINATION_PATH"
cd "$SERVER_DESTINATION_PATH"

# Останавливаем и удаляем все процессы PM2
echo "Stopping and removing existing PM2 processes..."
pm2 stop bdt || true
pm2 delete bdt || true

# Запускаем приложения через PM2
echo "Starting application with PM2..."

PORT=3000 pm2 start --name "bdt" server.js

# Сохраняем конфигурацию PM2 и настраиваем автозапуск
echo "Saving PM2 configuration and setting up startup..."
pm2 save
pm2 startup

echo "Deployment completed successfully!"

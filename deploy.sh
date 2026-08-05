#!/bin/bash
set -e

echo "🚀 Starting deployment on $(date)"

# Переходим в папку приложения
cd /home/bdt

# Проверяем, что есть package.json
if [ ! -f package.json ]; then
    echo "❌ package.json not found!"
    exit 1
fi

# Устанавливаем зависимости
echo "📦 Installing dependencies..."
npm install --production --no-audit --no-fund

# Проверяем, что есть server.js
if [ ! -f server.js ]; then
    echo "❌ server.js not found!"
    echo "📁 Files in directory:"
    ls -la
    exit 1
fi

# Запускаем приложение через PM2
echo "🔄 Starting application..."
if pm2 list | grep -q "bdt"; then
    echo "Restarting existing process..."
    pm2 restart bdt
else
    echo "Starting new process..."
    pm2 start server.js --name bdt
fi

# Сохраняем состояние PM2
pm2 save

# Показываем статус
echo "📊 PM2 status:"
pm2 status

# Проверяем, что приложение работает
echo "🔍 Checking health..."
sleep 2
if curl -f http://localhost:3000 &> /dev/null; then
    echo "✅ Health check passed"
else
    echo "⚠️ Health check failed, but continuing..."
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Site: http://alexandra-prudnikova.ru"

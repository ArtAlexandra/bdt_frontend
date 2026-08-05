#!/bin/bash
set -e

echo "🚀 Starting deployment on $(date)"

cd /home/bdt

if [ ! -f package.json ]; then
    echo "❌ package.json not found!"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --omit=dev --no-audit --no-fund

if [ ! -f server.js ]; then
    echo "❌ server.js not found!"
    ls -la
    exit 1
fi

if [ ! -d ".next" ]; then
    echo "🔨 Building application..."
    npm run build
fi

echo "🔄 Starting application..."

# Останавливаем и удаляем старый процесс если есть
pm2 stop bdt 2>/dev/null || true
pm2 delete bdt 2>/dev/null || true

# Запускаем новый процесс
pm2 start server.js --name bdt
pm2 save

echo "📊 PM2 status:"
pm2 status

echo "🔍 Health check..."
sleep 3
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Health check passed"
else
    echo "⚠️ Health check failed"
    pm2 logs bdt --lines 20
fi

echo "✅ Deployment completed!"
echo "🌐 http://alexandra-prudnikova.ru"

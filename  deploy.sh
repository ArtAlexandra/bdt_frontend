name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          NEXT_PUBLIC_URL: http://alexandra-prudnikova.ru
          NEXT_PUBLIC_API_URL: http://api.alexandra-prudnikova.ru
        run: npm run build

      - name: Prepare dist
        run: |
          mkdir -p dist
          
          if [ -d "out/standalone" ]; then
            cp -r out/standalone/* dist/
          fi
          
          # Копируем все нужные файлы
          cp package.json dist/ 2>/dev/null || true
          cp package-lock.json dist/ 2>/dev/null || true
          cp deploy.sh dist/ 2>/dev/null || true
          cp server.js dist/ 2>/dev/null || true
          
          echo "📁 Dist contents:"
          ls -la dist/

      - name: Deploy files to Server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          port: 2288
          source: "dist/*"
          target: "/home/bdt"
          strip_components: 1
          rm: false
          overwrite: true

      - name: Deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          port: 2288
          script: |
            cd /home/bdt
            chmod +x deploy.sh
            ./deploy.sh


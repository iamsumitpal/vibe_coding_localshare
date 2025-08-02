#!/bin/bash

echo "🚀 Local Share Deployment Script"
echo "================================"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo "Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Vercel CLI not found"
    echo "Install it with: npm i -g vercel"
    echo "Then run: vercel --prod"
fi

echo ""
echo "📋 Alternative Deployment Options:"
echo "1. Railway: Connect GitHub repo to railway.app"
echo "2. Render: Connect GitHub repo to render.com"
echo "3. Heroku: Connect GitHub repo to heroku.com"
echo ""
echo "🌐 After deployment, update the WebSocket URL in index.html"
echo "   with your deployed domain name" 
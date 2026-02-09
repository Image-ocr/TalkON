#!/bin/bash

set -e

echo "🚀 Setting up TalkON development environment..."

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Prerequisites satisfied"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment files
echo "⚙️  Setting up environment files..."
if [ ! -f packages/backend-auth/.env ]; then
    cp packages/backend-auth/.env.example packages/backend-auth/.env
    echo "✅ Created packages/backend-auth/.env"
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
npm run migrate --workspace=packages/backend-auth

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Edit .env files with your configuration"
echo "   2. Run 'npm run dev' to start development servers"
echo "   3. Visit http://localhost:3000 for the web app"
echo "   4. Visit http://localhost:3001/health for the auth service"
echo ""
echo "📚 Documentation: README.md"
echo "🐛 Issues: https://github.com/yourusername/talkon/issues"
echo ""

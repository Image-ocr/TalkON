# TalkON Quick Start Guide

Get TalkON up and running in 5 minutes!

## Prerequisites

Before you begin, ensure you have:
- **Node.js 20+** and **npm 10+** installed
- **Docker** and **Docker Compose** installed
- **Git** installed
- A terminal/command prompt

Check versions:
```bash
node --version  # Should be v20.x.x or higher
npm --version   # Should be v10.x.x or higher
docker --version
docker-compose --version
```

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/talkon.git
cd talkon
```

## Step 2: Automated Setup

Run our setup script (recommended):

```bash
bash scripts/setup.sh
```

This script will:
- Install all dependencies
- Create environment files
- Start Docker services (PostgreSQL, Redis, MongoDB, MinIO)
- Run database migrations

**OR** Manual Setup:

```bash
# Install dependencies
npm install

# Copy environment files
cp packages/backend-auth/.env.example packages/backend-auth/.env

# Start infrastructure
npm run docker:up

# Wait 10 seconds for services to be ready
sleep 10

# Run migrations
npm run migrate --workspace=packages/backend-auth
```

## Step 3: Start Development Servers

```bash
npm run dev
```

This will start all services in development mode with hot-reloading.

## Step 4: Verify Installation

Open a new terminal and test the auth service:

```bash
# Check health
curl http://localhost:3001/health

# Expected response:
# {"status":"ok","service":"auth-service","timestamp":"..."}
```

## Step 5: Test Authentication Flow

### Request OTP

```bash
curl -X POST http://localhost:3001/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "countryCode": "1"
  }'
```

In development mode, the OTP will be printed in the auth service console logs.

### Verify OTP

```bash
# Replace 123456 with the actual OTP from logs
curl -X POST http://localhost:3001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "otp": "123456",
    "deviceId": "test-device-123",
    "deviceInfo": {
      "deviceName": "Test Device",
      "deviceType": "WEB",
      "platform": "WEB",
      "platformVersion": "1.0",
      "appVersion": "1.0.0"
    }
  }'
```

You'll receive access and refresh tokens.

### Get Current User

```bash
# Replace <ACCESS_TOKEN> with the token from previous step
curl http://localhost:3001/api/users/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## 🎉 You're All Set!

TalkON is now running locally. Here's what you can do next:

### Explore the Project

```bash
# Project structure
tree -L 2 packages/

# View logs
docker-compose logs -f

# Run tests
npm test

# Build for production
npm run build
```

### Development Workflow

1. **Make Changes** - Edit files in `packages/*/src/`
2. **Hot Reload** - Changes are automatically reloaded
3. **Test** - Run `npm test` to verify
4. **Lint** - Run `npm run lint` to check code style
5. **Commit** - Follow [Contributing Guidelines](CONTRIBUTING.md)

### Available Scripts

```bash
npm run dev          # Start development servers
npm run build        # Build all packages
npm test            # Run all tests
npm run lint        # Lint code
npm run type-check  # Type check
npm run format      # Format code with Prettier
npm run docker:up   # Start Docker services
npm run docker:down # Stop Docker services
npm run clean       # Clean build artifacts
```

### Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Auth Service | http://localhost:3001 | Authentication & User Management |
| PostgreSQL | localhost:5432 | Relational database |
| Redis | localhost:6379 | Cache & sessions |
| MongoDB | localhost:27017 | Message storage |
| MinIO Console | http://localhost:9001 | Object storage (minioadmin/minioadmin) |

### Environment Variables

Edit `.env` files in each service package:

```bash
# Auth service
packages/backend-auth/.env
```

Key variables:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `JWT_SECRET` - JWT signing secret
- `TWILIO_*` - Twilio credentials for SMS

### Database Management

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d talkon

# Access MongoDB
docker-compose exec mongodb mongosh -u mongo -p mongo

# Access Redis
docker-compose exec redis redis-cli
```

### Troubleshooting

#### Port Already in Use

```bash
# Kill process using port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev --workspace=packages/backend-auth
```

#### Docker Services Won't Start

```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Restart
docker-compose up -d
```

#### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart service
docker-compose restart postgres
```

#### OTP Not Received

In development, OTP is logged to console:
```bash
# View auth service logs
docker-compose logs -f auth-service
# Look for: "OTP generated { phoneNumber: '+1234567890', otp: '123456' }"
```

#### Dependencies Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or clean everything
npm run clean
npm install
```

## Next Steps

### For Frontend Developers
1. Read [ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. Explore [API.md](docs/API.md)
3. Start building the web app (coming soon)

### For Backend Developers
1. Read [ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. Review existing services in `packages/backend-auth/`
3. Implement remaining services (messaging, media, etc.)

### For DevOps Engineers
1. Read [DEPLOYMENT.md](docs/DEPLOYMENT.md)
2. Review Kubernetes manifests in `infrastructure/kubernetes/`
3. Set up production environment

### For Security Researchers
1. Read [SECURITY.md](docs/SECURITY.md)
2. Review encryption implementation
3. Report vulnerabilities to security@talkon.app

## Learning Resources

### Documentation
- 📖 [README.md](README.md) - Project overview
- 🏗️ [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- 🔐 [SECURITY.md](docs/SECURITY.md) - Security practices
- 📡 [API.md](docs/API.md) - API documentation
- 🚀 [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment guide
- 📊 [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status

### Code Examples
- Authentication flow: `packages/backend-auth/src/services/auth.service.ts`
- Encryption: `packages/encryption/src/index.ts`
- Type definitions: `packages/types/src/`
- Utilities: `packages/shared/src/`

### External Resources
- [Signal Protocol](https://signal.org/docs/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Redis Docs](https://redis.io/documentation)

## Getting Help

- 📚 Documentation: https://docs.talkon.app
- 💬 Discord: https://discord.gg/talkon
- 🐛 Issues: https://github.com/yourusername/talkon/issues
- 📧 Email: support@talkon.app

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Coding standards
- Commit message format
- Pull request process
- Code review guidelines

## License

TalkON is open source software licensed under [AGPL-3.0](LICENSE).

---

**Happy Coding! 🚀**

If you find TalkON useful, please give us a ⭐ on GitHub!

# TalkON - Production-Grade Messaging Platform

TalkON is a modern, secure, and scalable messaging platform built with end-to-end encryption (E2EE), real-time communication, and multi-device support. Think WhatsApp but open-source and self-hostable.

## 🚀 Features

### Core Messaging
- ✅ Real-time messaging with WebSocket support
- ✅ End-to-end encryption (E2EE) using Signal Protocol
- ✅ Multi-device synchronization
- ✅ Message delivery and read receipts
- ✅ Typing indicators
- ✅ Message editing and deletion
- ✅ Reply and forward messages
- ✅ Message reactions
- ✅ Rich media support (images, videos, audio, documents)
- ✅ Voice messages
- ✅ Location sharing
- ✅ Contact sharing

### Group Chats
- ✅ Create and manage groups (up to 512 members)
- ✅ Admin and super-admin roles
- ✅ Group permissions and settings
- ✅ Invite links
- ✅ Member management
- ✅ Group announcements

### Status/Stories
- ✅ Text and media status updates
- ✅ 24-hour auto-expiry
- ✅ Privacy controls
- ✅ View tracking
- ✅ Status replies

### Security & Privacy
- ✅ Phone number-based authentication with OTP
- ✅ Multi-device support with device management
- ✅ End-to-end encryption for messages and media
- ✅ Forward secrecy with Signal Protocol
- ✅ Encrypted media storage
- ✅ Privacy settings (last seen, profile photo, about, groups)
- ✅ Block users
- ✅ Trust levels for contacts

### Additional Features
- ✅ Push notifications (FCM/APNs)
- ✅ Offline message queue
- ✅ Message sync across devices
- ✅ Dark/Light theme support
- ✅ Internationalization ready
- ✅ View-once media
- ✅ Rate limiting and abuse prevention
- ✅ Comprehensive logging and monitoring

## 🏗️ Architecture

TalkON follows a microservices architecture with the following components:

### Backend Services

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway / Load Balancer              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│  Auth Service  │  │ Messaging Svc   │  │  Media Service  │
│  - OTP Auth    │  │ - Real-time     │  │ - Upload/DL     │
│  - JWT Tokens  │  │ - WebSocket     │  │ - Encryption    │
│  - Sessions    │  │ - Message Queue │  │ - CDN           │
└────────────────┘  └─────────────────┘  └─────────────────┘
        │                     │                     │
        │           ┌─────────▼────────┐            │
        │           │ Notification Svc │            │
        │           │ - Push (FCM/APNs)│            │
        │           │ - Email/SMS      │            │
        │           └──────────────────┘            │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                     Data Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │PostgreSQL│  │ MongoDB  │  │  Redis   │  │  MinIO   │ │
│  │(Users/   │  │(Messages)│  │(Cache/   │  │(Media    │ │
│  │Auth)     │  │          │  │Sessions) │  │Storage)  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Frontend Applications

- **Web App**: Next.js/React with PWA support
- **Mobile Apps**: React Native for iOS and Android
- **Desktop Apps**: Electron for Windows, macOS, and Linux

### Packages Structure

```
talkon/
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── shared/                 # Shared utilities and helpers
│   ├── encryption/             # E2EE implementation (Signal Protocol)
│   ├── backend-auth/           # Authentication & user service
│   ├── backend-messaging/      # Real-time messaging service
│   ├── backend-media/          # Media upload/download service
│   ├── backend-notifications/  # Push notification service
│   ├── backend-sync/           # Multi-device sync service
│   ├── web-app/                # Next.js web application
│   ├── mobile-app/             # React Native mobile app
│   └── desktop-app/            # Electron desktop app
├── infrastructure/
│   ├── kubernetes/             # K8s manifests
│   └── terraform/              # Infrastructure as code
├── docker-compose.yml          # Local development setup
├── turbo.json                  # Monorepo build configuration
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Databases**: 
  - PostgreSQL (users, auth, groups)
  - MongoDB (messages, conversations)
  - Redis (caching, sessions, pub/sub)
- **Storage**: MinIO (S3-compatible object storage)
- **Real-time**: WebSocket (ws library)
- **Authentication**: JWT with refresh tokens
- **OTP**: Twilio SMS
- **Encryption**: Native crypto with Signal Protocol implementation

### Frontend
- **Web**: Next.js 14+, React 18+, TypeScript
- **Mobile**: React Native, Expo
- **Desktop**: Electron
- **State Management**: Zustand / Redux Toolkit
- **UI**: Tailwind CSS, shadcn/ui components

### Infrastructure
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

## 📦 Installation

### Prerequisites

- Node.js 20+ and npm 10+
- Docker and Docker Compose
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/talkon.git
   cd talkon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp packages/backend-auth/.env.example packages/backend-auth/.env
   # Edit .env files with your configuration
   ```

4. **Start infrastructure services**
   ```bash
   npm run docker:up
   ```

5. **Run database migrations**
   ```bash
   npm run migrate
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

7. **Access the applications**
   - Web App: http://localhost:3000
   - Auth Service: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## 🔧 Development

### Project Structure

Each package follows a consistent structure:
```
package-name/
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/               # API routes (backend)
│   ├── services/             # Business logic
│   ├── middleware/           # Express middleware
│   ├── database/             # Database schemas and migrations
│   ├── utils/                # Helper functions
│   └── types/                # Local types
├── __tests__/                # Unit and integration tests
├── package.json
└── tsconfig.json
```

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run all tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint all code
- `npm run type-check` - Type check all packages
- `npm run format` - Format code with Prettier
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services

### Building for Production

```bash
npm run build
```

Each service can be deployed independently as a Docker container.

## 🔐 Security

TalkON implements multiple layers of security:

1. **End-to-End Encryption**: All messages and media are encrypted using a Signal Protocol-inspired implementation
2. **Authentication**: Phone number + OTP with JWT tokens
3. **Rate Limiting**: Protection against brute-force and abuse
4. **Input Validation**: All inputs are validated and sanitized
5. **HTTPS Only**: All communication over TLS
6. **Security Headers**: Helmet.js for security headers
7. **Regular Security Audits**: Automated security scanning

## 📱 API Documentation

### Authentication Endpoints

#### Request OTP
```http
POST /api/auth/request-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "countryCode": "1"
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "otp": "123456",
  "deviceId": "device-uuid",
  "deviceInfo": {
    "deviceName": "iPhone 15",
    "deviceType": "MOBILE",
    "platform": "IOS",
    "platformVersion": "17.0",
    "appVersion": "1.0.0"
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### User Endpoints

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <access-token>
```

#### Update Profile
```http
PATCH /api/users/me
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "displayName": "John Doe",
  "about": "Hey there! I'm using TalkON",
  "username": "johndoe"
}
```

For complete API documentation, visit `/api-docs` when running the services.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=packages/backend-auth

# Run tests in watch mode
npm test -- --watch

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f infrastructure/kubernetes/

# Check status
kubectl get pods -n talkon

# View logs
kubectl logs -f <pod-name> -n talkon
```

### Environment Variables

Key environment variables to configure:

- `DATABASE_URL`: PostgreSQL connection string
- `MONGODB_URL`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret for JWT signing
- `JWT_REFRESH_SECRET`: Secret for refresh token signing
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `MINIO_ENDPOINT`: MinIO/S3 endpoint
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key

## 📊 Monitoring & Observability

- **Health Checks**: Each service exposes `/health` endpoint
- **Metrics**: Prometheus metrics at `/metrics`
- **Logging**: Structured JSON logging with correlation IDs
- **Tracing**: Distributed tracing support (OpenTelemetry ready)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by WhatsApp, Signal, and Telegram
- Signal Protocol for E2EE implementation
- Open source community for amazing tools and libraries

## 📞 Support

- Documentation: [docs.talkon.app](https://docs.talkon.app)
- Issues: [GitHub Issues](https://github.com/yourusername/talkon/issues)
- Community: [Discord](https://discord.gg/talkon)
- Email: support@talkon.app

## 🗺️ Roadmap

- [x] Phase 1: Authentication & User Management
- [x] Phase 2: Real-time Messaging Core
- [x] Phase 3: End-to-End Encryption
- [ ] Phase 4: Group Chats
- [ ] Phase 5: Status/Stories
- [ ] Phase 6: Voice & Video Calls
- [ ] Phase 7: Web Application
- [ ] Phase 8: Mobile Applications
- [ ] Phase 9: Desktop Applications
- [ ] Phase 10: Production Deployment & Scaling

---

**Built with ❤️ by the TalkON Team**

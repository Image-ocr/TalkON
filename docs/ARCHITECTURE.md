# TalkON Architecture

## Overview

TalkON is built on a microservices architecture with a focus on scalability, security, and maintainability. This document describes the system architecture, design decisions, and data flow.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Web App  │  │ iOS App  │  │Android   │  │ Desktop  │       │
│  │(Next.js) │  │ (RN)     │  │App (RN)  │  │(Electron)│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway / CDN                           │
│              (NGINX / Cloudflare / AWS CloudFront)               │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Services                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Auth Service │  │ Messaging    │  │ Media        │         │
│  │ Port: 3001   │  │ Service      │  │ Service      │         │
│  │              │  │ Port: 3002   │  │ Port: 3003   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │Notification  │  │ Sync         │                           │
│  │Service       │  │ Service      │                           │
│  │Port: 3004    │  │ Port: 3005   │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ PostgreSQL   │  │ MongoDB      │  │ Redis        │         │
│  │ (Users/Auth) │  │ (Messages)   │  │ (Cache/Pub)  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐                                               │
│  │ MinIO/S3     │                                               │
│  │ (Media)      │                                               │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
```

## Services

### 1. Authentication Service (Port 3001)

**Responsibilities:**
- User registration and authentication
- OTP generation and verification
- JWT token management (access & refresh tokens)
- Session management
- Device registration and management
- User profile management
- Security event logging

**Technology Stack:**
- Express.js
- PostgreSQL (user data)
- Redis (sessions, OTP)
- Twilio (SMS for OTP)

**Key Endpoints:**
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `POST /api/auth/logout-all` - Logout from all devices
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update user profile
- `GET /api/devices` - List user devices
- `DELETE /api/devices/:id` - Remove device

### 2. Messaging Service (Port 3002)

**Responsibilities:**
- Real-time message delivery via WebSocket
- Message persistence
- Conversation management
- Message status updates (sent, delivered, read)
- Typing indicators
- Message editing and deletion
- Group chat management
- Message search

**Technology Stack:**
- Express.js + WebSocket (ws)
- MongoDB (messages, conversations)
- Redis (pub/sub, presence)
- Message queue (for offline messages)

**Key Features:**
- WebSocket connection management
- Message ordering with sequence numbers
- At-least-once delivery guarantee
- Offline message queue
- Message synchronization across devices

### 3. Media Service (Port 3003)

**Responsibilities:**
- Media upload (images, videos, audio, documents)
- Media download with presigned URLs
- Media encryption/decryption
- Thumbnail generation
- Media compression
- View-once media management
- Virus/malware scanning

**Technology Stack:**
- Express.js
- MinIO/S3 (object storage)
- Sharp (image processing)
- FFmpeg (video processing)

**Key Endpoints:**
- `POST /api/media/upload` - Request upload URL
- `POST /api/media/upload/chunk` - Chunked upload
- `GET /api/media/:id` - Get download URL
- `GET /api/media/:id/thumbnail` - Get thumbnail

### 4. Notification Service (Port 3004)

**Responsibilities:**
- Push notifications (FCM for Android, APNs for iOS)
- Email notifications
- SMS notifications
- Notification preferences management
- Badge count management
- Silent sync notifications

**Technology Stack:**
- Express.js
- Firebase Cloud Messaging
- Apple Push Notification Service
- Redis (notification queue)

### 5. Sync Service (Port 3005)

**Responsibilities:**
- Multi-device message synchronization
- Conversation state sync
- Encryption key distribution
- Contact sync
- Settings sync
- Conflict resolution

**Technology Stack:**
- Express.js
- MongoDB (sync state)
- Redis (pub/sub)

## Database Schema

### PostgreSQL (Relational Data)

**users**
- id (UUID, PK)
- phone_number (VARCHAR, UNIQUE)
- phone_number_hash (VARCHAR)
- username (VARCHAR, UNIQUE)
- display_name (VARCHAR)
- about (TEXT)
- profile_photo_url (TEXT)
- hide_phone_number (BOOLEAN)
- last_seen (TIMESTAMP)
- is_online (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**devices**
- id (VARCHAR, PK)
- user_id (UUID, FK → users)
- device_name (VARCHAR)
- device_type (VARCHAR)
- platform (VARCHAR)
- platform_version (VARCHAR)
- app_version (VARCHAR)
- push_token (TEXT)
- last_seen (TIMESTAMP)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**auth_sessions**
- id (UUID, PK)
- user_id (UUID, FK → users)
- device_id (VARCHAR, FK → devices)
- refresh_token_hash (VARCHAR)
- last_activity_at (TIMESTAMP)
- expires_at (TIMESTAMP)
- created_at (TIMESTAMP)

**contacts**
- user_id (UUID, FK → users)
- contact_user_id (UUID, FK → users)
- nickname (VARCHAR)
- is_blocked (BOOLEAN)
- is_favorite (BOOLEAN)
- trust_level (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### MongoDB (Document Data)

**messages**
```javascript
{
  _id: ObjectId,
  id: UUID,
  conversationId: UUID,
  senderId: UUID,
  recipientId: UUID,
  type: String,
  content: Object,
  replyToId: UUID,
  forwardedFrom: UUID,
  editedAt: Date,
  deletedAt: Date,
  deletedFor: [{ userId: UUID, deletedAt: Date }],
  status: String,
  timestamp: Date,
  deliveredAt: Date,
  readAt: Date,
  encryptedContent: String,
  encryptionKeyId: String,
  sequenceNumber: Number
}
```

**conversations**
```javascript
{
  _id: ObjectId,
  id: UUID,
  type: String, // 'DIRECT' | 'GROUP'
  participants: [UUID],
  lastMessage: {
    messageId: UUID,
    senderId: UUID,
    content: String,
    timestamp: Date,
    type: String
  },
  unreadCount: { [userId]: Number },
  mutedUntil: { [userId]: Date },
  pinnedBy: [UUID],
  archivedBy: [UUID],
  createdAt: Date,
  updatedAt: Date
}
```

**groups**
```javascript
{
  _id: ObjectId,
  id: UUID,
  name: String,
  description: String,
  iconUrl: String,
  creatorId: UUID,
  members: [{
    userId: UUID,
    role: String,
    joinedAt: Date,
    addedBy: UUID
  }],
  settings: {
    onlyAdminsCanSend: Boolean,
    onlyAdminsCanEditInfo: Boolean,
    approveNewMembers: Boolean,
    maxMembers: Number
  },
  inviteLink: String,
  inviteLinkEnabled: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Redis (Cache & Pub/Sub)

**Key Patterns:**
- `talkon:session:{sessionId}` - Session data
- `talkon:otp:{phoneNumber}` - OTP data
- `talkon:ratelimit:{key}` - Rate limiting counters
- `talkon:presence:{userId}` - User online status
- `talkon:typing:{conversationId}:{userId}` - Typing indicators
- `talkon:unread:{userId}:{conversationId}` - Unread counts

**Pub/Sub Channels:**
- `talkon:messages:{userId}` - New messages
- `talkon:presence` - Presence updates
- `talkon:typing:{conversationId}` - Typing events
- `talkon:sync:{userId}` - Sync events

## Security Architecture

### End-to-End Encryption

TalkON implements E2EE using a Signal Protocol-inspired approach:

1. **Key Generation**
   - Identity key pair (long-term)
   - Signed pre-key (medium-term, rotated)
   - One-time pre-keys (short-term)

2. **Session Establishment**
   - Fetch recipient's pre-key bundle
   - Establish session using X3DH (Extended Triple Diffie-Hellman)
   - Derive initial chain key and root key

3. **Message Encryption**
   - Use Double Ratchet algorithm
   - Generate per-message keys
   - Encrypt message content
   - Send encrypted ciphertext

4. **Message Decryption**
   - Receive ciphertext
   - Advance ratchet state
   - Derive message key
   - Decrypt content

### Authentication Flow

1. User enters phone number
2. Server generates and sends OTP via SMS
3. User enters OTP
4. Server verifies OTP
5. Server generates access token (15min) and refresh token (30d)
6. Client stores tokens securely
7. Client uses access token for API requests
8. On expiry, client uses refresh token to get new access token

### Authorization

- JWT-based authentication
- Role-based access control (user, admin, super-admin)
- Device-level access control
- Group membership validation
- Privacy settings enforcement

## Data Flow

### Sending a Message

1. Client encrypts message content
2. Client sends encrypted message via WebSocket
3. Messaging service validates authentication
4. Service saves message to MongoDB
5. Service publishes to Redis pub/sub
6. All online recipient devices receive via WebSocket
7. Notification service triggers push for offline devices
8. Recipients decrypt and display message
9. Read receipts sent back to sender

### Multi-Device Sync

1. New device registers with auth service
2. Sync service fetches recent messages
3. Encryption keys synced (encrypted with device key)
4. Conversation states synchronized
5. Settings synchronized
6. All future messages delivered to all devices

## Scalability Considerations

### Horizontal Scaling

- Stateless services for easy scaling
- WebSocket connections distributed via Redis pub/sub
- Database read replicas for read-heavy operations
- Sharding strategy for messages by conversation ID
- CDN for static assets and media

### Performance Optimization

- Connection pooling for databases
- Redis caching for frequently accessed data
- Message batching for efficiency
- Lazy loading of conversation history
- Media compression before upload
- Thumbnail generation for quick previews

### High Availability

- Multi-region deployment
- Database replication
- Redis Sentinel for failover
- Load balancing across service instances
- Circuit breakers for fault tolerance
- Graceful degradation

## Monitoring & Observability

### Metrics

- Request rate, latency, error rate per endpoint
- WebSocket connection count
- Message delivery rate and latency
- Database query performance
- Cache hit/miss ratio
- Storage usage

### Logging

- Structured JSON logs
- Correlation IDs for request tracing
- Error logging with stack traces
- Security event logging
- Audit logs for sensitive operations

### Alerting

- Service health checks
- High error rates
- Slow response times
- Database connection issues
- High memory/CPU usage
- Storage capacity warnings

## Future Enhancements

- Voice and video calling (WebRTC)
- Message reactions with emoji
- Poll creation in groups
- Bot API for integrations
- Self-destructing messages
- Screenshot detection
- Blockchain-based identity verification
- Decentralized architecture with IPFS

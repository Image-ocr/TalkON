# TalkON API Documentation

## Base URLs

- Development: `http://localhost:3001`
- Production: `https://api.talkon.app`

## Authentication

Most endpoints require authentication using JWT Bearer tokens.

```http
Authorization: Bearer <access_token>
```

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { /* response data */ },
  "error": { /* error details if success=false */ },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123",
    "pagination": { /* pagination info if applicable */ }
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| BAD_REQUEST | 400 | Invalid request |
| VALIDATION_ERROR | 400 | Input validation failed |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
| INVALID_CREDENTIALS | 401 | Wrong credentials |
| INVALID_OTP | 400 | OTP verification failed |
| OTP_EXPIRED | 400 | OTP has expired |
| TOKEN_EXPIRED | 401 | Token expired |
| USER_BLOCKED | 403 | User is blocked |

## Authentication Endpoints

### Request OTP

Request an OTP for phone number verification.

**Endpoint:** `POST /api/auth/request-otp`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "countryCode": "1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "OTP sent successfully"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

**Rate Limit:** 5 requests per hour per phone number

---

### Verify OTP

Verify OTP and authenticate user.

**Endpoint:** `POST /api/auth/verify-otp`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "otp": "123456",
  "deviceId": "device-uuid-123",
  "deviceInfo": {
    "deviceName": "iPhone 15",
    "deviceType": "MOBILE",
    "platform": "IOS",
    "platformVersion": "17.0",
    "appVersion": "1.0.0",
    "pushToken": "fcm-token-here"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

**Errors:**
- `INVALID_OTP` - Wrong OTP entered
- `OTP_EXPIRED` - OTP validity expired (10 minutes)
- `RATE_LIMIT_EXCEEDED` - Too many attempts

---

### Refresh Token

Get a new access token using refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

---

### Logout

Logout from current device.

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

---

### Logout All Devices

Logout from all devices.

**Endpoint:** `POST /api/auth/logout-all`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logged out from all devices"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

## User Endpoints

### Get Current User

Get authenticated user's profile.

**Endpoint:** `GET /api/users/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid-123",
    "phoneNumber": "+1234567890",
    "username": "johndoe",
    "displayName": "John Doe",
    "about": "Hey there! I'm using TalkON",
    "profilePhotoUrl": "https://cdn.talkon.app/photos/user-123.jpg",
    "hidePhoneNumber": false,
    "isOnline": true,
    "lastSeen": "2024-02-09T10:30:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-02-09T10:30:00Z"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:30:00Z",
    "requestId": "req-123"
  }
}
```

---

### Update Profile

Update user profile information.

**Endpoint:** `PATCH /api/users/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "displayName": "John Doe",
  "username": "johndoe",
  "about": "New status message",
  "hidePhoneNumber": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid-123",
    "phoneNumber": "+1234567890",
    "username": "johndoe",
    "displayName": "John Doe",
    "about": "New status message",
    "profilePhotoUrl": "https://cdn.talkon.app/photos/user-123.jpg",
    "hidePhoneNumber": true,
    "isOnline": true,
    "lastSeen": "2024-02-09T10:30:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-02-09T10:31:00Z"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:31:00Z",
    "requestId": "req-124"
  }
}
```

**Validation Rules:**
- `displayName`: 1-50 characters
- `username`: 3-30 characters, alphanumeric + underscore only
- `about`: Max 200 characters

---

### Get User by ID

Get another user's public profile.

**Endpoint:** `GET /api/users/:userId`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid-456",
    "displayName": "Jane Smith",
    "username": "janesmith",
    "about": "Available",
    "profilePhotoUrl": "https://cdn.talkon.app/photos/user-456.jpg",
    "isOnline": false,
    "lastSeen": "2024-02-09T09:00:00Z"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:31:00Z",
    "requestId": "req-125"
  }
}
```

**Note:** Phone number is hidden if user has enabled `hidePhoneNumber` setting.

## Device Endpoints

### List Devices

List all active devices for current user.

**Endpoint:** `GET /api/devices`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "device-uuid-123",
      "userId": "user-uuid-123",
      "deviceName": "iPhone 15",
      "deviceType": "MOBILE",
      "platform": "IOS",
      "platformVersion": "17.0",
      "appVersion": "1.0.0",
      "lastSeen": "2024-02-09T10:30:00Z",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-02-09T10:30:00Z"
    },
    {
      "id": "device-uuid-456",
      "userId": "user-uuid-123",
      "deviceName": "Chrome on Windows",
      "deviceType": "WEB",
      "platform": "WEB",
      "platformVersion": "120.0",
      "appVersion": "1.0.0",
      "lastSeen": "2024-02-08T15:00:00Z",
      "isActive": true,
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-02-08T15:00:00Z"
    }
  ],
  "metadata": {
    "timestamp": "2024-02-09T10:31:00Z",
    "requestId": "req-126"
  }
}
```

---

### Remove Device

Remove a device (logout from that device).

**Endpoint:** `DELETE /api/devices/:deviceId`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Device removed successfully"
  },
  "metadata": {
    "timestamp": "2024-02-09T10:32:00Z",
    "requestId": "req-127"
  }
}
```

## WebSocket Connection

### Connect

Connect to WebSocket for real-time messaging.

**Endpoint:** `ws://localhost:3002/ws` (or `wss://` for production)

**Connection Message:**
```json
{
  "type": "AUTH",
  "payload": {
    "token": "access-token-here",
    "deviceId": "device-uuid-123"
  }
}
```

**Auth Success Response:**
```json
{
  "type": "AUTH_SUCCESS",
  "payload": {
    "userId": "user-uuid-123",
    "connectionId": "conn-uuid-789"
  },
  "timestamp": "2024-02-09T10:30:00Z"
}
```

### Send Message

```json
{
  "type": "MESSAGE_NEW",
  "payload": {
    "conversationId": "conv-uuid-123",
    "type": "TEXT",
    "content": {
      "text": "Hello, how are you?"
    },
    "replyToId": "msg-uuid-456"
  },
  "id": "client-msg-id-123",
  "timestamp": "2024-02-09T10:30:00Z"
}
```

### Receive Message

```json
{
  "type": "MESSAGE_NEW",
  "payload": {
    "id": "msg-uuid-789",
    "conversationId": "conv-uuid-123",
    "senderId": "user-uuid-456",
    "type": "TEXT",
    "content": {
      "text": "I'm doing great, thanks!"
    },
    "status": "SENT",
    "timestamp": "2024-02-09T10:31:00Z",
    "sequenceNumber": 142
  },
  "timestamp": "2024-02-09T10:31:00Z"
}
```

### Typing Indicator

```json
{
  "type": "TYPING_START",
  "payload": {
    "conversationId": "conv-uuid-123",
    "userId": "user-uuid-456"
  },
  "timestamp": "2024-02-09T10:30:00Z"
}
```

### Read Receipt

```json
{
  "type": "MESSAGE_READ",
  "payload": {
    "messageId": "msg-uuid-789",
    "conversationId": "conv-uuid-123",
    "userId": "user-uuid-123"
  },
  "timestamp": "2024-02-09T10:31:00Z"
}
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| OTP Request | 5 per hour per phone |
| OTP Verification | 5 attempts per OTP |
| API Requests | 100 per minute per user |
| Message Send | 20 per minute per user |
| Media Upload | 10 per minute per user |

## Pagination

For list endpoints, use these query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `cursor` - Cursor for cursor-based pagination
- `sortBy` - Field to sort by
- `sortOrder` - `asc` or `desc`

Example:
```
GET /api/messages?conversationId=conv-123&page=1&limit=50&sortOrder=desc
```

## Webhooks

TalkON supports webhooks for integrations (future feature).

## SDKs

Official SDKs available:
- JavaScript/TypeScript
- Python
- Java
- Swift (iOS)
- Kotlin (Android)

## Support

- API Documentation: https://docs.talkon.app
- Status Page: https://status.talkon.app
- Support Email: api-support@talkon.app

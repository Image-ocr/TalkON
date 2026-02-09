# TalkON Deployment Guide

## Overview

This guide covers deploying TalkON to production environments using various methods.

## Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (for K8s deployment)
- Domain name with SSL certificate
- Cloud provider account (AWS, GCP, Azure, or DigitalOcean)
- PostgreSQL 16+
- MongoDB 7+
- Redis 7+
- MinIO or S3-compatible storage

## Environment Setup

### 1. Environment Variables

Create `.env` files for each service with production values:

**backend-auth/.env**
```bash
PORT=3001
NODE_ENV=production

DATABASE_URL=postgresql://user:pass@postgres-host:5432/talkon_prod
REDIS_URL=redis://redis-host:6379

JWT_SECRET=<generate-secure-random-string>
JWT_REFRESH_SECRET=<generate-different-secure-random-string>

TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_PHONE_NUMBER=<your-twilio-number>

LOG_LEVEL=info

CORS_ORIGIN=https://app.talkon.com
```

### 2. Generate Secrets

Use strong random strings for secrets:

```bash
# Generate JWT secrets
openssl rand -base64 64

# Generate database passwords
openssl rand -base64 32
```

## Deployment Methods

## Method 1: Docker Compose (Simple)

Best for: Small to medium deployments, single server

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/talkon.git
cd talkon
```

### Step 2: Configure Environment

```bash
cp packages/backend-auth/.env.example packages/backend-auth/.env
# Edit .env files with production values
```

### Step 3: Build Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### Step 4: Start Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Step 5: Run Migrations

```bash
docker-compose -f docker-compose.prod.yml exec auth-service npm run migrate
```

### Step 6: Verify

```bash
curl http://localhost:3001/health
```

## Method 2: Kubernetes (Scalable)

Best for: Large deployments, high availability

### Step 1: Create Namespace

```bash
kubectl create namespace talkon
```

### Step 2: Create Secrets

```bash
kubectl create secret generic talkon-secrets \
  --from-literal=jwt-secret='<your-jwt-secret>' \
  --from-literal=jwt-refresh-secret='<your-refresh-secret>' \
  --from-literal=database-url='<your-database-url>' \
  --from-literal=redis-url='<your-redis-url>' \
  --from-literal=twilio-sid='<your-twilio-sid>' \
  --from-literal=twilio-token='<your-twilio-token>' \
  -n talkon
```

### Step 3: Deploy PostgreSQL

```bash
kubectl apply -f infrastructure/kubernetes/postgres.yaml -n talkon
```

### Step 4: Deploy Redis

```bash
kubectl apply -f infrastructure/kubernetes/redis.yaml -n talkon
```

### Step 5: Deploy Services

```bash
kubectl apply -f infrastructure/kubernetes/auth-service.yaml -n talkon
kubectl apply -f infrastructure/kubernetes/messaging-service.yaml -n talkon
kubectl apply -f infrastructure/kubernetes/media-service.yaml -n talkon
```

### Step 6: Deploy Ingress

```bash
kubectl apply -f infrastructure/kubernetes/ingress.yaml -n talkon
```

### Step 7: Verify Deployment

```bash
kubectl get pods -n talkon
kubectl get services -n talkon
kubectl logs -f <pod-name> -n talkon
```

## Method 3: Cloud Providers

### AWS (Elastic Beanstalk + RDS + ElastiCache)

1. **Create RDS PostgreSQL instance**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier talkon-db \
     --db-instance-class db.t3.medium \
     --engine postgres \
     --master-username admin \
     --master-user-password <password> \
     --allocated-storage 100
   ```

2. **Create ElastiCache Redis cluster**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id talkon-redis \
     --cache-node-type cache.t3.micro \
     --engine redis \
     --num-cache-nodes 1
   ```

3. **Deploy to Elastic Beanstalk**
   ```bash
   eb init talkon --platform node.js-20 --region us-east-1
   eb create talkon-prod
   eb deploy
   ```

### Google Cloud Platform (GKE + Cloud SQL + Memorystore)

1. **Create GKE cluster**
   ```bash
   gcloud container clusters create talkon-cluster \
     --num-nodes=3 \
     --machine-type=n1-standard-2 \
     --zone=us-central1-a
   ```

2. **Create Cloud SQL instance**
   ```bash
   gcloud sql instances create talkon-db \
     --database-version=POSTGRES_16 \
     --tier=db-n1-standard-2 \
     --region=us-central1
   ```

3. **Deploy to GKE**
   ```bash
   kubectl apply -f infrastructure/kubernetes/ -n talkon
   ```

### DigitalOcean (App Platform + Managed Databases)

1. **Create Managed PostgreSQL**
   - Go to DigitalOcean Dashboard → Databases
   - Create PostgreSQL 16 cluster

2. **Create Managed Redis**
   - Go to DigitalOcean Dashboard → Databases
   - Create Redis 7 cluster

3. **Deploy via App Platform**
   - Connect GitHub repository
   - Configure build and environment variables
   - Deploy

## SSL/TLS Setup

### Using Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.talkon.com -d app.talkon.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Using Cloudflare

1. Add domain to Cloudflare
2. Set DNS records:
   - `A` record: `api.talkon.com` → Server IP
   - `A` record: `app.talkon.com` → Server IP
3. Enable SSL/TLS (Full mode)
4. Enable HTTP/3, Brotli compression

## NGINX Configuration

```nginx
upstream auth_backend {
    server 127.0.0.1:3001;
}

upstream messaging_backend {
    server 127.0.0.1:3002;
}

server {
    listen 80;
    server_name api.talkon.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.talkon.com;

    ssl_certificate /etc/letsencrypt/live/api.talkon.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.talkon.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    location /api/auth {
        proxy_pass http://auth_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws {
        proxy_pass http://messaging_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }
}
```

## Database Migrations

Run migrations before deploying new versions:

```bash
# Local
npm run migrate --workspace=packages/backend-auth

# Docker
docker-compose exec auth-service npm run migrate

# Kubernetes
kubectl exec -it <auth-pod-name> -n talkon -- npm run migrate
```

## Monitoring Setup

### Prometheus + Grafana

1. **Install Prometheus**
   ```bash
   kubectl apply -f infrastructure/kubernetes/prometheus.yaml
   ```

2. **Install Grafana**
   ```bash
   kubectl apply -f infrastructure/kubernetes/grafana.yaml
   ```

3. **Access Grafana**
   ```bash
   kubectl port-forward -n talkon svc/grafana 3000:3000
   ```
   Visit http://localhost:3000 (admin/admin)

### Application Monitoring

- Install New Relic or Datadog agent
- Configure APM for Node.js services
- Set up custom dashboards
- Configure alerts

## Backup Strategy

### Database Backups

**PostgreSQL**
```bash
# Daily backup script
pg_dump -h $DB_HOST -U $DB_USER -d talkon_prod > backup_$(date +%Y%m%d).sql

# Restore
psql -h $DB_HOST -U $DB_USER -d talkon_prod < backup_20240209.sql
```

**MongoDB**
```bash
# Backup
mongodump --uri="mongodb://user:pass@host:27017/talkon_prod" --out=/backups

# Restore
mongorestore --uri="mongodb://user:pass@host:27017/talkon_prod" /backups/talkon_prod
```

### Automated Backups

- Set up daily automated backups
- Store backups in S3 or Cloud Storage
- Implement retention policy (30 days)
- Test restore procedure monthly

## Scaling Strategy

### Horizontal Scaling

```bash
# Scale auth service
kubectl scale deployment auth-service --replicas=5 -n talkon

# Scale messaging service
kubectl scale deployment messaging-service --replicas=10 -n talkon
```

### Database Scaling

- Read replicas for read-heavy queries
- Connection pooling (PgBouncer)
- Query optimization
- Indexing strategy

### Caching Strategy

- Redis for session data
- CDN for static assets
- Application-level caching
- Database query result caching

## Health Checks

All services expose health check endpoints:

```bash
curl https://api.talkon.com/api/auth/health
curl https://api.talkon.com/api/messaging/health
```

Set up uptime monitoring with:
- UptimeRobot
- Pingdom
- StatusCake

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs -f auth-service
kubectl logs -f <pod-name> -n talkon

# Check environment variables
docker-compose exec auth-service env
kubectl exec <pod-name> -n talkon -- env

# Verify database connection
docker-compose exec auth-service npm run db:test
```

### High Memory Usage

```bash
# Check memory usage
docker stats
kubectl top pods -n talkon

# Increase memory limits
# Edit kubernetes deployment yaml
```

### Database Connection Issues

```bash
# Test connection
psql -h <host> -U <user> -d <database>

# Check connection pool
# Review logs for connection errors
```

## Security Checklist

- [ ] Strong secrets for JWT, database, Redis
- [ ] SSL/TLS enabled for all endpoints
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] Database access restricted to app servers
- [ ] Environment variables secured
- [ ] Regular security updates
- [ ] Backup encryption enabled
- [ ] Audit logging enabled
- [ ] DDoS protection configured

## Performance Optimization

- Enable Gzip/Brotli compression
- Use CDN for static assets
- Implement caching strategy
- Optimize database queries
- Use connection pooling
- Enable HTTP/2 or HTTP/3
- Minimize bundle sizes
- Lazy load resources

## Cost Optimization

- Use auto-scaling policies
- Implement spot instances (AWS)
- Use reserved instances for predictable workloads
- Optimize storage with lifecycle policies
- Use CDN to reduce bandwidth
- Monitor and optimize database queries
- Clean up unused resources regularly

## Support

For deployment assistance:
- Email: ops@talkon.app
- Documentation: https://docs.talkon.app/deployment
- Community: https://discord.gg/talkon

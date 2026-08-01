# InternFlow — Production Deployment Guide

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Database Setup (PostgreSQL)](#3-database-setup)
4. [Authentication Setup (Google OAuth)](#4-authentication-setup)
5. [Email Setup (Resend)](#5-email-setup)
6. [File Storage Setup](#6-file-storage-setup)
7. [Build & Deploy](#7-build--deploy)
8. [Security Hardening](#8-security-hardening)
9. [Monitoring & Logging](#9-monitoring--logging)
10. [Backup Strategy](#10-backup-strategy)
11. [Production Launch Checklist](#11-production-launch-checklist)
12. [Rollback Procedure](#12-rollback-procedure)

---

## 1. Prerequisites

| Requirement | Minimum Version | Notes |
|---|---|---|
| Node.js | 20.x or 22.x | LTS recommended |
| PostgreSQL | 14+ | With `uuid-ossp` extension |
| npm | 9+ | Comes with Node.js |
| Git | 2.x | For version control |
| Domain | — | For production HTTPS |

### Server Recommendations
- **CPU**: 2+ vCPUs
- **RAM**: 4 GB minimum (8 GB recommended)
- **Disk**: 20 GB SSD minimum
- **OS**: Ubuntu 22.04 LTS (recommended)

---

## 2. Environment Setup

### 2.1 Clone & Install

```bash
git clone <your-repo-url> internflow
cd internflow
npm install
```

### 2.2 Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your production values:

```env
# ─── Required ───────────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/internflow"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://your-domain.com"
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-your-google-secret"

# ─── Email (Resend) ─────────────────────────────────
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="noreply@your-domain.com"

# ─── Storage ────────────────────────────────────────
STORAGE_PROVIDER="local"        # or "s3"
STORAGE_LOCAL_PATH="./uploads"

# ─── Security ───────────────────────────────────────
RATE_LIMIT_MAX="200"
RATE_LIMIT_WINDOW_SEC="60"
```

### 2.3 Generate NEXTAUTH_SECRET

```bash
# Linux/macOS
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

## 3. Database Setup

### 3.1 Create PostgreSQL Database

```sql
-- Connect as superuser
CREATE DATABASE internflow;
CREATE USER internflow_user WITH PASSWORD 'strong-password-here';
GRANT ALL PRIVILEGES ON DATABASE internflow TO internflow_user;
ALTER DATABASE internflow OWNER TO internflow_user;

-- Connect to internflow database and grant schema permissions
\c internflow
GRANT ALL ON SCHEMA public TO internflow_user;
```

### 3.2 Run Migrations

```bash
# Generate and apply migrations
npx prisma migrate dev --name init

# For production (CI/CD):
npx prisma migrate deploy
```

### 3.3 Seed the Database

```bash
npm run db:seed
```

This creates:
- 10 departments
- 20 colleges
- 1 admin user (`admin@internflow.com` / `password123`)
- 5 recruiter accounts
- 1 viewer account
- 100 sample candidates
- Default settings

### 3.4 Verify Database

```bash
npx prisma studio
# Opens http://localhost:5555 — visual DB browser
```

---

## 4. Authentication Setup

### 4.1 Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Configure:
   - **Application type**: Web application
   - **Name**: InternFlow
   - **Authorized redirect URIs**:
     - `https://your-domain.com/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (for dev)
6. Copy **Client ID** and **Client Secret** to `.env.local`

### 4.2 Test Authentication

1. Visit `https://your-domain.com/login`
2. Click **Continue with Google**
3. Verify you're redirected to dashboard
4. Test credential login with `admin@internflow.com` / `password123`

### 4.3 Role-Based Access

| Role | Permissions |
|---|---|
| `ADMIN` | Full access — all features, all candidates, settings, team management |
| `RECRUITER` | Manage candidates, pipeline, assessments, interviews, offers, emails |
| `VIEWER` | Read-only access to dashboard, reports, candidate profiles |

---

## 5. Email Setup

### 5.1 Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key from **Settings → API Keys**
4. Set `RESEND_API_KEY` in `.env.local`

### 5.2 Test Email

```bash
# From project root, test via Node
node -e "
const { EmailService } = require('./src/lib/email-service');
EmailService.send({
  to: 'admin@your-domain.com',
  subject: 'Deployment Test',
  html: '<h1>InternFlow email working!</h1>'
}).then(console.log);
"
```

### 5.3 Email Templates

The system includes pre-built templates for:
- Account verification
- Password reset
- Interview invitations
- Offer letters

Customize templates in [`src/lib/email-service.ts`](src/lib/email-service.ts) → `EmailTemplates`.

---

## 6. File Storage Setup

### 6.1 Local Storage (Default)

Files stored in `./uploads/` directory. No additional configuration needed.

Ensure the uploads directory is writable:

```bash
mkdir -p uploads
chmod 755 uploads
```

### 6.2 S3 Storage (AWS / MinIO / Cloudflare R2)

1. Install S3 SDK:
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

2. Set environment variables:
```env
STORAGE_PROVIDER="s3"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIAXXXXXXXX"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxx"
AWS_S3_BUCKET="internflow-uploads"
```

3. Configure CORS on your S3 bucket for direct uploads if needed.

---

## 7. Build & Deploy

### 7.1 Production Build

```bash
npm run build
```

This generates optimized Next.js output in `.next/`.

Verify build output:
```bash
# Should show all routes compiled with ✓
npm run build 2>&1 | grep "✓ Compiled"
```

### 7.2 Start Production Server

```bash
npm start
# Starts on http://localhost:3000
```

### 7.3 Deploy to VPS (Ubuntu)

```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start npm --name "internflow" -- start
pm2 save
pm2 startup

# Verify
pm2 status
pm2 logs internflow
```

### 7.4 Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/internflow
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    client_max_body_size 50M;  # For file uploads

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Enable site and SSL
sudo ln -s /etc/nginx/sites-available/internflow /etc/nginx/sites-enabled/
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

### 7.5 Deploy to Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
```

Set environment variables in Vercel Dashboard → Settings → Environment Variables.

### 7.6 Deploy to Railway / Render / Fly.io

Each platform provides PostgreSQL + Node.js hosting:

1. Push code to GitHub
2. Connect repository in platform dashboard
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`
6. Platform auto-provisions PostgreSQL — update `DATABASE_URL`

---

## 8. Security Hardening

### 8.1 In-Place Protections

These are already implemented:
- ✅ Rate limiting (middleware — 100 req/min default)
- ✅ CSRF via NextAuth.js built-in CSRF tokens
- ✅ XSS prevention (input sanitization in [`src/lib/security.ts`](src/lib/security.ts))
- ✅ SQL injection prevention (Prisma parameterized queries)
- ✅ Secure HTTP headers (middleware sets X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ Session management (JWT, 30-day max age)
- ✅ Role-based access control (middleware + ProtectedRoute + server-side helpers)

### 8.2 Additional Steps

```bash
# 1. Set file permissions
chmod 600 .env.local
chmod 700 uploads/

# 2. Enable PostgreSQL SSL
# In DATABASE_URL, add: ?sslmode=require

# 3. Enable firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# 4. Regular npm audit
npm audit
npm audit fix

# 5. Set up fail2ban for SSH protection
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

---

## 9. Monitoring & Logging

### 9.1 Application Logs

```bash
# PM2 logs
pm2 logs internflow --lines 100

# Systemd service logs (if using systemd)
journalctl -u internflow -f
```

### 9.2 Error Tracking (Sentry)

1. Sign up at [sentry.io](https://sentry.io)
2. Create Next.js project
3. Add to `.env.local`:
```env
SENTRY_DSN="https://xxx@sentry.io/xxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxx@sentry.io/xxx"
```

### 9.3 Database Monitoring

```bash
# PostgreSQL activity
psql -d internflow -c "SELECT * FROM pg_stat_activity;"

# Prisma query logging (enable in src/lib/prisma.ts)
# log: ['query', 'info', 'warn', 'error']
```

### 9.4 Health Check Endpoint

Create a health check at `/api/health`:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "healthy", timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ status: "unhealthy" }, { status: 503 });
  }
}
```

---

## 10. Backup Strategy

### 10.1 Database Backups

```bash
# Daily automated backup script
#!/bin/bash
# Save as: /usr/local/bin/internflow-backup.sh
BACKUP_DIR="/var/backups/internflow"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

# Dump database
pg_dump internflow > "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Compress
gzip "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Keep last 30 days
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +30 -delete

echo "Backup complete: db_$TIMESTAMP.sql.gz"
```

```bash
# Schedule via cron (daily at 2 AM)
chmod +x /usr/local/bin/internflow-backup.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/internflow-backup.sh") | crontab -
```

### 10.2 File Backups

```bash
# Backup uploads directory
rsync -avz ./uploads/ /var/backups/internflow/uploads/
```

### 10.3 Restore Procedure

```bash
# 1. Stop application
pm2 stop internflow

# 2. Restore database
gunzip -c /var/backups/internflow/db_20260101_020000.sql.gz | psql internflow

# 3. Restore uploads
rsync -avz /var/backups/internflow/uploads/ ./uploads/

# 4. Start application
pm2 start internflow
```

---

## 11. Production Launch Checklist

### Pre-Launch

- [ ] All environment variables configured in `.env.local`
- [ ] PostgreSQL database created and migrated
- [ ] Database seeded with initial data
- [ ] Google OAuth credentials configured
- [ ] `NEXTAUTH_SECRET` is strong (32+ chars)
- [ ] Email provider (Resend) configured and tested
- [ ] Storage provider configured (local or S3)
- [ ] `npm run build` succeeds with zero errors
- [ ] All 22 routes respond with 200 or proper redirects
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Firewall configured (ports 80, 443 open; 3000 internal only)
- [ ] Database backups scheduled
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] File upload directory exists and is writable

### Post-Launch Verification

- [ ] Login page loads at `https://your-domain.com/login`
- [ ] Google OAuth sign-in works
- [ ] Credential sign-in works with seed accounts
- [ ] Dashboard loads with stats
- [ ] Candidate list loads with data
- [ ] Pipeline Kanban board works
- [ ] File upload works
- [ ] Email sending works (test interview invite)
- [ ] Mobile responsive layout verified
- [ ] 404 page works for unknown routes
- [ ] Rate limiting blocks excessive requests
- [ ] Logout works and redirects to login

### Seed Credentials (change passwords immediately!)

| Role | Email | Password |
|---|---|---|
| Admin | admin@internflow.com | password123 |
| Recruiter | priya@internflow.com | password123 |
| Recruiter | rahul@internflow.com | password123 |
| Viewer | viewer@internflow.com | password123 |

---

## 12. Rollback Procedure

### If deployment fails:

```bash
# 1. Stop current instance
pm2 stop internflow

# 2. Revert to previous commit
git log --oneline -5
git revert <bad-commit-hash>
# OR
git reset --hard <last-good-commit-hash>

# 3. Rebuild
npm install
npx prisma generate
npm run build

# 4. Restart
pm2 start internflow
pm2 logs internflow
```

### If database migration fails:

```bash
# Revert last migration
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-migrations prisma/migrations \
  --shadow-database-url "$DATABASE_URL"

# Restore from backup (if needed)
gunzip -c /var/backups/internflow/db_latest.sql.gz | psql internflow
```

---

## Support & Resources

- **NextAuth.js docs**: https://authjs.dev
- **Prisma docs**: https://www.prisma.io/docs
- **Resend docs**: https://resend.com/docs
- **Next.js docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Project Structure Reference

```
internflow/
├── prisma/                    # Database schema + migrations + seed
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/                   # Next.js App Router (22 routes)
│   │   ├── api/auth/          # NextAuth.js API handler
│   │   ├── login/             # Auth pages
│   │   ├── dashboard/         # Dashboard
│   │   ├── candidates/        # Candidate management
│   │   ├── pipeline/          # Kanban pipeline
│   │   └── ...                # 15+ feature routes
│   ├── lib/
│   │   ├── auth.config.ts     # NextAuth.js configuration
│   │   ├── auth-helpers.ts    # Server-side auth utilities
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── db-service.ts      # Database CRUD operations
│   │   ├── storage.ts         # File storage service
│   │   ├── email-service.ts   # Email service (Resend + SMTP)
│   │   ├── security.ts        # Security utilities
│   │   └── env-validate.ts    # Environment validation
│   ├── services/
│   │   ├── ai/                # 11 AI services
│   │   └── api/               # 10 API services
│   ├── features/              # Feature modules (18)
│   └── components/            # Shared UI components
├── middleware.ts              # Auth middleware + rate limiting + security headers
├── .env.example               # Environment template
└── DEPLOYMENT.md              # This file
```

---

**Last Updated**: August 2026  
**InternFlow Version**: 1.0.0 (Production)

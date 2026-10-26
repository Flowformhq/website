---
title: "Self-Hosting FlowForm in 5 Minutes: Docker Compose, SQLite, and Traefik on a $5 VPS"
description: "The definitive developer guide to deploying FlowForm on any Ubuntu/Debian VPS using Docker Compose, SQLite, and Traefik reverse proxy with automatic SSL."
publishDate: "2026-10-26"
author: "FlowForm Engineering Team"
category: "DevOps & Deployment"
tags: ["Self-Hosted", "Docker Compose", "Traefik", "VPS Deployment", "SQLite", "Open Source"]
canonicalUrl: "https://flowformhq.com/blog/self-hosting-flowform-docker-traefik-guide"
---

## How do you self-host FlowForm on a VPS?

To self-host FlowForm on a VPS, provision a minimal Ubuntu server (1 vCPU, 1 GB RAM), install Docker and Docker Compose, define an environment configuration with an application key, and launch the pre-built `flowformhq/flowform:latest` container using an embedded SQLite database. Traefik or Nginx terminates TLS with automated Let's Encrypt certificates.

---

## Why Self-Hosting FlowForm is So Simple

Many self-hosted open-source enterprise tools require complex orchestration stacks: separate Redis clusters, Celery workers, Elasticsearch instances, and external Postgres servers that consume 4GB+ of RAM before handling a single request.

FlowForm was intentionally engineered to run comfortably on a **$5/month cloud VPS** (Hetzner, DigitalOcean, Linode, or AWS Lightsail) using:
- **PHP 8.4 + Laravel 13 Runtime:** High-efficiency, low-memory footprint.
- **Embedded SQLite Database:** Stored in a single file inside an encrypted Docker volume. Zero database management overhead.
- **Filament 5 Admin Dashboard:** Pre-compiled administrative UI accessible immediately at `/admin`.

---

## 5-Minute Setup Walkthrough

### Step 1: Create a Project Directory on Your VPS

Connect to your VPS via SSH and create a directory for FlowForm:

```bash
mkdir -p /opt/flowform && cd /opt/flowform
```

---

### Step 2: Create Your `docker-compose.yml`

Create a `docker-compose.yml` file configuring the FlowForm engine and persistent volume:

```yaml
version: '3.8'

services:
  engine:
    image: flowformhq/flowform:latest
    container_name: flowform-engine
    restart: unless-stopped
    ports:
      - "8000:80"
    environment:
      - APP_NAME=FlowForm
      - APP_ENV=production
      - APP_DEBUG=false
      - APP_URL=https://forms.yourdomain.com
      - DB_CONNECTION=sqlite
      - DB_DATABASE=/var/www/html/database/database.sqlite
      - SESSION_DRIVER=file
      - QUEUE_CONNECTION=sync
    volumes:
      - flowform-data:/var/www/html/database
      - flowform-storage:/var/www/html/storage

volumes:
  flowform-data:
  flowform-storage:
```

---

### Step 3: Initialize Database and Application Key

Boot the container and run initial setup commands:

```bash
# 1. Start FlowForm in background
docker compose up -d

# 2. Generate application encryption key
docker compose exec engine php artisan key:generate --force

# 3. Run database migrations (creates SQLite tables automatically)
docker compose exec engine php artisan migrate --force

# 4. Cache production configurations for maximum speed
docker compose exec engine php artisan config:cache
docker compose exec engine php artisan route:cache
docker compose exec engine php artisan view:cache
```

---

### Step 4: Create Your First Admin User

To access the Filament 5 admin dashboard, create an administrator account using `tinker`:

```bash
docker compose exec engine php artisan tinker --execute="
App\Models\User::firstOrCreate(
    ['email' => 'admin@yourdomain.com'],
    ['name' => 'Admin', 'password' => bcrypt('your_secure_password_here')]
);
"
```

You can now log into your admin dashboard at `http://your-vps-ip:8000/admin`.

---

### Step 5: Route Through Traefik / Nginx with HTTPS

In production, terminate HTTPS using Traefik or Dokploy. 

Example Traefik dynamic router configuration (`/etc/traefik/dynamic/flowform.yml`):

```yaml
http:
  routers:
    flowform-router:
      rule: "Host(`forms.yourdomain.com`)"
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt
      service: flowform-service

  services:
    flowform-service:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:8000"
```

Once DNS points `forms.yourdomain.com` to your VPS IP, Traefik automatically provisions a free Let's Encrypt SSL certificate.

---

## Verifying Endpoints

Test that your instance is operational:

```bash
# Health check / Form Discovery API
curl -s https://forms.yourdomain.com/api/v1/forms

# Test Mode 1 Headless HTML Endpoint
curl -X POST https://forms.yourdomain.com/api/v1/f/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@company.com","message":"Hello FlowForm!"}'
```

You will receive an HTTP 200 response with a submission UUID.

---

## Conclusion

Self-hosting enterprise-grade form infrastructure does not require complex DevOps pipelines or expensive cloud services.

With **FlowForm, Docker, and SQLite**, you can deploy a secure, sovereign form engine with unlimited submissions on any $5 VPS in less than 5 minutes.

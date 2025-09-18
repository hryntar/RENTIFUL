# Rentiful - Docker Deployment Guide

This project is fully containerized with Docker, including the database, backend server, and frontend client.

## Quick Start

### Production Deployment
```bash
# Build and start all services
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Development Mode (with hot reload)
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

## Services

### Production Services
- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Express.js)**: http://localhost:3001
- **PostgreSQL Database**: localhost:5432
- **pgAdmin**: http://localhost:5050

### Development Services
- **Frontend (Next.js)**: http://localhost:3000 (with hot reload)
- **Backend (Express.js)**: http://localhost:3001 (with hot reload)
- **PostgreSQL Database**: localhost:5432
- **pgAdmin**: http://localhost:5050

## Database Management

### Initial Setup
```bash
# Start only the database
docker-compose up postgres -d

# Run migrations (from host machine)
cd server
npm run prisma:generate
npx prisma migrate deploy

# Seed database
npm run seed
```

### Database Access
- **Connection String**: `postgresql://postgres:admin@localhost:5432/Rentiful`
- **pgAdmin**: http://localhost:5050 (admin@rentiful.com / admin)

## Useful Commands

### Production
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose up --build server -d

# View logs for specific service
docker-compose logs -f client

# Scale services (if needed)
docker-compose up --scale client=2 -d
```

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild and restart
docker-compose -f docker-compose.dev.yml up --build -d
```

### Database Operations
```bash
# Connect to database directly
docker exec -it rentiful-postgres psql -U postgres -d Rentiful

# Backup database
docker exec rentiful-postgres pg_dump -U postgres Rentiful > backup.sql

# Restore database
docker exec -i rentiful-postgres psql -U postgres -d Rentiful < backup.sql

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

### Container Management
```bash
# View container logs
docker logs rentiful-client -f
docker logs rentiful-server -f
docker logs rentiful-postgres -f

# Execute commands in containers
docker exec -it rentiful-server npm run seed
docker exec -it rentiful-client npm run lint

# Check container resources
docker stats

# Prune unused resources
docker system prune -a
```

## Environment Variables

### Server (.env)
```properties
PORT=3001
DATABASE_URL="postgresql://postgres:admin@postgres:5432/Rentiful?schema=public"
NODE_ENV=production
```

### Client Environment
```properties
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Change ports in docker-compose.yml
   ports:
     - "3001:3001"  # Change first number
   ```

2. **Build failures**
   ```bash
   # Clean build
   docker-compose down
   docker system prune -a
   docker-compose up --build
   ```

3. **Database connection issues**
   ```bash
   # Check database health
   docker exec rentiful-postgres pg_isready -U postgres
   
   # Check logs
   docker logs rentiful-postgres
   ```

## Production Considerations

1. **Use docker-compose.override.yml** for environment-specific configs
2. **Implement proper logging** with log drivers
3. **Use secrets management** for sensitive data
4. **Set up monitoring** with health checks
5. **Configure reverse proxy** (nginx) for production
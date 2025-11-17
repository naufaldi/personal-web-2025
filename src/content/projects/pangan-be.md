---
title: "Pangan Indonesia – Food Price Data API & Cache System"
slug: "pangan-be"
description: "A high-performance FastAPI backend for Indonesian food price data with efficient data ingestion pipeline, PostgreSQL caching layer, and clean architecture. Built to process and serve structured commodity price data at scale."
image: "https://res.cloudinary.com/cynux/image/upload/v1762849053/portfolio-2025/portfolio/pangan.png"
liveUrl: "https://api.pangan.id"
githubUrl: "https://github.com/naufaldi/pangan-be"
techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Alembic", "APScheduler", "Docker", "Caddy"]
date: "2025-01-17"
---

## Overview

**Pangan** is a backend system for aggregating, caching, and serving Indonesian food price data from government sources. The system fetches commodity price data from official APIs, validates and normalizes it, stores it efficiently in PostgreSQL, and exposes a high-performance REST API with advanced filtering and pagination capabilities.

The project demonstrates clean architecture principles, robust data pipeline design, and production-grade operational setup for data-intensive applications.

## Project Objectives

The system aims to:

- **Centralize Price Data**: Cache government food price data in a queryable database
- **Enable Analysis**: Provide APIs for researchers, businesses, and policymakers to analyze price trends
- **Ensure Performance**: Serve millions of price records with sub-150ms response times
- **Maintain Data Quality**: Validate, normalize, and deduplicate incoming data
- **Support Automation**: Schedule regular data ingestion and updates

## Tech Stack

### Backend Framework
- **FastAPI**: Modern, fast Python web framework with async support
- **Python 3.12**: Latest Python with improved performance
- **Uvicorn**: ASGI server with uvloop and httptools for production performance
- **Pydantic**: Type-safe data validation and serialization

### Data & Storage
- **PostgreSQL 16**: Relational database for structured price data
- **SQLAlchemy 2.0**: ORM with async support for database operations
- **Alembic**: Database migration management and versioning

### Data Processing
- **APScheduler**: Task scheduling for periodic data ingestion
- **HTTPX**: Async HTTP client for external API integration
- **Python JSON Logger**: Structured logging for observability

### Infrastructure
- **Docker**: Containerization for consistent deployments
- **Caddy**: Reverse proxy with automatic HTTPS
- **Compose**: Multi-container orchestration

### Development & Quality
- **Ruff**: Fast Python linter
- **Pytest**: Comprehensive testing framework
- **Pytest-asyncio**: Async test support

## Architecture Highlights

### Clean Architecture Layers

The project implements 5-layer clean architecture:

1. **Presentation Layer** (FastAPI routes)
   - HTTP endpoints with request/response handling
   - Parameter validation with Pydantic
   - Error handling and proper status codes

2. **Application Layer** (Use cases)
   - Business logic orchestration
   - Data transformation
   - Query building and filtering

3. **Domain Layer** (Entities)
   - Core business objects (Price, Commodity, Province)
   - Domain logic and validation
   - Type-safe dataclasses

4. **Data Layer** (Repositories)
   - Database access abstraction
   - Query optimization
   - Transaction management

5. **Infrastructure Layer** (External services)
   - Database connections
   - HTTP clients
   - Logging and configuration

### Database Schema

Optimized for query performance with strategic indexing:

```sql
-- Core price data table with indexes
prices:
  - id, commodity_id, province_id, level_harga_id
  - period_start, period_end, price
  - unit, created_at, updated_at
  - Indexes: (level_harga_id, period_start DESC)
  - Indexes: (commodity_id, province_id, period_start)

-- Reference data
commodities:
  - id, name, unit
  
provinces:
  - id, name
```

### Data Ingestion Pipeline

Multi-stage processing:

1. **Fetch**: Retrieve data from government APIs with proper error handling
2. **Normalize**: Transform raw API data into structured format
3. **Validate**: Schema validation with Pydantic
4. **Deduplicate**: Checksum-based duplicate detection
5. **Upsert**: Efficient database insert/update operations
6. **Logging**: Structured JSON logs with performance metrics

## Core Features (Implemented)

### 1. REST API Endpoints

**Price Queries** (`GET /prices`)
- Filter by commodity_id, province_id, level_harga_id
- Date range filtering (period_start, period_end)
- Pagination with configurable limit (1-1000 items)
- Response time: <150ms typical, <80ms for indexed queries
- Proper HTTP status codes and error messages

**Data References** (`GET /commodities`, `GET /provinces`)
- List all available commodities with metadata
- List all provinces in the system
- Essential for understanding filtering options

**Health Checks** (`GET /health/healthz`, `GET /health/readyz`)
- Application health status
- Database connectivity verification
- Used by Docker health checks and load balancers

**API Documentation** (`GET /docs`, `GET /openapi.json`)
- Auto-generated Swagger UI
- OpenAPI specification for client generation
- Interactive endpoint testing

### 2. Data Ingestion Pipeline

**CLI Interface**
- Flexible command-line tool for manual data ingestion
- Mock mode for testing without API calls
- Real mode for live government API integration
- Support for full and incremental ingests

**Automated Scheduling** (Infrastructure ready)
- APScheduler configured for background tasks
- Lifespan context manager for startup/shutdown
- Ready for daily or weekly data refresh automation
- Structured JSON logging of pipeline operations

**Data Validation**
- Pydantic schemas for input validation
- Type-safe processing with Python 3.12
- Clear error messages for validation failures

**Performance Metrics** (Logged)
- Fetch duration, normalization duration
- Checksum and upsert processing times
- Row counts (normalized, inserted, updated, unchanged)
- Total pipeline execution time

### 3. Database Operations

**Connection Management**
- PostgreSQL connection pooling with configurable size
- Async SQLAlchemy ORM for non-blocking queries
- Proper connection cleanup and error handling
- Health checks for connection validation

**Transaction Management**
- ACID compliance for data consistency
- Proper rollback on errors
- Efficient batch operations for large datasets

**Migration Management** (Alembic)
- Version control for database schema
- Forward and backward compatibility
- Migration history tracking

### 4. Request/Response Handling

**Structured Responses**
- Consistent JSON response format
- `data` array with price records
- Metadata: `total`, `limit`, `offset`
- Proper pagination support

**Error Handling**
- Validation error responses (422)
- Not Found responses (404)
- Server error handling (500)
- Clear error messages

**CORS Configuration**
- Development mode: Allow all origins
- Production mode: Configurable origin whitelist
- Proper credential handling

### 5. Logging & Observability

**Structured Logging**
- JSON format for log aggregation
- Correlation IDs for request tracing
- Request/response logging middleware
- Pipeline operation metrics

**Log Levels**
- Configurable via environment variable
- Development (DEBUG) vs Production (INFO)

## Features NOT Yet Implemented

### Pending Features:
- **Admin CRUD API**: Create/update/delete operations for data management
- **Authentication & Authorization**: API key or JWT-based access control
- **Rate Limiting**: Request throttling and quota enforcement
- **Response Caching**: In-memory or Redis caching for frequent queries
- **Metrics & Monitoring**: Prometheus metrics, performance dashboards
- **Scheduled Ingestion**: Automatic daily/weekly data updates (infrastructure ready)
- **E2E Testing**: Comprehensive end-to-end test scenarios
- **Advanced Search**: Full-text search, fuzzy matching

## Technical Highlights

### Performance

- **Query Response Time**: <150ms typical for filtered queries
- **Database Indexing**: Strategic indexes on commodity_id, province_id, level_harga_id combinations
- **Connection Pooling**: Efficient PostgreSQL connection management
- **Async Operations**: Non-blocking I/O with FastAPI and async SQLAlchemy
- **Pagination Efficiency**: Handles large offsets gracefully

### Security (Current)

- **Input Validation**: Pydantic schemas validate all parameters
- **SQL Injection Prevention**: Parametrized SQLAlchemy queries (ORM protection)
- **CORS Configuration**: Environment-based origin control
- **Type Safety**: Full type hints with mypy compatibility
- **Error Handling**: Safe error messages without exposing internals

### Future Security Enhancements Needed:
- API key or JWT authentication
- Rate limiting middleware
- Request validation hardening
- Secrets management for credentials

### Data Quality

- **Checksum-based Deduplication**: Detects and prevents duplicate ingestion
- **Schema Validation**: Pydantic ensures all data meets requirements
- **Normalized Data**: Consistent units and formats
- **Audit Trail**: `created_at` and `updated_at` timestamps on all records
- **Integrity Constraints**: Database-level constraints for data consistency

### Developer Experience

- **Clean Code Architecture**: Separation of concerns with clear layer responsibilities
- **Type Safety**: Python 3.12 with comprehensive type hints
- **Async First**: Modern async/await patterns throughout
- **Comprehensive Tests**: 45 tests covering unit, integration, and performance scenarios
- **Local Development**: Simple setup with Docker PostgreSQL or SQLite fallback
- **API Documentation**: Auto-generated Swagger UI and OpenAPI spec
- **Migration System**: Alembic for schema version control
- **Structured Logging**: JSON logs for easy parsing and analysis

## Deployment Architecture

### Local Development
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Production Stack
- **Docker**: Multi-stage build for optimized image
- **PostgreSQL 16**: Production database with persistent volumes
- **Caddy**: Reverse proxy with automatic HTTPS
- **Health Checks**: Endpoint monitoring for container orchestration
- **Environment Configuration**: Flexible setup via environment variables

### Scaling Considerations
- Horizontal scaling ready (stateless API)
- Database connection pooling for high concurrency
- Read replicas for load distribution
- Pagination for memory-efficient data access

## Performance Characteristics

### API Response Times
- **Typical queries**: 20-50ms
- **Complex filtered queries**: 30-80ms
- **Pagination overhead**: Negligible (<5ms)
- **Database round-trip**: 10-40ms

### Data Ingestion Performance
- **Fetch phase**: ~500-1000ms per API call
- **Normalize phase**: ~100ms for 1000 records
- **Upsert phase**: ~500-800ms for batch insert/update
- **Total pipeline**: 1-3 seconds for complete cycle

### Resource Usage
- **Memory**: ~150-200MB baseline, scales with connection pool
- **CPU**: Low during idle, scales with concurrent requests
- **Disk**: ~500MB-1GB for historical price data (1M+ records)

## Code Quality & Testing

### Test Coverage
- **Unit Tests**: Business logic and utility functions
- **Integration Tests**: Database operations and API endpoints
- **Performance Tests**: Query response time validation
- **Data Pipeline Tests**: Ingestion flow verification

### Code Organization
- 29 Python files (~2,500 LOC)
- Clean separation of concerns
- Reusable components and utilities
- Comprehensive docstrings

### Quality Tools
- **Ruff**: Fast linting and code style enforcement
- **Type Checking**: Pydantic runtime validation + mypy compatible
- **Testing**: Pytest with async support

## API Usage

### Basic Query
```bash
curl "https://api.pangan.id/prices?level_harga_id=3&limit=50"
```

### Advanced Filtering
```bash
curl "https://api.pangan.id/prices?level_harga_id=3&commodity_id=01&province_id=35&period_start=2024-01-01&period_end=2024-12-31"
```

### Complete Documentation
See `API_USAGE.md` for comprehensive examples, SDKs (Python/JavaScript), and best practices.

## Production Readiness

### Currently Ready for Production:
- ✅ Read-only API endpoints
- ✅ Database schema and optimization
- ✅ Docker containerization
- ✅ Health checks and monitoring endpoints
- ✅ Error handling and logging
- ✅ CORS configuration
- ✅ API documentation

### Requires Before Production:
- ⚠️ Rate limiting implementation
- ⚠️ Authentication/authorization setup
- ⚠️ Request caching strategy
- ⚠️ Monitoring dashboard setup
- ⚠️ Automated data ingestion scheduling
- ⚠️ Backup and disaster recovery procedures

## Project Status

### Phase 2: Data Ingestion Pipeline - 95% Complete ✅
- Core API endpoints: 100%
- Database schema and operations: 100%
- Data ingestion pipeline: 100%
- Testing infrastructure: 100%
- Scheduled ingestion: Infrastructure ready, scheduling logic pending

### Phase 3: Production Hardening - Not Started
- Admin API endpoints
- Authentication & authorization
- Rate limiting
- Advanced caching
- Metrics collection
- E2E testing

### Overall Project: ~75% Complete
Solid MVP for read-only data access with production-ready infrastructure. Ready for deployment with data ingestion running manually or via external scheduler.

## Live API

Access the API at **[https://api.pangan.id](https://api.pangan.id)**

Interactive documentation: **[https://api.pangan.id/docs](https://api.pangan.id/docs)**

## Repository

Source code available at **[https://github.com/naufaldi/pangan-be](https://github.com/naufaldi/pangan-be)**

## Lessons Learned

Building Pangan BE as a data-intensive backend provided valuable experience in:

### Architecture & Design:
- **Clean Architecture in Python**: Separation of concerns creates maintainable, testable code
- **Async-First Development**: Modern Python async patterns improve responsiveness
- **Database Design**: Strategic indexing is crucial for query performance at scale
- **Schema Validation**: Pydantic catches errors early, preventing bad data in the database

### Data Pipeline Development:
- **Idempotent Operations**: Checksums and upserts prevent duplicate data
- **Structured Logging**: JSON logs enable better debugging and monitoring
- **Graceful Degradation**: Proper error handling keeps system stable during API failures
- **Incremental Processing**: Batch operations are more efficient than row-by-row processing

### Deployment & Operations:
- **Infrastructure as Code**: Docker and compose files enable reproducible deployments
- **Health Checks**: Proper monitoring catches issues early
- **Connection Management**: Pooling is essential for database performance
- **Containerization**: Reduces "works on my machine" problems

### What Would Be Done Differently:
1. **Implement auth/rate limiting from the start** rather than adding later
2. **Add background task scheduling during initial setup** instead of infrastructure-only
3. **Build admin CRUD endpoints alongside read API** for operational flexibility
4. **Establish monitoring dashboard early** to catch performance issues immediately
5. **Document actual vs. planned features** clearly in README (as done with this analysis)

## Technical Decisions

### Why FastAPI over Django?
FastAPI provides modern async support, automatic OpenAPI documentation, and excellent performance for APIs without the overhead of a full framework.

### Why SQLAlchemy ORM vs. Raw SQL?
ORM protection against SQL injection, type-safe queries, and transaction management outweigh the minor performance overhead.

### Why PostgreSQL over SQLite?
PostgreSQL enables production features like connection pooling, proper concurrency handling, and horizontal scaling beyond SQLite's capabilities.

### Why Clean Architecture?
5-layer separation makes the codebase testable, maintainable, and allows swapping implementations (e.g., different databases) without affecting business logic.

### Why Structured JSON Logging?
JSON logs enable log aggregation tools and automated alerting rather than parsing unstructured text.

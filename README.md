# GameHub — Django to MEVN & Ionic Architecture Migration

[![Django](https://img.shields.io/badge/Original%20Backend-Django%205-092E20?style=for-the-badge&logo=django&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Express](https://img.shields.io/badge/API-Express-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![Vue](https://img.shields.io/badge/Frontend-Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Ionic](https://img.shields.io/badge/Mobile-Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)](#)
[![Capacitor](https://img.shields.io/badge/Native-Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Deployment-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)

<p align="center">
  <img
    width="100%"
    alt="GameHub platform"
    src="https://github.com/user-attachments/assets/d0b901da-914f-4c04-8a72-3fc40df754aa"
  />
</p>

A full-stack architecture migration project that evolves a **Django 5 monolithic web application** into a decoupled **MEVN stack** and a cross-platform **Ionic/Capacitor mobile application**.

The platform, named **GameHub**, provides a digital ecosystem for a video game, including:

- Development blog and devlog content.
- User registration and authentication.
- Social posts and comments.
- Product catalog and virtual items.
- Shopping cart and order management.
- REST API access.
- Vue-based web frontend.
- Ionic mobile client.
- Docker-based development environments.

This repository contains both the original Django implementation and the migrated architecture.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Goals](#project-goals)
- [Architecture Evolution](#architecture-evolution)
- [Repository Structure](#repository-structure)
- [TV1 — Django Monolith](#tv1--django-monolith)
- [TV2 — MEVN Stack](#tv2--mevn-stack)
- [Ionic Mobile Application](#ionic-mobile-application)
- [Main Features](#main-features)
- [API Endpoints](#api-endpoints)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Running the Django Version](#running-the-django-version)
- [Running the MEVN Version](#running-the-mevn-version)
- [Running the Ionic Application](#running-the-ionic-application)
- [Android Emulator Configuration](#android-emulator-configuration)
- [Web Development Configuration](#web-development-configuration)
- [Data Management](#data-management)
- [Technology Stack](#technology-stack)
- [Migration Benefits](#migration-benefits)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Academic Context](#academic-context)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Project Overview

GameHub is a platform designed for a video game community and development ecosystem.

The original application was implemented as a Django monolith. The second version separates the backend and frontend into independent services using:

- MongoDB for data persistence.
- Express for the REST API.
- Vue 3 for the web frontend.
- Node.js for the backend runtime.
- Ionic and Capacitor for the mobile client.
- Docker for containerized deployment.

The project also includes a mobile application capable of consuming both backend implementations:

- The MEVN API for authentication, post listing, and post creation.
- The Django API for read-only post access.

---

## Project Goals

The main objective of this project is to study the migration from a traditional monolithic architecture to a modern, decoupled full-stack architecture.

The project demonstrates:

- How a Django monolith can expose REST endpoints.
- How application responsibilities can be separated into frontend and backend services.
- How MongoDB can replace relational persistence for selected features.
- How Vue 3 can consume REST APIs.
- How a mobile application can reuse the same backend services.
- How Docker can simplify development and deployment.
- How two architecture versions can coexist during a migration.

---

## Architecture Evolution

### Original Architecture — TV1

```text
┌─────────────────────────────┐
│       Django 5 Monolith     │
│                             │
│  - Templates                │
│  - Authentication           │
│  - Devlog                   │
│  - Social posts             │
│  - Shop                     │
│  - Cart                     │
│  - Orders                   │
│  - REST API                 │
└──────────────┬──────────────┘
               │
               ▼
        SQLite / Django ORM
```

### Migrated Architecture — TV2

```text
┌─────────────────────────────┐
│       Vue 3 Frontend        │
│        SPA Application       │
└──────────────┬──────────────┘
               │
               │ HTTP / REST
               │
┌──────────────▼──────────────┐
│    Express + Node Backend    │
│                             │
│  - Authentication           │
│  - Posts                    │
│  - Comments                 │
│  - Health check             │
└──────────────┬──────────────┘
               │
               ▼
          MongoDB
```

### Mobile Architecture

```text
┌─────────────────────────────┐
│       Ionic + Vue App       │
│      Capacitor Mobile       │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│ MEVN API    │  │ Django API  │
│ Read/Write  │  │ Read-only   │
└─────────────┘  └─────────────┘
```

---

## Repository Structure

```text
.
├── ATA_TV2_TorronteraRuizEric_PauSantosVillalba.pdf
├── README.md
├── README - IONIC.txt
├── README - MEVN.txt
│
├── TV1_gamehub - Django/
│   ├── .env.example
│   ├── ATA_TV1_V2.pdf
│   ├── Dockerfile
│   ├── Llegiume.txt
│   ├── account/
│   ├── api/
│   ├── cart/
│   ├── db.sqlite3
│   ├── devlog/
│   ├── do.sh
│   ├── docker-compose.yml
│   ├── gamehub/
│   ├── manage.py
│   ├── media/
│   ├── orders/
│   ├── requirements.txt
│   ├── shop/
│   ├── social/
│   └── templates/
│
├── TV2_gamehub - MEVN/
│   ├── backend/
│   ├── deploy/
│   └── frontend/
│
└── TV2_gamehub - IonicMobile/
    ├── .env.example
    ├── android/
    ├── capacitor.config.ts
    ├── dist/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── src/
    └── vite.config.js
```

---

# TV1 — Django Monolith

The first version of GameHub is implemented as a Django 5 monolithic web application.

All the main features are contained within the same project:

- User accounts.
- User profiles.
- Social posts.
- Comments.
- Development blog.
- Product shop.
- Shopping cart.
- Orders.
- REST API endpoints.
- Server-rendered HTML templates.

## Django Modules

| Module | Responsibility |
| :--- | :--- |
| `gamehub/` | Main Django project configuration |
| `account/` | Registration, authentication, and user profiles |
| `devlog/` | Development blog and game-related articles |
| `social/` | User posts and social interactions |
| `shop/` | Product catalog and virtual items |
| `cart/` | Shopping cart functionality |
| `orders/` | Order creation and management |
| `api/` | REST API endpoints |
| `templates/` | Server-rendered HTML templates |
| `media/` | Uploaded media and product assets |

## Django Requirements

The Django version requires:

- Python 3.
- Django 5.
- Django REST Framework.
- Docker and Docker Compose.
- SQLite for the included development database.

The Python dependencies are listed in:

```text
TV1_gamehub - Django/requirements.txt
```

## Django API Endpoints

The original application provides REST endpoints such as:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts/` | List available posts |
| `GET` | `/api/posts/<id>/` | Retrieve a specific post |
| `GET` | `/api/comments/` | List active comments |
| `GET` | `/api/comments/<id>/` | Retrieve a specific comment |

The API is also consumed by the Ionic mobile application in read-only mode.

---

# TV2 — MEVN Stack

The second version migrates the application to a decoupled MEVN architecture.

MEVN stands for:

- **MongoDB**
- **Express**
- **Vue**
- **Node.js**

The TV2 implementation separates the system into independent backend and frontend applications.

## MEVN Structure

```text
TV2_gamehub - MEVN/
├── backend/
├── deploy/
└── frontend/
```

### Backend

The backend provides a REST API implemented with Node.js and Express.

Its responsibilities include:

- User authentication.
- User registration.
- Post creation.
- Post listing.
- Comment management.
- Health checks.
- MongoDB communication.

### Frontend

The frontend is a Vue 3 single-page application.

It includes:

- Login and registration screens.
- MEVN-native post views.
- Post creation forms.
- Post listings.
- Read-only views consuming Django API data.
- API communication through HTTP requests.

### Deployment

The `deploy/` directory contains Docker Compose configuration for starting the MEVN services.

---

## MEVN API Health Check

The backend includes a health endpoint:

```http
GET http://localhost:3000/health
```

Example using cURL:

```bash
curl http://localhost:3000/health
```

A successful response confirms that the Node.js and Express backend is running.

---

# Ionic Mobile Application

The mobile application is located in:

```text
TV2_gamehub - IonicMobile/
```

It is built with:

- Ionic.
- Vue.
- Vite.
- Capacitor.
- JavaScript and TypeScript.
- Android native tooling.

The mobile application consumes both backend implementations.

## Mobile API Responsibilities

| Backend | Mobile Functionality |
| :--- | :--- |
| MEVN API | Login, post listing, and post creation |
| Django API | Read-only post listing |

## Mobile Features

- User login through the MEVN API.
- List posts from the MEVN backend.
- Create new posts through the MEVN backend.
- Read posts from the Django API.
- Environment-specific API configuration.
- Web development mode through Vite.
- Android deployment through Capacitor.

---

# Main Features

## Authentication

The platform supports user authentication through the Django and MEVN implementations.

The mobile application uses the MEVN backend for login:

```text
/api/auth/login
```

## Social Posts

Users can:

- View posts.
- Create posts through the MEVN frontend.
- Read posts from the Django API.
- Interact with the community content.

## Comments

The Django version includes comment functionality and REST endpoints for retrieving comments.

The MEVN version also provides backend support for comments.

## Development Blog

The Django monolith contains the `devlog` module for publishing development updates related to the video game.

## Shop and Virtual Items

The Django version contains modules for:

- Products.
- Virtual items.
- Skins.
- Diamonds.
- Coins.
- Shopping cart management.
- Orders.

## Decoupled Frontend

The MEVN version separates frontend rendering from backend logic.

This enables:

- Independent frontend development.
- API reuse across multiple clients.
- Mobile application integration.
- Easier scaling of individual services.
- Better separation of responsibilities.

## Containerized Deployment

Docker Compose is used to simplify local development and service startup.

---

# API Endpoints

## Django API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts/` | List posts |
| `GET` | `/api/posts/<id>/` | Retrieve a post |
| `GET` | `/api/comments/` | List comments |
| `GET` | `/api/comments/<id>/` | Retrieve a comment |

The exact URL may depend on the Django URL configuration and the environment where the application is running.

## MEVN API

The MEVN backend includes endpoints for:

| Functionality | Endpoint |
| :--- | :--- |
| Authentication | `/api/auth/login` |
| Posts | `/api/posts` |
| Health check | `/health` |

The MEVN backend supports post creation and post listing through the frontend.

---

# Docker Deployment

Docker is used to containerize the server-side applications.

## Django Docker Deployment

Move into the Django project directory:

```bash
cd "TV1_gamehub - Django"
```

Build the Django image:

```bash
./do.sh build
```

Start the Django services:

```bash
./do.sh start
```

The Django application should be available at:

```text
http://localhost:8000
```

## MEVN Docker Deployment

Move into the deployment directory:

```bash
cd "TV2_gamehub - MEVN/deploy"
```

Start the MEVN services:

```bash
docker compose up -d --build
```

The services should be available at:

| Service | URL |
| :--- | :--- |
| Vue frontend | `http://localhost:5173` |
| Express backend health check | `http://localhost:3000/health` |

Stop the MEVN services:

```bash
docker compose down
```

View service logs:

```bash
docker compose logs -f
```

---

# Environment Configuration

Environment variables are used to configure backend URLs without hard-coding deployment-specific addresses.

## Django Environment File

The Django project includes:

```text
TV1_gamehub - Django/.env.example
```

Copy it to a local `.env` file:

```bash
cp ".env.example" ".env"
```

Configure the values required by the Django application.

## Ionic Environment File

The Ionic project includes:

```text
TV2_gamehub - IonicMobile/.env.example
```

Copy the example file:

```bash
cd "TV2_gamehub - IonicMobile"
cp .env.example .env
```

For browser development with Vite proxies:

```env
VITE_MEVN_API_BASE_URL=/mevn-api
VITE_DJANGO_API_BASE_URL=/django-api
MEVN_PROXY_TARGET=http://localhost:3000
DJANGO_PROXY_TARGET=http://localhost:8000
```

After modifying the `.env` file, restart the Vite development server.

---

# Running the Django Version

## 1. Enter the Django Directory

```bash
cd "TV1_gamehub - Django"
```

## 2. Build the Docker Environment

```bash
./do.sh build
```

## 3. Start the Application

```bash
./do.sh start
```

To start the services in detached mode:

```bash
./do.sh start -d
```

## 4. Open the Application

```text
http://localhost:8000
```

## 5. Open the Django Admin

```text
http://localhost:8000/admin/
```

## 6. Create a Superuser

```bash
docker compose exec web_run python manage.py createsuperuser
```

The service name may depend on the project's Docker Compose configuration.

## Django Utility Commands

The helper script provides commands for common operations:

```bash
./do.sh start
./do.sh start -d
./do.sh stop
./do.sh migrate
./do.sh makemigrations
./do.sh shell
```

---

# Running the MEVN Version

## 1. Enter the Deployment Directory

```bash
cd "TV2_gamehub - MEVN/deploy"
```

## 2. Build and Start the Services

```bash
docker compose up -d --build
```

## 3. Check the Backend

```bash
curl http://localhost:3000/health
```

## 4. Open the Frontend

```text
http://localhost:5173
```

## 5. Stop the Services

```bash
docker compose down
```

## 6. Inspect Logs

```bash
docker compose logs -f
```

---

# Running the Ionic Application

Move into the Ionic project:

```bash
cd "TV2_gamehub - IonicMobile"
```

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The Vite server will display the local URL in the terminal.

The browser version uses Vite proxy routes so the frontend can communicate with both backends without requiring direct cross-origin requests.

---

# Android Emulator Configuration

For Android Emulator development, the host machine is accessed through:

```text
10.0.2.2
```

Configure the Ionic `.env` file as follows:

```env
VITE_MEVN_API_BASE_URL=http://10.0.2.2:3000/api
VITE_DJANGO_API_BASE_URL=http://10.0.2.2:8000/api
```

Build the Ionic application:

```bash
npm run build
```

Add the Android platform if it has not already been created:

```bash
npx cap add android
```

Synchronize the web project with the native Android project:

```bash
npx cap sync
```

Open the project in Android Studio:

```bash
npx cap open android
```

---

# Web Development Configuration

For browser development, use the Vite proxy configuration.

The `.env` file should contain:

```env
VITE_MEVN_API_BASE_URL=/mevn-api
VITE_DJANGO_API_BASE_URL=/django-api
MEVN_PROXY_TARGET=http://localhost:3000
DJANGO_PROXY_TARGET=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The Vite development server forwards requests as follows:

```text
/mevn-api   → http://localhost:3000
/django-api → http://localhost:8000
```

This allows the browser frontend to consume both APIs through the same local development origin.

> Restart `npm run dev` after changing environment variables.

---

# Data Management

## Django Data

The Django version uses its configured database and Django ORM.

The repository includes a development SQLite database:

```text
TV1_gamehub - Django/db.sqlite3
```

Data can also be managed through:

- Django admin.
- Django management commands.
- Application forms.
- REST API endpoints.

## MongoDB Data

The MEVN version uses MongoDB.

Users, posts, and comments can be created through:

- The Vue frontend.
- Registration forms.
- Post forms.
- Direct database administration through MongoDB Compass.

The current project documentation notes that seed scripts could be added as a future improvement.

---

# Technology Stack

## Original Application

| Technology | Purpose |
| :--- | :--- |
| Python | Backend programming language |
| Django 5 | Monolithic web framework |
| Django REST Framework | REST API implementation |
| SQLite | Development database |
| HTML | Server-rendered templates |
| Docker | Containerized execution |

## Migrated Web Application

| Technology | Purpose |
| :--- | :--- |
| MongoDB | NoSQL database |
| Express | REST API framework |
| Vue 3 | Single-page application frontend |
| Node.js | Backend runtime |
| Docker Compose | Local service orchestration |

## Mobile Application

| Technology | Purpose |
| :--- | :--- |
| Ionic | Cross-platform mobile UI framework |
| Vue | Frontend framework |
| Capacitor | Native runtime and platform integration |
| Vite | Development server and build tool |
| Android Studio | Android build and deployment environment |

---

# Migration Benefits

The migration from Django to MEVN provides several architectural benefits.

## Separation of Responsibilities

The backend and frontend can be developed, tested, and deployed independently.

## API Reusability

The same backend can support:

- Web applications.
- Mobile applications.
- Future desktop clients.
- Third-party integrations.

## Independent Scaling

Individual services can be scaled separately:

- Frontend hosting.
- Backend API.
- Database services.
- Mobile clients.

## Technology Flexibility

The project demonstrates how a system can evolve from a Python-based monolith to a JavaScript-based full-stack architecture while maintaining API compatibility for selected features.

## Mobile Integration

The Ionic application reuses the available APIs and provides a cross-platform mobile experience from the same codebase.

## Containerized Development

Docker ensures that project services can be started with consistent environments across different machines.

---

# Troubleshooting

## Docker Services Do Not Start

Check:

```bash
docker --version
docker compose version
```

Then inspect the logs:

```bash
docker compose logs -f
```

Make sure the required ports are not already being used.

## Frontend Cannot Reach the MEVN API

Check:

- The backend is running.
- The backend is available on port `3000`.
- The frontend API base URL is correct.
- Docker Compose services are healthy.
- The Vite proxy target is configured correctly.

Test the backend:

```bash
curl http://localhost:3000/health
```

## Frontend Cannot Reach the Django API

Check:

- The Django server is running.
- The Django server is available on port `8000`.
- `VITE_DJANGO_API_BASE_URL` is configured correctly.
- The Vite proxy target points to the correct Django URL.

Test the Django API:

```bash
curl http://localhost:8000/api/posts/
```

## Ionic Android App Cannot Connect to the Backend

When using the Android Emulator, do not use `localhost` for services running on the host computer.

Use:

```text
10.0.2.2
```

For example:

```env
VITE_MEVN_API_BASE_URL=http://10.0.2.2:3000/api
VITE_DJANGO_API_BASE_URL=http://10.0.2.2:8000/api
```

Then rebuild and synchronize:

```bash
npm run build
npx cap sync
```

## Environment Changes Are Not Applied

Restart the Vite development server:

```bash
npm run dev
```

Environment variables are loaded when the development server starts.

## Django Database Problems

Run migrations:

```bash
./do.sh migrate
```

Create migrations when models change:

```bash
./do.sh makemigrations
```

## Permission Error on `do.sh`

Make the script executable:

```bash
chmod +x do.sh
```

Then run:

```bash
./do.sh build
```

---

# Documentation

The repository includes technical documentation in PDF format:

```text
ATA_TV1_V2.pdf
ATA_TV2_TorronteraRuizEric_PauSantosVillalba.pdf
```

Additional project-specific instructions are available in:

```text
README - MEVN.txt
README - IONIC.txt
```

These files contain quick-start information for the MEVN and Ionic implementations.

---

# Academic Context

This project was developed as an academic architecture migration exercise by:

- Eric Torrontera Ruiz
- Pau Santos Villalba

The work studies the transformation of a Django monolithic application into:

1. A decoupled MEVN web architecture.
2. A reusable REST-based backend.
3. A cross-platform Ionic and Capacitor mobile application.
4. A Dockerized development environment.

The project demonstrates knowledge of:

- Full-stack web development.
- REST API design.
- Monolithic and decoupled architectures.
- Database migration concepts.
- JavaScript and Python ecosystems.
- Mobile application development.
- Docker-based deployment.
- API integration.
- Cross-platform software design.

---

# Future Improvements

Possible future improvements include:

- Add database seed scripts for MongoDB.
- Add automated tests for the MEVN backend.
- Add automated tests for the Vue frontend.
- Add automated tests for the Ionic application.
- Add authentication tokens such as JWT.
- Add refresh-token support.
- Add role-based authorization.
- Add API documentation with OpenAPI or Swagger.
- Add centralized error handling.
- Add request validation.
- Add pagination to all API endpoints.
- Add image upload support to the MEVN stack.
- Add production-ready MongoDB configuration.
- Add continuous integration with GitHub Actions.
- Add production Docker images.
- Add Kubernetes deployment manifests.
- Add monitoring and health metrics.
- Add improved offline support for the mobile application.
- Add automated database migration tools.
- Add a shared API contract between Django and MEVN.
- Complete the full migration of remaining Django modules.

---

# License

This project is intended for academic, educational, and portfolio purposes.

Unless otherwise specified, the source code and documentation are provided for learning and experimentation. Please contact the authors before redistributing the project or using it in a commercial product.

---

# Authors

Developed by:

- **Eric Torrontera Ruiz**
- **Pau Santos Villalba**

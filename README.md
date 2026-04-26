# Movie Review App (Spring Boot + React)

Full-stack project with a **Spring Boot (Java 21) + MongoDB Atlas** backend and a **React (Create React App)** frontend.

## Repo structure

- `src/`: Spring Boot backend source
- `frontend/MovieClient/movie-app-v1/`: React frontend (CRA)

## Tech stack highlights

- **Backend**: Java 21, Spring Boot 4, Spring Web (REST), Spring Data MongoDB, MongoDB Atlas (SRV), Lombok, `MongoTemplate`
- **Frontend**: React (hooks), `react-router-dom`, Axios, Bootstrap / `react-bootstrap`, Material UI, FontAwesome

## API base URL (backend)

- **Base URL**: `http://localhost:8080`
- **Movies**
  - `GET /api/v1/movies`
  - `GET /api/v1/movies/{imdbId}`
- **Reviews**
  - `POST /api/v1/reviews`

Example request body for creating a review:

```json
{
  "reviewBody": "Great movie",
  "imdbId": "tt1234567"
}
```

## Backend: local setup & run

### Prereqs

- Java **21**
- MongoDB Atlas cluster

### Environment variables

Create a `.env` file **in the repo root** (same folder as `pom.xml`) and fill in values. You can copy `src/main/resources/.env.example`.

- `MONGO_DATABASE` (use letters/numbers/underscores; avoid hyphens)
- `MONGO_USER`
- `MONGO_PASSWORD` (URL-encode if it contains special characters)
- `MONGO_CLUSTER` (hostname only, e.g. `cluster0.xxxxx.mongodb.net`)

### Run

```bash
./mvnw spring-boot:run
```

Backend will be available at `http://localhost:8080`.

## Frontend: local setup & run

### Prereqs

- Node.js (LTS recommended)

### Install & start

```bash
cd frontend/MovieClient/movie-app-v1
npm install
npm start
```

Frontend will be available at `http://localhost:3000`.

### How the frontend calls the backend

During development, the React app calls the Spring Boot API endpoints (for example `GET /api/v1/movies` and `POST /api/v1/reviews`) and renders:

- a movie list + hero carousel UI
- a per-movie reviews page (routes using `imdbId`)
- trailer links (opens YouTube directly)

## What we implemented / fixed (high-signal)

### Backend

- **MongoDB Atlas connectivity fixed for Spring Boot 4** by using `spring.mongodb.*` config keys (instead of `spring.data.mongodb.*`).
- **Secrets moved out of source** using env vars + `.env` support via `me.paulschwarz:springboot4-dotenv`.
- **Reviews feature wired end-to-end**:
  - fixed `Review` constructor casing
  - fixed `ReviewService` repository injection
  - fixed fluent `MongoTemplate` update by terminating with `.first()`
  - fixed movie field name mismatch (`reviewsIds`)

### Frontend

- **API integration** using Axios + React state (movie list fetch + movie detail/reviews fetch).
- **Routing** for per-movie reviews page (`react-router-dom`) aligned with backend lookup (`imdbId`).
- **UI + stability fixes** across JSX/CSS separation, imports, and runtime errors.
- **Trailer handling simplified** to open YouTube directly (more reliable than embeds in restricted environments).

## Development workflow

Run both servers in separate terminals:

- Backend: `./mvnw spring-boot:run` (port 8080)
- Frontend: `npm start` inside `frontend/MovieClient/movie-app-v1` (port 3000)


# By Eric Torrontera Ruiz and Pau Santos Villalba.

# TV2 GameHub - Stack MEVN

Implementacio del TV2 amb stack MEVN (MongoDB, Express, Vue, Node) 

## Estructura

- backend/: La API REST nova (auth, posts, comments).
- frontend/: Client Vue amb pantalles MEVN i pantalles Django read-only en paral.lel.
- deploy/: docker-compose.yml per Docker Desktop.

## Execució ràpida amb Docker

1. Situa't a TV2_gamehub - MEVN/deploy.
2. Executa:
   - docker compose up -d --build
3. Frontend:
   - http://localhost:5173
4. Backend health:
   - http://localhost:3000/health

## Dades

Bàsicament creeem usuaris, posts i comentaris manualment des del frontend (registre i formularis) o des de MongoDB Compass com comentem al pdf. Podriem afegir seeders.

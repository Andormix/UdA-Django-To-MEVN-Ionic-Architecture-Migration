# By Eric Torrontera Ruiz and Pau Santos Villalba.

# TV2 GameHub - Ionic Mobile

 Aquesta app per mòvil consumeix els dos backends:
   MEVN: login, veure posts list, crear post</li>
   Django: posts (read-only)

## Estructura

1. MEVN Login (/api/auth/login)
2. MEVN Llistar posts (/api/posts)
3. MEVN Crear post (/api/posts)
4. Django API posts (read-only) (/api/posts/)

## Quickstart

1. Si uses emu copiar .env.example a .env. Nosaltres testejem amb web.
2. Instalem dependències:
   - npm install
3. Run dev:
   - npm run dev

## Emu Android

Base URLs (Aqui també podriem possar la lan de cassa al 127):
- VITE_MEVN_API_BASE_URL=http://10.0.2.2:3000/api
- VITE_DJANGO_API_BASE_URL=http://10.0.2.2:8000/api

Una vegada canviat:
- npm run build
- npx cap add android
- npm run sync
- npx cap open android

## Django al browser (important, es el que fem servir per demo i tot degur al bug)

Usem Vite proxy /django-api per evitar CORS. Mateix patró al PC. Simplement no tocar res i fer
servir .env pel browser:

Per si de cas l'has eliminat:

.env
VITE_MEVN_API_BASE_URL=/mevn-api
VITE_DJANGO_API_BASE_URL=/django-api
MEVN_PROXY_TARGET=http://localhost:3000
DJANGO_PROXY_TARGET=http://localhost:8000


Hem de fer restart npm run dev després de canviar .env

# GameHub - Plataforma Web Oficial del Videojoc Gamedev

<p align="center">
  <img width="100%" alt="image" src="https://github.com/user-attachments/assets/20738cd7-81d8-4868-9326-84951d44e7cc" />
</p>

<p align="center">
  <img width="100%" alt="image" src="https://github.com/user-attachments/assets/976eb816-f035-4f70-8523-531e2b78426f" />
</p>

Plataforma web integrada per al videojoc. El projecte centralitza el devlog de desenvolupament, la comunitat de jugadors i una botiga d'ítems i moneda virtual (skins, diamants, monedes).

**Autors:** Eric Torrontera Ruiz i Pau Santos Villalba

---

## Arquitectura Global del Repositori

Aquest repositori conté les dues evolucions de la plataforma:

```
.
├── TV1_gamehub/          # Versió monolítica original en Django 5.2
├── TV2_gamehub_MEVN/     # Evolució a arquitectura SPA / API REST amb stack MEVN
└── Implementació - Docs/ # Documentació i guia didàctica pas a pas
```

---

## TV2: GameHub - Stack MEVN (MongoDB, Express, Vue, Node)

Reimplementació de la plataforma utilitzant una arquitectura desacoblada frontend/backend amb la pila **MEVN**, mantenint la versió TV1 en paral·lel per a la lectura de dades.

### Estructura Interna (TV2)
* `backend/`: API REST creada amb Node.js i Express (Autenticació, Posts, Comentaris).
* `frontend/`: Aplicació SPA amb Vue 3 que integra pantalles natives MEVN i pantalles en paral·lel read-only per a dades de Django (TV1).
* `deploy/`: Entorn d'orquestració amb Docker Compose per a entorns de desenvolupament.

### Execució Ràpida amb Docker (TV2)
1. Navega a la carpeta de desplegament:
   ```bash
   cd TV2_gamehub_MEVN/deploy
   ```
2. Inicia els serveis:
   ```bash
   docker compose up -d --build
   ```
3. Accés als serveis:
   * **Frontend (Vue):** `http://localhost:5173`
   * **Backend Healthcheck:** `http://localhost:3000/health`

### Gestió de Dades
Es poden crear usuaris, posts i comentaris manualment des del mateix client frontend (formulari de registre i publicació) o bé gestionant la base de dades directament des de **MongoDB Compass**.

---

## TV1: GameHub - Monòlit Django 5

<p align="center">
  <img width="100%" alt="image" src="https://github.com/user-attachments/assets/3859d6f5-098a-4ad1-b46b-9058095ad251" />
</p>

Versió inicial desenvolupada sobre **Django 5.2** seguint els patrons del llibre *"Django 5 By Example"* (5a edició) d'Antonio Melé.

### Estructura de Mòduls (TV1)
* `gamehub/`: Configuració principal del projecte.
* `devlog/`: CMS / Blog de desenvolupament.
* `account/`: Sistema d'autenticació, registre i perfils d'usuari.
* `social/`: Sistema de publicacions i interaccions socials.
* `shop/` & `cart/` & `orders/`: Mòdul d'e-commerce (botiga, cistella de la compra i gestió de comandes).
* `api/`: API REST per a la consulta de continguts amb Django REST Framework.

### Execució Ràpida amb Docker (TV1)
1. Navega a la carpeta de TV1:
   ```bash
   cd TV1_gamehub
   ```
2. Executa el script helper per a construir i aixecar la instància:
   ```bash
   ./do.sh build
   ./do.sh start
   ```
3. Accedeix a l'aplicació a `http://localhost:8000`.

### Creació de Superusuari i Administració
Per accedir al panell d'administració (`http://localhost:8000/admin/`):
```bash
docker compose exec web_run python manage.py createsuperuser
```

### Script d'Utilitats (`./do.sh`)
* `./do.sh start -d` — Iniciar serveis en segon pla.
* `./do.sh stop` — Aturar el servidor.
* `./do.sh migrate` / `makemigrations` — Gestió de la base de dades.
* `./do.sh shell` — Accés a la consola interactiva del contenidor.

---

## Endpoints Destacats de l'API REST (TV1)

* `GET /api/posts/` — Llistat de publicacions del devlog.
* `GET /api/posts/{id}/` — Detall d'un post concret.
* `GET /api/comments/` — Llistat de comentaris actius.
* `GET /api/comments/{id}/` — Detall d'un comentari.

---

## Guia Didàctica

Per a una explicació pas a pas del desenvolupament des de zero de totes dues implementacions, pots consultar la documentació inclosa a la carpeta `Implementació - Docs/`.

## 📄 Documentació Tècnica Completa

Per a una anàlisi detallada dels diagrames d'arquitectura, decisions de disseny, endpoints de l'API REST i patronatge utilitzat, pots consultar la documentació oficial:

👉 [**📖 Llegir la Memòria Tècnica del Projecte (PDF)**](https://github.com/Andormix/uda-architecture-migration-django-to-mevn-ionic/blob/main/Documentaci%C3%B3%20del%20projecte.pdf)

---

# Videoclub DAW

Aplicacion web full stack sencilla con Angular 21, Spring Boot y base de datos H2 en memoria.

## Estructura

- `frontend`: aplicacion Angular con componentes Standalone, Signals, rutas, formularios reactivos y servicios con Observables.
- `backend`: API REST Java Spring Boot con JPA, H2 y relacion 1:M entre `Categoria` y `Pelicula`.

## Arrancar el backend

```bash
cd backend
./mvnw spring-boot:run
```

En Windows tambien puedes usar:

```bash
cd backend
mvnw.cmd spring-boot:run
```

La API queda en `http://localhost:8080`.

Endpoints principales:

- `GET /api/peliculas`
- `GET /api/peliculas/{id}`
- `POST /api/peliculas`
- `GET /api/categorias`
- `GET /api/categorias/{id}`
- `GET /api/categorias/{id}/peliculas`
- `POST /api/categorias`

Consola H2:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:videoclub`
- Usuario: `sa`
- Password: vacio

## Arrancar el frontend

```bash
cd frontend
npm install
npm start
```

La aplicacion queda en `http://localhost:4200`.

## Modelo de datos

Una `Categoria` tiene muchas `Pelicula`.

Ejemplo:

- Categoria: Ciencia ficcion
- Peliculas: Matrix, Regreso al futuro

El backend carga datos iniciales al arrancar para poder probar el listado y los detalles desde el primer momento.

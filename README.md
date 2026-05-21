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


## Arrancar el frontend

```bash
cd frontend
npm install
npm start
```


La API queda en `http://localhost:8080`.

Consola H2:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:videoclub`
- Usuario: `sa`
- Password: vacio

La aplicacion queda en `http://localhost:4200`.

## Modelo de datos

Una `Categoria` tiene muchas `Pelicula`.

Ejemplo:

- Categoria: Ciencia ficcion
- Peliculas: Matrix, Regreso al futuro

El backend carga datos iniciales al arrancar para poder probar el listado y los detalles desde el primer momento.

# 🎬 VideoClub — Proyecto Full Stack

Aplicación web de gestión de un videoclub desarrollada con **Angular 21** (frontend) y **Spring Boot 3** (backend).

---

## 🗂 Estructura del Proyecto

```
videoclub/
├── backend/          # Spring Boot 3 + H2 en memoria
├── frontend/         # Angular 21 (Standalone Components)
├── data.sql          # Script SQL con datos de ejemplo (opcional)
└── README.md
```

---

## 🚀 Requisitos Previos

| Herramienta | Versión mínima |
|-------------|----------------|
| Java        | 17+            |
| Maven       | 3.8+           |
| Node.js     | 20+            |
| npm         | 9+             |
| Angular CLI | 21+            |

---

## ▶️ Arranque del Backend

```bash
cd backend
mvn spring-boot:run
```

El servidor arranca en **http://localhost:8080**

La consola H2 está disponible en **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:videoclubdb`
- Usuario: `sa`
- Contraseña: *(vacía)*

Los datos de ejemplo se cargan automáticamente al iniciar.

---

## ▶️ Arranque del Frontend

```bash
cd frontend
npm install
ng serve
# O con npx si no tienes Angular CLI global:
# npx ng serve
```

La app arranca en **http://localhost:4200**

---

## 🌐 API REST — Endpoints

### Películas

| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/api/peliculas` | Listar todas |
| GET    | `/api/peliculas?search=matrix` | Buscar por título |
| GET    | `/api/peliculas?genero=Drama` | Filtrar por género |
| GET    | `/api/peliculas?disponible=true` | Solo disponibles |
| GET    | `/api/peliculas/{id}` | Ver detalle |
| GET    | `/api/peliculas/{id}/alquileres` | Alquileres de una película (relación 1:M) |
| POST   | `/api/peliculas` | Crear nueva película |
| PUT    | `/api/peliculas/{id}` | Editar película |
| DELETE | `/api/peliculas/{id}` | Eliminar película |

### Alquileres

| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/api/alquileres` | Listar todos |
| GET    | `/api/alquileres/{id}` | Ver detalle |
| POST   | `/api/alquileres` | Crear nuevo alquiler |
| PATCH  | `/api/alquileres/{id}/devolver` | Marcar como devuelto |
| DELETE | `/api/alquileres/{id}` | Eliminar alquiler |

---

## 📦 Ejemplo de Petición — Crear Película

```json
POST /api/peliculas
Content-Type: application/json

{
  "titulo": "Alien",
  "director": "Ridley Scott",
  "anio": 1979,
  "genero": "Terror",
  "sinopsis": "La tripulación del Nostromo enfrenta a un aterrador organismo extraterrestre.",
  "portadaUrl": "https://...",
  "disponible": true
}
```

## 📦 Ejemplo de Petición — Crear Alquiler

```json
POST /api/alquileres
Content-Type: application/json

{
  "nombreCliente": "Juan Pérez",
  "fechaAlquiler": "2025-01-15",
  "peliculaId": 1
}
```

---

## 🏗 Arquitectura

### Backend
- **Spring Boot 3.3** — Framework principal
- **Spring Data JPA** — Persistencia con H2
- **H2 Database** — Base de datos en memoria
- **Lombok** — Reducción de boilerplate
- **Bean Validation** — Validación de DTOs
- Relación **1:M** entre `Pelicula` ↔ `Alquiler`

### Frontend
- **Angular 21** con **Standalone Components** (sin NgModules)
- **Signals** (`signal`, `computed`) para gestión de estado reactivo
- **Reactive Forms** (`FormBuilder`, `Validators`) en el formulario de película
- **Observables** con `HttpClient` en todos los servicios
- **Lazy Loading** de rutas para optimización
- Diseño oscuro tipo cine (tema *film noir*)

---

## ✅ Requisitos Cubiertos

### Frontend
- [x] Componentes StandAlone (todos los componentes)
- [x] Signals para estado (`signal`, `computed`) en PeliculasComponent, AlquileresComponent, NavbarComponent
- [x] Formularios reactivos (`ReactiveFormsModule`) en PeliculaFormComponent y PeliculaDetailComponent
- [x] Llamadas a API REST desde servicios Angular (`PeliculaService`, `AlquilerService`)
- [x] Observables en los servicios (`Observable<T>` con `HttpClient`)
- [x] Navegación (Rutas) con lazy loading entre todas las vistas

### Backend
- [x] API REST expuesta y funcional (CORS abierto)
- [x] CRUD completo sobre Película y Alquiler
- [x] Relación 1:M entre `Pelicula` y `Alquiler`
- [x] Persistencia con H2 (base de datos relacional en memoria)
- [x] DTOs para separar capa de presentación
- [x] Validaciones con Bean Validation
- [x] Datos de ejemplo precargados

---

## 👨‍💻 Notas de Desarrollo

- El backend usa **`create-drop`** en JPA, los datos se reinician al reinicar el servidor.
- Los datos de ejemplo se cargan desde `DataInitializer.java`.
- Para ver la base de datos en tiempo real usa la **consola H2**.

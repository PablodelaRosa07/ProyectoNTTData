-- ====================================================
-- VideoClub - Script de datos de ejemplo
-- Para H2 en memoria (compatible con MySQL/PostgreSQL
-- con pequeñas adaptaciones)
-- ====================================================

-- NOTA: Con spring.jpa.hibernate.ddl-auto=create-drop
-- las tablas se crean automáticamente por Hibernate.
-- Este script es opcional / referencia.

-- Películas de ejemplo
INSERT INTO peliculas (titulo, director, anio, genero, sinopsis, portada_url, disponible)
VALUES
  ('El Padrino', 'Francis Ford Coppola', 1972, 'Drama',
   'La historia de la familia mafiosa Corleone y su sucesor Michael.',
   'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmfw5T.jpg', true),

  ('Blade Runner 2049', 'Denis Villeneuve', 2017, 'Ciencia Ficción',
   'Un replicante descubre un secreto que podría hundir lo que queda de la sociedad.',
   'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', true),

  ('Interestelar', 'Christopher Nolan', 2014, 'Ciencia Ficción',
   'Un grupo de exploradores viaja a través de un agujero de gusano.',
   'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', false),

  ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Thriller',
   'Las vidas de dos sicarios y un gángster se entrelazan en cuatro historias.',
   'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', true),

  ('El Señor de los Anillos', 'Peter Jackson', 2001, 'Fantasía',
   'Un hobbit emprende una peligrosa misión para destruir el Anillo Único.',
   'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', true),

  ('Matrix', 'Wachowski Sisters', 1999, 'Ciencia Ficción',
   'Un programador descubre que la realidad es una simulación.',
   'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', true);

-- Alquileres de ejemplo
INSERT INTO alquileres (nombre_cliente, fecha_alquiler, fecha_devolucion, estado, pelicula_id)
VALUES
  ('Carlos García', DATEADD('DAY', -5, CURRENT_DATE), NULL, 'ACTIVO', 3),
  ('Ana Martínez', DATEADD('DAY', -10, CURRENT_DATE), DATEADD('DAY', -3, CURRENT_DATE), 'DEVUELTO', 1),
  ('Luis Rodríguez', DATEADD('DAY', -2, CURRENT_DATE), NULL, 'ACTIVO', 2),
  ('María López', DATEADD('DAY', -15, CURRENT_DATE), DATEADD('DAY', -8, CURRENT_DATE), 'DEVUELTO', 1);

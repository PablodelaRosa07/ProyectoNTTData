export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  directorId: number;
  directorNombre: string;
  anio: number;
  disponible: boolean;
  categoriaId: number;
  categoriaNombre: string;
}

export interface CrearPelicula {
  titulo: string;
  directorId: number;
  anio: number;
  disponible: boolean;
  categoriaId: number;
}

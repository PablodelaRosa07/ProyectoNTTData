export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  anio: number;
  disponible: boolean;
  categoriaId: number;
  categoriaNombre: string;
}

export interface CrearPelicula {
  titulo: string;
  director: string;
  anio: number;
  disponible: boolean;
  categoriaId: number;
}

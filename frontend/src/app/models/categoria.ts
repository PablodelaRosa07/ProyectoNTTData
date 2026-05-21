import { Pelicula } from './pelicula';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  totalPeliculas: number;
}

export interface CategoriaDetalle {
  id: number;
  nombre: string;
  descripcion: string;
  peliculas: Pelicula[];
}

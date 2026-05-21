import { Pelicula } from './pelicula';

export interface Director {
  id: number;
  nombre: string;
  totalPeliculas: number;
}

export interface DirectorDetalle {
  id: number;
  nombre: string;
  peliculas: Pelicula[];
}

export interface CrearDirector {
  nombre: string;
}

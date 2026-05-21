export interface Pelicula {
  id?: number;
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  sinopsis?: string;
  portadaUrl?: string;
  disponible: boolean;
  alquileres?: Alquiler[];
}

export interface Alquiler {
  id?: number;
  nombreCliente: string;
  fechaAlquiler: string;
  fechaDevolucion?: string;
  estado: 'ACTIVO' | 'DEVUELTO' | 'RETRASADO';
  peliculaId: number;
  peliculaTitulo?: string;
}

export interface AlquilerRequest {
  nombreCliente: string;
  fechaAlquiler: string;
  peliculaId: number;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearPelicula, Pelicula } from '../models/pelicula';

export interface FiltrosPeliculas {
  titulo: string;
  categoriaId: number;
  directorId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private readonly apiUrl = 'http://localhost:8080/api/peliculas';

  constructor(private readonly http: HttpClient) {}

  listar(filtros: FiltrosPeliculas = { titulo: '', categoriaId: 0, directorId: 0 }): Observable<Pelicula[]> {
    let params: Record<string, string> = {};

    if (filtros.titulo.trim()) {
      params = { ...params, titulo: filtros.titulo.trim() };
    }

    if (filtros.categoriaId > 0) {
      params = { ...params, categoriaId: String(filtros.categoriaId) };
    }

    if (filtros.directorId > 0) {
      params = { ...params, directorId: String(filtros.directorId) };
    }

    return this.http.get<Pelicula[]>(this.apiUrl, { params });
  }

  detalle(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  crear(pelicula: CrearPelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizar(id: number, pelicula: CrearPelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

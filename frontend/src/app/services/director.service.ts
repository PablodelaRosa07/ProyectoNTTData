import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearDirector, Director, DirectorDetalle } from '../models/director';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private readonly apiUrl = 'http://localhost:8080/api/directores';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Director[]> {
    return this.http.get<Director[]>(this.apiUrl);
  }

  crear(director: CrearDirector): Observable<Director> {
    return this.http.post<Director>(this.apiUrl, director);
  }

  actualizar(id: number, director: CrearDirector): Observable<Director> {
    return this.http.put<Director>(`${this.apiUrl}/${id}`, director);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  detalle(id: number): Observable<DirectorDetalle> {
    return this.http.get<DirectorDetalle>(`${this.apiUrl}/${id}`);
  }

  peliculasDeDirector(id: number): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/${id}/peliculas`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8080/api/peliculas';

  constructor(private http: HttpClient) {}

  getAll(params?: { genero?: string; search?: string; disponible?: boolean }): Observable<Pelicula[]> {
    let httpParams = new HttpParams();
    if (params?.genero) httpParams = httpParams.set('genero', params.genero);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.disponible !== undefined) httpParams = httpParams.set('disponible', String(params.disponible));
    return this.http.get<Pelicula[]>(this.apiUrl, { params: httpParams });
  }

  getById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  getAlquileres(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/alquileres`);
  }

  create(pelicula: Partial<Pelicula>): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  update(id: number, pelicula: Partial<Pelicula>): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

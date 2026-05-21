import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriaDetalle } from '../models/categoria';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  detalle(id: number): Observable<CategoriaDetalle> {
    return this.http.get<CategoriaDetalle>(`${this.apiUrl}/${id}`);
  }

  peliculasDeCategoria(id: number): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/${id}/peliculas`);
  }
}

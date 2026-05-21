import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler, AlquilerRequest } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private apiUrl = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl);
  }

  getById(id: number): Observable<Alquiler> {
    return this.http.get<Alquiler>(`${this.apiUrl}/${id}`);
  }

  create(alquiler: AlquilerRequest): Observable<Alquiler> {
    return this.http.post<Alquiler>(this.apiUrl, alquiler);
  }

  devolver(id: number): Observable<Alquiler> {
    return this.http.patch<Alquiler>(`${this.apiUrl}/${id}/devolver`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

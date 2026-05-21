import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Catálogo de <span class="accent">Películas</span></h1>
          <p class="page-subtitle">{{ totalPeliculas() }} películas disponibles</p>
        </div>
        <a routerLink="/peliculas/nueva" class="btn-primary">+ Añadir Película</a>
      </div>

      <!-- Filtros -->
      <div class="filters-bar">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por título..."
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch($event)"
            class="search-input"
          />
        </div>
        <div class="genre-filters">
          <button
            *ngFor="let g of generos"
            class="genre-chip"
            [class.active]="generoActivo() === g"
            (click)="filtrarPorGenero(g)">
            {{ g === '' ? 'Todos' : g }}
          </button>
        </div>
        <div class="disponible-filter">
          <label class="toggle-label">
            <input type="checkbox" [(ngModel)]="soloDisponibles" (change)="cargarPeliculas()" />
            <span>Solo disponibles</span>
          </label>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading()" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando películas...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error()" class="error-state">
        <p>⚠️ {{ error() }}</p>
        <button (click)="cargarPeliculas()" class="btn-secondary">Reintentar</button>
      </div>

      <!-- Grid -->
      <div *ngIf="!loading() && !error()" class="peliculas-grid">
        <div *ngFor="let pelicula of peliculas()" class="pelicula-card" [routerLink]="['/peliculas', pelicula.id]">
          <div class="card-poster">
            <img
              *ngIf="pelicula.portadaUrl"
              [src]="pelicula.portadaUrl"
              [alt]="pelicula.titulo"
              (error)="onImgError($event)"
            />
            <div *ngIf="!pelicula.portadaUrl" class="poster-placeholder">
              <span>🎬</span>
            </div>
            <div class="card-disponible" [class.disponible]="pelicula.disponible" [class.no-disponible]="!pelicula.disponible">
              {{ pelicula.disponible ? 'Disponible' : 'Alquilada' }}
            </div>
          </div>
          <div class="card-info">
            <span class="card-genero">{{ pelicula.genero }}</span>
            <h3 class="card-titulo">{{ pelicula.titulo }}</h3>
            <p class="card-director">{{ pelicula.director }} · {{ pelicula.anio }}</p>
            <p class="card-sinopsis" *ngIf="pelicula.sinopsis">{{ pelicula.sinopsis | slice:0:80 }}...</p>
          </div>
        </div>

        <div *ngIf="peliculas().length === 0" class="empty-state">
          <span class="empty-icon">🎭</span>
          <p>No se encontraron películas</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    .page-title {
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      font-size: 3rem;
      color: #f5f5f0;
      margin: 0;
      letter-spacing: 2px;
    }
    .accent { color: #e5a00d; }
    .page-subtitle { color: #707070; margin: 0.25rem 0 0; font-size: 0.9rem; }
    .btn-primary {
      background: #e5a00d;
      color: #0a0a0a;
      padding: 0.7rem 1.5rem;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s;
      white-space: nowrap;
    }
    .btn-primary:hover { background: #f0b429; }
    .btn-secondary {
      background: transparent;
      color: #e5a00d;
      border: 1px solid #e5a00d;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .filters-bar {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .search-wrapper {
      position: relative;
      flex: 1;
      min-width: 200px;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    .search-input {
      width: 100%;
      padding: 0.6rem 0.75rem 0.6rem 2.5rem;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      color: #f5f5f0;
      font-size: 0.95rem;
      box-sizing: border-box;
    }
    .search-input:focus { outline: none; border-color: #e5a00d; }
    .genre-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .genre-chip {
      padding: 0.4rem 0.9rem;
      border-radius: 20px;
      border: 1px solid #333;
      background: transparent;
      color: #a0a0a0;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .genre-chip:hover, .genre-chip.active {
      border-color: #e5a00d;
      color: #e5a00d;
      background: rgba(229,160,13,0.1);
    }
    .toggle-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #a0a0a0;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .toggle-label input { accent-color: #e5a00d; }
    .peliculas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .pelicula-card {
      background: #141414;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid #222;
    }
    .pelicula-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
      border-color: #e5a00d;
    }
    .card-poster {
      position: relative;
      aspect-ratio: 2/3;
      overflow: hidden;
      background: #1a1a1a;
    }
    .card-poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .poster-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
    }
    .card-disponible {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .disponible { background: rgba(34,197,94,0.9); color: #fff; }
    .no-disponible { background: rgba(239,68,68,0.9); color: #fff; }
    .card-info { padding: 1rem; }
    .card-genero {
      font-size: 0.75rem;
      color: #e5a00d;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    .card-titulo {
      margin: 0.3rem 0 0.2rem;
      font-size: 1rem;
      color: #f5f5f0;
      font-weight: 700;
      line-height: 1.3;
    }
    .card-director { margin: 0; font-size: 0.8rem; color: #707070; }
    .card-sinopsis { margin: 0.5rem 0 0; font-size: 0.8rem; color: #606060; line-height: 1.4; }
    .loading-state, .error-state, .empty-state {
      text-align: center;
      padding: 4rem;
      color: #707070;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #333;
      border-top-color: #e5a00d;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .empty-icon { font-size: 3rem; display: block; margin-bottom: 0.5rem; }
    @media (max-width: 600px) {
      .page-header { flex-direction: column; gap: 1rem; align-items: flex-start; }
      .page-title { font-size: 2rem; }
    }
  `]
})
export class PeliculasComponent implements OnInit {
  peliculas = signal<Pelicula[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  generoActivo = signal('');
  totalPeliculas = computed(() => this.peliculas().length);

  searchTerm = '';
  soloDisponibles = false;
  generos = ['', 'Acción', 'Drama', 'Comedia', 'Thriller', 'Ciencia Ficción', 'Fantasía', 'Terror', 'Animación'];

  private searchTimeout: any;

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.loading.set(true);
    this.error.set(null);
    const params: any = {};
    if (this.generoActivo()) params.genero = this.generoActivo();
    if (this.soloDisponibles) params.disponible = true;

    this.peliculaService.getAll(params).subscribe({
      next: (data) => {
        this.peliculas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo conectar con el servidor. ¿Está el backend corriendo?');
        this.loading.set(false);
      }
    });
  }

  filtrarPorGenero(genero: string) {
    this.generoActivo.set(genero === this.generoActivo() ? '' : genero);
    this.cargarPeliculas();
  }

  onSearch(term: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (term.trim().length > 0) {
        this.peliculaService.getAll({ search: term }).subscribe({
          next: (data) => this.peliculas.set(data),
          error: () => this.error.set('Error al buscar')
        });
      } else {
        this.cargarPeliculas();
      }
    }, 400);
  }

  onImgError(event: any) {
    event.target.style.display = 'none';
  }
}

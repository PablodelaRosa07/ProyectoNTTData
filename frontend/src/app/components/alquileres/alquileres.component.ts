import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import { Alquiler } from '../../models/pelicula.model';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestión de <span class="accent">Alquileres</span></h1>
          <p class="page-subtitle">{{ totalActivos() }} activos · {{ totalDevueltos() }} devueltos</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">📋</span>
          <div>
            <div class="stat-number">{{ alquileres().length }}</div>
            <div class="stat-label">Total</div>
          </div>
        </div>
        <div class="stat-card activos">
          <span class="stat-icon">🎬</span>
          <div>
            <div class="stat-number">{{ totalActivos() }}</div>
            <div class="stat-label">Activos</div>
          </div>
        </div>
        <div class="stat-card devueltos">
          <span class="stat-icon">✅</span>
          <div>
            <div class="stat-number">{{ totalDevueltos() }}</div>
            <div class="stat-label">Devueltos</div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading()" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando alquileres...</p>
      </div>

      <!-- Tabla -->
      <div *ngIf="!loading()" class="table-card">
        <div class="filter-tabs">
          <button class="tab" [class.active]="filtroActivo() === 'todos'" (click)="filtroActivo.set('todos')">Todos</button>
          <button class="tab" [class.active]="filtroActivo() === 'ACTIVO'" (click)="filtroActivo.set('ACTIVO')">Activos</button>
          <button class="tab" [class.active]="filtroActivo() === 'DEVUELTO'" (click)="filtroActivo.set('DEVUELTO')">Devueltos</button>
        </div>

        <div class="table-wrapper">
          <table class="alquileres-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Película</th>
                <th>Fecha Alquiler</th>
                <th>Fecha Devolución</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of alquileresFiltrados()" class="table-row">
                <td class="id-cell">#{{ a.id }}</td>
                <td>
                  <div class="cliente-name">{{ a.nombreCliente }}</div>
                </td>
                <td>
                  <a [routerLink]="['/peliculas', a.peliculaId]" class="pelicula-link">
                    {{ a.peliculaTitulo }}
                  </a>
                </td>
                <td>{{ a.fechaAlquiler | date:'dd/MM/yyyy' }}</td>
                <td>{{ a.fechaDevolucion ? (a.fechaDevolucion | date:'dd/MM/yyyy') : '—' }}</td>
                <td>
                  <span class="estado-badge" [class]="'estado-' + a.estado.toLowerCase()">
                    {{ a.estado }}
                  </span>
                </td>
                <td class="actions-cell">
                  <button *ngIf="a.estado === 'ACTIVO'" (click)="devolver(a.id!)" class="btn-devolver">
                    ✅ Devolver
                  </button>
                  <button (click)="eliminar(a.id!)" class="btn-eliminar">🗑</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="alquileresFiltrados().length === 0" class="empty-state">
            <span>📭</span>
            <p>No hay alquileres {{ filtroActivo() !== 'todos' ? filtroActivo().toLowerCase() + 's' : '' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
    .page-header { margin-bottom: 2rem; }
    .page-title { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 3rem; color: #f5f5f0; margin: 0; letter-spacing: 2px; }
    .accent { color: #e5a00d; }
    .page-subtitle { color: #707070; margin: 0.25rem 0 0; font-size: 0.9rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .stat-icon { font-size: 2rem; }
    .stat-number { font-size: 1.8rem; font-weight: 700; color: #f5f5f0; line-height: 1; }
    .stat-label { font-size: 0.8rem; color: #707070; margin-top: 0.2rem; }
    .activos .stat-number { color: #e5a00d; }
    .devueltos .stat-number { color: #22c55e; }
    .loading-state { text-align: center; padding: 4rem; color: #707070; }
    .spinner { width: 40px; height: 40px; border: 3px solid #333; border-top-color: #e5a00d; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .table-card { background: #141414; border: 1px solid #222; border-radius: 16px; overflow: hidden; }
    .filter-tabs { display: flex; gap: 0; border-bottom: 1px solid #222; }
    .tab { background: transparent; border: none; color: #707070; padding: 1rem 1.5rem; cursor: pointer; font-size: 0.9rem; border-bottom: 2px solid transparent; transition: all 0.2s; }
    .tab.active { color: #e5a00d; border-bottom-color: #e5a00d; }
    .table-wrapper { overflow-x: auto; }
    .alquileres-table { width: 100%; border-collapse: collapse; }
    .alquileres-table th { background: #0f0f0f; color: #707070; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; padding: 0.75rem 1rem; text-align: left; font-weight: 600; }
    .table-row td { padding: 1rem; border-bottom: 1px solid #1a1a1a; color: #c0c0c0; font-size: 0.9rem; vertical-align: middle; }
    .table-row:hover td { background: #1a1a1a; }
    .id-cell { color: #555; font-size: 0.8rem; }
    .cliente-name { color: #f5f5f0; font-weight: 500; }
    .pelicula-link { color: #e5a00d; text-decoration: none; }
    .pelicula-link:hover { text-decoration: underline; }
    .estado-badge { padding: 0.25rem 0.65rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    .estado-activo { background: rgba(229,160,13,0.15); color: #e5a00d; }
    .estado-devuelto { background: rgba(34,197,94,0.15); color: #22c55e; }
    .estado-retrasado { background: rgba(239,68,68,0.15); color: #ef4444; }
    .actions-cell { display: flex; gap: 0.5rem; align-items: center; }
    .btn-devolver { background: transparent; border: 1px solid #22c55e; color: #22c55e; padding: 0.3rem 0.7rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; white-space: nowrap; transition: all 0.2s; }
    .btn-devolver:hover { background: rgba(34,197,94,0.1); }
    .btn-eliminar { background: transparent; border: 1px solid #333; color: #ef4444; padding: 0.3rem 0.5rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
    .btn-eliminar:hover { border-color: #ef4444; }
    .empty-state { text-align: center; padding: 3rem; color: #606060; }
    .empty-state span { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: 1fr; }
      .page-title { font-size: 2rem; }
    }
  `]
})
export class AlquileresComponent implements OnInit {
  alquileres = signal<Alquiler[]>([]);
  loading = signal(true);
  filtroActivo = signal<string>('todos');

  totalActivos = computed(() => this.alquileres().filter(a => a.estado === 'ACTIVO').length);
  totalDevueltos = computed(() => this.alquileres().filter(a => a.estado === 'DEVUELTO').length);
  alquileresFiltrados = computed(() => {
    const f = this.filtroActivo();
    if (f === 'todos') return this.alquileres();
    return this.alquileres().filter(a => a.estado === f);
  });

  constructor(private alquilerService: AlquilerService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.loading.set(true);
    this.alquilerService.getAll().subscribe({
      next: (data) => { this.alquileres.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  devolver(id: number) {
    this.alquilerService.devolver(id).subscribe({ next: () => this.cargar() });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este alquiler?')) {
      this.alquilerService.delete(id).subscribe({ next: () => this.cargar() });
    }
  }
}

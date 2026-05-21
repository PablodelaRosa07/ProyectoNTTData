import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { AlquilerService } from '../../services/alquiler.service';
import { Pelicula, Alquiler } from '../../models/pelicula.model';

@Component({
  selector: 'app-pelicula-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div *ngIf="loading()" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>

      <ng-container *ngIf="!loading() && pelicula()">
        <div class="back-nav">
          <a routerLink="/peliculas" class="back-link">← Volver al catálogo</a>
        </div>

        <div class="detail-layout">
          <!-- Poster -->
          <div class="poster-section">
            <div class="poster-frame">
              <img *ngIf="pelicula()!.portadaUrl" [src]="pelicula()!.portadaUrl" [alt]="pelicula()!.titulo" (error)="onImgError($event)" />
              <div *ngIf="!pelicula()!.portadaUrl" class="poster-placeholder">🎬</div>
            </div>
            <div class="poster-actions">
              <a [routerLink]="['/peliculas', pelicula()!.id, 'editar']" class="btn-edit">✏️ Editar</a>
              <button (click)="deletePelicula()" class="btn-delete">🗑 Eliminar</button>
            </div>
          </div>

          <!-- Info -->
          <div class="info-section">
            <span class="genero-badge">{{ pelicula()!.genero }}</span>
            <h1 class="titulo">{{ pelicula()!.titulo }}</h1>
            <div class="meta">
              <span>🎬 {{ pelicula()!.director }}</span>
              <span>📅 {{ pelicula()!.anio }}</span>
              <span [class.disponible]="pelicula()!.disponible" [class.no-disponible]="!pelicula()!.disponible">
                {{ pelicula()!.disponible ? '✅ Disponible' : '🔴 Alquilada' }}
              </span>
            </div>
            <p class="sinopsis" *ngIf="pelicula()!.sinopsis">{{ pelicula()!.sinopsis }}</p>

            <!-- Formulario alquiler -->
            <div class="alquiler-section" *ngIf="pelicula()!.disponible">
              <h3 class="section-title">📋 Nuevo Alquiler</h3>
              <form [formGroup]="alquilerForm" (ngSubmit)="crearAlquiler()" class="alquiler-form">
                <div class="form-group">
                  <label>Nombre del cliente *</label>
                  <input formControlName="nombreCliente" type="text" placeholder="Ej: Juan García" class="form-input" />
                  <span *ngIf="alquilerForm.get('nombreCliente')?.invalid && alquilerForm.get('nombreCliente')?.touched" class="form-error">
                    El nombre es obligatorio
                  </span>
                </div>
                <div class="form-group">
                  <label>Fecha de alquiler *</label>
                  <input formControlName="fechaAlquiler" type="date" class="form-input" />
                </div>
                <button type="submit" [disabled]="alquilerForm.invalid || alquilando()" class="btn-alquilar">
                  {{ alquilando() ? 'Procesando...' : '🎬 Confirmar Alquiler' }}
                </button>
                <span *ngIf="alquilerExito()" class="success-msg">✅ ¡Alquiler registrado!</span>
              </form>
            </div>

            <!-- Historial alquileres -->
            <div class="alquileres-section">
              <h3 class="section-title">📜 Historial de Alquileres ({{ alquileres().length }})</h3>
              <div *ngIf="alquileres().length === 0" class="empty-alquileres">No hay alquileres registrados</div>
              <div class="alquiler-item" *ngFor="let a of alquileres()">
                <div class="alquiler-info">
                  <strong>{{ a.nombreCliente }}</strong>
                  <span class="alquiler-fecha">{{ a.fechaAlquiler | date:'dd/MM/yyyy' }}</span>
                </div>
                <span class="estado-badge" [class]="'estado-' + a.estado.toLowerCase()">{{ a.estado }}</span>
                <button *ngIf="a.estado === 'ACTIVO'" (click)="devolverAlquiler(a.id!)" class="btn-devolver">Devolver</button>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .loading-state { text-align: center; padding: 4rem; color: #707070; }
    .spinner { width: 40px; height: 40px; border: 3px solid #333; border-top-color: #e5a00d; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .back-link { color: #e5a00d; text-decoration: none; font-size: 0.9rem; }
    .back-nav { margin-bottom: 2rem; }
    .detail-layout { display: grid; grid-template-columns: 300px 1fr; gap: 3rem; }
    .poster-frame { border-radius: 12px; overflow: hidden; aspect-ratio: 2/3; background: #1a1a1a; }
    .poster-frame img { width: 100%; height: 100%; object-fit: cover; }
    .poster-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
    .poster-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .btn-edit { flex: 1; text-align: center; padding: 0.6rem; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f0; text-decoration: none; font-size: 0.9rem; transition: border-color 0.2s; }
    .btn-edit:hover { border-color: #e5a00d; }
    .btn-delete { flex: 1; padding: 0.6rem; background: transparent; border: 1px solid #333; border-radius: 8px; color: #ef4444; cursor: pointer; font-size: 0.9rem; transition: border-color 0.2s; }
    .btn-delete:hover { border-color: #ef4444; }
    .genero-badge { color: #e5a00d; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
    .titulo { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 2.5rem; color: #f5f5f0; margin: 0.5rem 0; letter-spacing: 1px; }
    .meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.9rem; color: #a0a0a0; }
    .disponible { color: #22c55e; }
    .no-disponible { color: #ef4444; }
    .sinopsis { color: #b0b0b0; line-height: 1.7; margin-bottom: 2rem; }
    .section-title { color: #f5f5f0; font-size: 1rem; margin-bottom: 1rem; font-weight: 600; }
    .alquiler-section, .alquileres-section { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    .alquiler-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group label { font-size: 0.85rem; color: #a0a0a0; }
    .form-input { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 0.6rem 0.75rem; color: #f5f5f0; font-size: 0.95rem; }
    .form-input:focus { outline: none; border-color: #e5a00d; }
    .form-error { color: #ef4444; font-size: 0.8rem; }
    .btn-alquilar { background: #e5a00d; color: #0a0a0a; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
    .btn-alquilar:hover:not(:disabled) { background: #f0b429; }
    .btn-alquilar:disabled { opacity: 0.5; cursor: not-allowed; }
    .success-msg { color: #22c55e; font-size: 0.9rem; }
    .empty-alquileres { color: #606060; font-size: 0.9rem; }
    .alquiler-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid #222; }
    .alquiler-item:last-child { border-bottom: none; }
    .alquiler-info { flex: 1; display: flex; flex-direction: column; }
    .alquiler-info strong { color: #f5f5f0; font-size: 0.9rem; }
    .alquiler-fecha { color: #707070; font-size: 0.8rem; }
    .estado-badge { padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    .estado-activo { background: rgba(229,160,13,0.2); color: #e5a00d; }
    .estado-devuelto { background: rgba(34,197,94,0.2); color: #22c55e; }
    .estado-retrasado { background: rgba(239,68,68,0.2); color: #ef4444; }
    .btn-devolver { background: transparent; border: 1px solid #22c55e; color: #22c55e; padding: 0.3rem 0.7rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
    @media (max-width: 768px) {
      .detail-layout { grid-template-columns: 1fr; }
      .poster-frame { max-width: 250px; }
    }
  `]
})
export class PeliculaDetailComponent implements OnInit {
  pelicula = signal<Pelicula | null>(null);
  alquileres = signal<Alquiler[]>([]);
  loading = signal(true);
  alquilando = signal(false);
  alquilerExito = signal(false);
  alquilerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private alquilerService: AlquilerService,
    private fb: FormBuilder
  ) {
    this.alquilerForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(2)]],
      fechaAlquiler: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.peliculaService.getById(id).subscribe({
      next: (p) => {
        this.pelicula.set(p);
        this.loading.set(false);
        this.cargarAlquileres(id);
      },
      error: () => { this.loading.set(false); this.router.navigate(['/peliculas']); }
    });
  }

  cargarAlquileres(id: number) {
    this.peliculaService.getAlquileres(id).subscribe({
      next: (data) => this.alquileres.set(data),
      error: () => {}
    });
  }

  crearAlquiler() {
    if (this.alquilerForm.invalid) return;
    this.alquilando.set(true);
    const req = { ...this.alquilerForm.value, peliculaId: this.pelicula()!.id };
    this.alquilerService.create(req).subscribe({
      next: () => {
        this.alquilando.set(false);
        this.alquilerExito.set(true);
        this.alquilerForm.reset({ fechaAlquiler: new Date().toISOString().substring(0, 10) });
        this.cargarAlquileres(this.pelicula()!.id!);
        setTimeout(() => this.alquilerExito.set(false), 3000);
      },
      error: () => { this.alquilando.set(false); }
    });
  }

  devolverAlquiler(id: number) {
    this.alquilerService.devolver(id).subscribe({
      next: () => this.cargarAlquileres(this.pelicula()!.id!)
    });
  }

  deletePelicula() {
    if (confirm(`¿Eliminar "${this.pelicula()!.titulo}"?`)) {
      this.peliculaService.delete(this.pelicula()!.id!).subscribe({
        next: () => this.router.navigate(['/peliculas'])
      });
    }
  }

  onImgError(event: any) { event.target.style.display = 'none'; }
}

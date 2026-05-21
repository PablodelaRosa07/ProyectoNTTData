import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="back-nav">
        <a routerLink="/peliculas" class="back-link">← Volver al catálogo</a>
      </div>

      <div class="form-card">
        <h1 class="form-title">
          {{ isEdit() ? '✏️ Editar Película' : '🎬 Nueva Película' }}
        </h1>

        <form [formGroup]="peliculaForm" (ngSubmit)="onSubmit()" class="form-body">
          <!-- Columna izquierda: preview poster -->
          <div class="form-preview">
            <div class="poster-preview">
              <img *ngIf="posterPreview()" [src]="posterPreview()" alt="Portada" (error)="onImgError($event)" />
              <div *ngIf="!posterPreview()" class="preview-placeholder">
                <span>🎬</span>
                <p>Vista previa</p>
              </div>
            </div>
          </div>

          <!-- Columna derecha: campos -->
          <div class="form-fields">
            <div class="form-row">
              <div class="form-group">
                <label>Título *</label>
                <input formControlName="titulo" type="text" placeholder="Ej: El Padrino" class="form-input" />
                <span *ngIf="hasError('titulo', 'required')" class="form-error">El título es obligatorio</span>
              </div>
            </div>

            <div class="form-row two-col">
              <div class="form-group">
                <label>Director *</label>
                <input formControlName="director" type="text" placeholder="Ej: Francis Ford Coppola" class="form-input" />
                <span *ngIf="hasError('director', 'required')" class="form-error">El director es obligatorio</span>
              </div>
              <div class="form-group">
                <label>Año *</label>
                <input formControlName="anio" type="number" placeholder="Ej: 1972" class="form-input" min="1900" max="2030" />
                <span *ngIf="hasError('anio', 'required')" class="form-error">El año es obligatorio</span>
              </div>
            </div>

            <div class="form-group">
              <label>Género *</label>
              <select formControlName="genero" class="form-input">
                <option value="">-- Selecciona un género --</option>
                <option *ngFor="let g of generos" [value]="g">{{ g }}</option>
              </select>
              <span *ngIf="hasError('genero', 'required')" class="form-error">El género es obligatorio</span>
            </div>

            <div class="form-group">
              <label>URL Portada</label>
              <input formControlName="portadaUrl" type="url" placeholder="https://..." class="form-input"
                (input)="onPortadaChange($event)" />
            </div>

            <div class="form-group">
              <label>Sinopsis</label>
              <textarea formControlName="sinopsis" rows="4" placeholder="Descripción de la película..." class="form-input form-textarea"></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input formControlName="disponible" type="checkbox" class="form-checkbox" />
                <span>Disponible para alquiler</span>
              </label>
            </div>

            <div class="form-actions">
              <a routerLink="/peliculas" class="btn-cancel">Cancelar</a>
              <button type="submit" [disabled]="peliculaForm.invalid || saving()" class="btn-submit">
                {{ saving() ? 'Guardando...' : (isEdit() ? 'Guardar cambios' : 'Crear película') }}
              </button>
            </div>

            <div *ngIf="errorMsg()" class="error-banner">⚠️ {{ errorMsg() }}</div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .back-link { color: #e5a00d; text-decoration: none; font-size: 0.9rem; }
    .back-nav { margin-bottom: 2rem; }
    .form-card { background: #141414; border: 1px solid #222; border-radius: 16px; padding: 2rem; }
    .form-title { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 2rem; color: #f5f5f0; margin: 0 0 2rem; letter-spacing: 1px; }
    .form-body { display: grid; grid-template-columns: 220px 1fr; gap: 2rem; }
    .poster-preview { border-radius: 12px; overflow: hidden; aspect-ratio: 2/3; background: #1a1a1a; border: 1px solid #333; }
    .poster-preview img { width: 100%; height: 100%; object-fit: cover; }
    .preview-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #555; font-size: 0.9rem; }
    .preview-placeholder span { font-size: 3rem; margin-bottom: 0.5rem; }
    .form-fields { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-direction: column; gap: 1rem; }
    .two-col { flex-direction: row !important; }
    .two-col .form-group { flex: 1; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group label { font-size: 0.85rem; color: #a0a0a0; font-weight: 500; }
    .form-input { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 0.6rem 0.75rem; color: #f5f5f0; font-size: 0.95rem; width: 100%; box-sizing: border-box; }
    .form-input:focus { outline: none; border-color: #e5a00d; }
    .form-textarea { resize: vertical; font-family: inherit; }
    .form-error { color: #ef4444; font-size: 0.78rem; }
    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; color: #a0a0a0; cursor: pointer; }
    .form-checkbox { accent-color: #e5a00d; width: 16px; height: 16px; }
    .form-actions { display: flex; gap: 1rem; margin-top: 0.5rem; }
    .btn-cancel { flex: 1; text-align: center; padding: 0.75rem; border: 1px solid #333; border-radius: 8px; color: #a0a0a0; text-decoration: none; transition: border-color 0.2s; }
    .btn-cancel:hover { border-color: #a0a0a0; }
    .btn-submit { flex: 2; background: #e5a00d; color: #0a0a0a; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: background 0.2s; }
    .btn-submit:hover:not(:disabled) { background: #f0b429; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .error-banner { background: rgba(239,68,68,0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 0.75rem; color: #ef4444; font-size: 0.9rem; margin-top: 0.5rem; }
    @media (max-width: 600px) {
      .form-body { grid-template-columns: 1fr; }
      .two-col { flex-direction: column !important; }
    }
  `]
})
export class PeliculaFormComponent implements OnInit {
  peliculaForm: FormGroup;
  isEdit = signal(false);
  saving = signal(false);
  errorMsg = signal<string | null>(null);
  posterPreview = signal<string | null>(null);

  generos = ['Acción', 'Drama', 'Comedia', 'Thriller', 'Ciencia Ficción', 'Fantasía', 'Terror', 'Animación', 'Documental', 'Romance'];

  private peliculaId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private fb: FormBuilder
  ) {
    this.peliculaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      director: ['', Validators.required],
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(2030)]],
      genero: ['', Validators.required],
      sinopsis: [''],
      portadaUrl: [''],
      disponible: [true]
    });
  }

  ngOnInit() {
    this.peliculaId = Number(this.route.snapshot.paramMap.get('id')) || undefined;
    if (this.peliculaId) {
      this.isEdit.set(true);
      this.peliculaService.getById(this.peliculaId).subscribe({
        next: (p) => {
          this.peliculaForm.patchValue(p);
          if (p.portadaUrl) this.posterPreview.set(p.portadaUrl);
        },
        error: () => this.router.navigate(['/peliculas'])
      });
    }
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.peliculaForm.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }

  onPortadaChange(event: any) {
    const url = event.target.value;
    this.posterPreview.set(url || null);
  }

  onImgError(event: any) {
    event.target.style.display = 'none';
  }

  onSubmit() {
    if (this.peliculaForm.invalid) {
      this.peliculaForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.errorMsg.set(null);
    const data = this.peliculaForm.value;

    const op = this.isEdit()
      ? this.peliculaService.update(this.peliculaId!, data)
      : this.peliculaService.create(data);

    op.subscribe({
      next: (p) => {
        this.saving.set(false);
        this.router.navigate(['/peliculas', p.id]);
      },
      error: () => {
        this.saving.set(false);
        this.errorMsg.set('Error al guardar. Comprueba que el backend está activo.');
      }
    });
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pelicula-form.html',
  styleUrl: './pelicula-form.css'
})
export class PeliculaForm implements OnInit {
  private readonly fb = inject(FormBuilder);

  categorias = signal<Categoria[]>([]);
  enviado = signal(false);
  error = signal('');
  cargando = signal(false);
  editando = signal(false);
  peliculaId = signal<number | null>(null);

  formulario = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    director: ['', [Validators.required, Validators.minLength(2)]],
    anio: [2000, [Validators.required, Validators.min(1900), Validators.max(2100)]],
    disponible: [true, Validators.required],
    categoriaId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly peliculaService: PeliculaService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.editando.set(true);
      this.peliculaId.set(id);
      this.cargarPelicula(id);
    }

    this.categoriaService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
      error: () => this.error.set('No se han podido cargar las categorias.')
    });
  }

  guardar(): void {
    this.enviado.set(true);
    this.error.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando.set(true);

    const peliculaId = this.peliculaId();
    const peticion = this.editando() && peliculaId !== null
      ? this.peliculaService.actualizar(peliculaId, this.formulario.getRawValue())
      : this.peliculaService.crear(this.formulario.getRawValue());

    peticion.subscribe({
      next: (pelicula) => {
        const mensaje = this.editando()
          ? 'Pelicula actualizada correctamente.'
          : 'Pelicula creada correctamente.';

        this.router.navigate(['/peliculas', pelicula.id], { queryParams: { mensaje } });
      },
      error: () => {
        this.error.set('No se ha podido guardar la pelicula. Revisa los campos e intentalo de nuevo.');
        this.cargando.set(false);
      }
    });
  }

  campoNoValido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.invalid && (control.touched || this.enviado());
  }

  private cargarPelicula(id: number): void {
    this.cargando.set(true);
    this.peliculaService.detalle(id).subscribe({
      next: (pelicula) => {
        this.formulario.setValue({
          titulo: pelicula.titulo,
          director: pelicula.director,
          anio: pelicula.anio,
          disponible: pelicula.disponible,
          categoriaId: pelicula.categoriaId
        });
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se ha podido cargar la pelicula para editar.');
        this.cargando.set(false);
      }
    });
  }
}

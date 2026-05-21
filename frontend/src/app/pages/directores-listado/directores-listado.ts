import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Director } from '../../models/director';
import { DirectorService } from '../../services/director.service';

@Component({
  selector: 'app-directores-listado',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './directores-listado.html',
  styleUrl: './directores-listado.css'
})
export class DirectoresListado implements OnInit {
  directores = signal<Director[]>([]);
  cargando = signal(true);
  guardando = signal(false);
  enviado = signal(false);
  error = signal('');
  mensaje = signal('');
  editandoId = signal<number | null>(null);

  formulario;

  constructor(
    private readonly directorService: DirectorService,
    private readonly fb: FormBuilder
  ) {
    this.formulario = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.cargarDirectores();
  }

  guardar(): void {
    this.enviado.set(true);
    this.error.set('');
    this.mensaje.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando.set(true);

    const directorId = this.editandoId();
    const peticion = directorId === null
      ? this.directorService.crear(this.formulario.getRawValue())
      : this.directorService.actualizar(directorId, this.formulario.getRawValue());

    peticion.subscribe({
      next: (director) => {
        if (directorId === null) {
          this.directores.update((directores) => [...directores, director]);
          this.mensaje.set('Director anadido correctamente.');
        } else {
          this.directores.update((directores) =>
            directores.map((actual) => actual.id === director.id ? director : actual)
          );
          this.mensaje.set('Director actualizado correctamente.');
        }

        this.limpiarFormulario();
      },
      error: () => {
        this.error.set('No se ha podido guardar el director.');
        this.guardando.set(false);
      }
    });
  }

  editar(director: Director): void {
    this.editandoId.set(director.id);
    this.enviado.set(false);
    this.error.set('');
    this.mensaje.set('');
    this.formulario.setValue({ nombre: director.nombre });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  borrar(director: Director): void {
    const avisoPeliculas = director.totalPeliculas > 0
      ? ` Tambien se borraran ${director.totalPeliculas} peliculas asociadas.`
      : '';
    const confirmado = window.confirm(`Seguro que quieres borrar "${director.nombre}"?${avisoPeliculas}`);

    if (!confirmado) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    this.directorService.borrar(director.id).subscribe({
      next: () => {
        this.directores.update((directores) => directores.filter((actual) => actual.id !== director.id));
        if (this.editandoId() === director.id) {
          this.limpiarFormulario();
        }
        this.mensaje.set('Director borrado correctamente.');
      },
      error: () => this.error.set('No se ha podido borrar el director.')
    });
  }

  campoNoValido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.invalid && (control.touched || this.enviado());
  }

  private limpiarFormulario(): void {
    this.formulario.reset();
    this.editandoId.set(null);
    this.enviado.set(false);
    this.guardando.set(false);
  }

  private cargarDirectores(): void {
    this.cargando.set(true);
    this.directorService.listar().subscribe({
      next: (directores) => {
        this.directores.set(directores);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se han podido cargar los directores.');
        this.cargando.set(false);
      }
    });
  }
}

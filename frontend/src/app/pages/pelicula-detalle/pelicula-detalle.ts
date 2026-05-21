import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pelicula-detalle.html',
  styleUrl: './pelicula-detalle.css'
})
export class PeliculaDetalle implements OnInit {
  pelicula = signal<Pelicula | null>(null);
  error = signal('');
  mensaje = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mensaje.set(this.route.snapshot.queryParamMap.get('mensaje') ?? '');

    this.peliculaService.detalle(id).subscribe({
      next: (pelicula) => this.pelicula.set(pelicula),
      error: () => this.error.set('No se ha encontrado la pelicula.')
    });
  }

  borrar(): void {
    const pelicula = this.pelicula();

    if (!pelicula) {
      return;
    }

    const confirmado = window.confirm(`Seguro que quieres borrar "${pelicula.titulo}"?`);

    if (!confirmado) {
      return;
    }

    this.peliculaService.borrar(pelicula.id).subscribe({
      next: () => this.router.navigate(['/peliculas'], {
        queryParams: { mensaje: 'Pelicula borrada correctamente.' }
      }),
      error: () => this.error.set('No se ha podido borrar la pelicula.')
    });
  }
}

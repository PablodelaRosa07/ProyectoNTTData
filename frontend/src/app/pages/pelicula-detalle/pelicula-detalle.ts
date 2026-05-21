import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.peliculaService.detalle(id).subscribe({
      next: (pelicula) => this.pelicula.set(pelicula),
      error: () => this.error.set('No se ha encontrado la pelicula.')
    });
  }
}

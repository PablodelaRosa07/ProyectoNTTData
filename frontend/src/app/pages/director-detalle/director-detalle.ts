import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DirectorDetalle as DirectorDetalleModelo } from '../../models/director';
import { DirectorService } from '../../services/director.service';

@Component({
  selector: 'app-director-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './director-detalle.html',
  styleUrl: './director-detalle.css'
})
export class DirectorDetalle implements OnInit {
  director = signal<DirectorDetalleModelo | null>(null);
  error = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly directorService: DirectorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.directorService.detalle(id).subscribe({
      next: (director) => this.director.set(director),
      error: () => this.error.set('No se ha encontrado el director.')
    });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriaDetalle as CategoriaDetalleModelo } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categoria-detalle.html',
  styleUrl: './categoria-detalle.css'
})
export class CategoriaDetalle implements OnInit {
  categoria = signal<CategoriaDetalleModelo | null>(null);
  error = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.categoriaService.detalle(id).subscribe({
      next: (categoria) => this.categoria.set(categoria),
      error: () => this.error.set('No se ha encontrado la categoria.')
    });
  }
}

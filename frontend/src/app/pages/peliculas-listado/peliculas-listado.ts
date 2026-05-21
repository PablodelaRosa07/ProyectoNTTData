import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { Pelicula } from '../../models/pelicula';
import { CategoriaService } from '../../services/categoria.service';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas-listado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './peliculas-listado.html',
  styleUrl: './peliculas-listado.css'
})
export class PeliculasListado implements OnInit {
  peliculas = signal<Pelicula[]>([]);
  categorias = signal<Categoria[]>([]);
  cargando = signal(true);
  error = signal('');

  totalDisponibles = computed(() => this.peliculas().filter((pelicula) => pelicula.disponible).length);

  constructor(
    private readonly peliculaService: PeliculaService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.peliculaService.listar().subscribe({
      next: (peliculas) => {
        this.peliculas.set(peliculas);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se han podido cargar las peliculas.');
        this.cargando.set(false);
      }
    });

    this.categoriaService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
      error: () => this.error.set('No se han podido cargar las categorias.')
    });
  }
}

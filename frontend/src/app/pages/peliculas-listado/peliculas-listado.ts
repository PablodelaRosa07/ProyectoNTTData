import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { Director } from '../../models/director';
import { Pelicula } from '../../models/pelicula';
import { CategoriaService } from '../../services/categoria.service';
import { DirectorService } from '../../services/director.service';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas-listado',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './peliculas-listado.html',
  styleUrl: './peliculas-listado.css'
})
export class PeliculasListado implements OnInit {
  peliculas = signal<Pelicula[]>([]);
  categorias = signal<Categoria[]>([]);
  directores = signal<Director[]>([]);
  cargando = signal(true);
  error = signal('');
  mensaje = signal('');
  tituloFiltro = signal('');
  categoriaFiltro = signal(0);
  directorFiltro = signal(0);

  totalDisponibles = computed(() => this.peliculas().filter((pelicula) => pelicula.disponible).length);

  constructor(
    private readonly peliculaService: PeliculaService,
    private readonly categoriaService: CategoriaService,
    private readonly directorService: DirectorService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mensaje.set(this.route.snapshot.queryParamMap.get('mensaje') ?? '');
    this.cargarPeliculas();

    this.categoriaService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
      error: () => this.error.set('No se han podido cargar las categorias.')
    });

    this.directorService.listar().subscribe({
      next: (directores) => this.directores.set(directores),
      error: () => this.error.set('No se han podido cargar los directores.')
    });
  }

  buscar(): void {
    this.cargarPeliculas();
  }

  limpiarFiltros(): void {
    this.tituloFiltro.set('');
    this.categoriaFiltro.set(0);
    this.directorFiltro.set(0);
    this.cargarPeliculas();
  }

  borrar(pelicula: Pelicula): void {
    const confirmado = window.confirm(`Seguro que quieres borrar "${pelicula.titulo}"?`);

    if (!confirmado) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    this.peliculaService.borrar(pelicula.id).subscribe({
      next: () => {
        this.mensaje.set('Pelicula borrada correctamente.');
        this.cargarPeliculas();
      },
      error: () => this.error.set('No se ha podido borrar la pelicula.')
    });
  }

  private cargarPeliculas(): void {
    this.cargando.set(true);
    this.error.set('');

    this.peliculaService.listar({
      titulo: this.tituloFiltro(),
      categoriaId: this.categoriaFiltro(),
      directorId: this.directorFiltro()
    }).subscribe({
      next: (peliculas) => {
        this.peliculas.set(peliculas);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se han podido cargar las peliculas. Revisa los filtros o la conexion.');
        this.cargando.set(false);
      }
    });
  }
}

import { Routes } from '@angular/router';
import { CategoriaDetalle } from './pages/categoria-detalle/categoria-detalle';
import { PeliculaDetalle } from './pages/pelicula-detalle/pelicula-detalle';
import { PeliculaForm } from './pages/pelicula-form/pelicula-form';
import { PeliculasListado } from './pages/peliculas-listado/peliculas-listado';

export const routes: Routes = [
  { path: '', redirectTo: 'peliculas', pathMatch: 'full' },
  { path: 'peliculas', component: PeliculasListado },
  { path: 'peliculas/nueva', component: PeliculaForm },
  { path: 'peliculas/:id', component: PeliculaDetalle },
  { path: 'categorias/:id', component: CategoriaDetalle },
  { path: '**', redirectTo: 'peliculas' }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full'
  },
  {
    path: 'peliculas',
    loadComponent: () =>
      import('./components/peliculas/peliculas.component').then(m => m.PeliculasComponent)
  },
  {
    path: 'peliculas/nueva',
    loadComponent: () =>
      import('./components/pelicula-form/pelicula-form.component').then(m => m.PeliculaFormComponent)
  },
  {
    path: 'peliculas/:id',
    loadComponent: () =>
      import('./components/pelicula-detail/pelicula-detail.component').then(m => m.PeliculaDetailComponent)
  },
  {
    path: 'peliculas/:id/editar',
    loadComponent: () =>
      import('./components/pelicula-form/pelicula-form.component').then(m => m.PeliculaFormComponent)
  },
  {
    path: 'alquileres',
    loadComponent: () =>
      import('./components/alquileres/alquileres.component').then(m => m.AlquileresComponent)
  },
  {
    path: '**',
    redirectTo: 'peliculas'
  }
];

package com.warlocksai.videoclub.config;

import com.warlocksai.videoclub.model.Alquiler;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.AlquilerRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PeliculaRepository peliculaRepository;
    private final AlquilerRepository alquilerRepository;

    @Override
    public void run(String... args) {
        // Peliculas
        Pelicula p1 = peliculaRepository.save(Pelicula.builder()
                .titulo("El Padrino").director("Francis Ford Coppola").anio(1972)
                .genero("Drama").disponible(true)
                .sinopsis("La historia de la familia mafiosa Corleone y su sucesor Michael.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmfw5T.jpg").build());

        Pelicula p2 = peliculaRepository.save(Pelicula.builder()
                .titulo("Blade Runner 2049").director("Denis Villeneuve").anio(2017)
                .genero("Ciencia Ficción").disponible(true)
                .sinopsis("Un replicante descubre un secreto que podría hundir lo que queda de la sociedad.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg").build());

        Pelicula p3 = peliculaRepository.save(Pelicula.builder()
                .titulo("Interestelar").director("Christopher Nolan").anio(2014)
                .genero("Ciencia Ficción").disponible(false)
                .sinopsis("Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg").build());

        Pelicula p4 = peliculaRepository.save(Pelicula.builder()
                .titulo("Pulp Fiction").director("Quentin Tarantino").anio(1994)
                .genero("Thriller").disponible(true)
                .sinopsis("Las vidas de dos sicarios, un boxeador, un gángster y su esposa se entrelazan en cuatro historias.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg").build());

        Pelicula p5 = peliculaRepository.save(Pelicula.builder()
                .titulo("El Señor de los Anillos: La Comunidad del Anillo").director("Peter Jackson").anio(2001)
                .genero("Fantasía").disponible(true)
                .sinopsis("Un hobbit emprende una peligrosa misión para destruir el Anillo Único.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg").build());

        Pelicula p6 = peliculaRepository.save(Pelicula.builder()
                .titulo("Matrix").director("Wachowski Sisters").anio(1999)
                .genero("Ciencia Ficción").disponible(true)
                .sinopsis("Un programador descubre que la realidad tal como la conocemos es una simulación.")
                .portadaUrl("https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg").build());

        // Alquileres de ejemplo
        alquilerRepository.saveAll(List.of(
                Alquiler.builder().nombreCliente("Carlos García").fechaAlquiler(LocalDate.now().minusDays(5))
                        .pelicula(p3).estado(Alquiler.EstadoAlquiler.ACTIVO).build(),
                Alquiler.builder().nombreCliente("Ana Martínez").fechaAlquiler(LocalDate.now().minusDays(10))
                        .fechaDevolucion(LocalDate.now().minusDays(3))
                        .pelicula(p1).estado(Alquiler.EstadoAlquiler.DEVUELTO).build(),
                Alquiler.builder().nombreCliente("Luis Rodríguez").fechaAlquiler(LocalDate.now().minusDays(2))
                        .pelicula(p2).estado(Alquiler.EstadoAlquiler.ACTIVO).build(),
                Alquiler.builder().nombreCliente("María López").fechaAlquiler(LocalDate.now().minusDays(15))
                        .fechaDevolucion(LocalDate.now().minusDays(8))
                        .pelicula(p1).estado(Alquiler.EstadoAlquiler.DEVUELTO).build()
        ));

        System.out.println("✅ Datos de ejemplo cargados: " + peliculaRepository.count() + " películas, " + alquilerRepository.count() + " alquileres.");
    }
}

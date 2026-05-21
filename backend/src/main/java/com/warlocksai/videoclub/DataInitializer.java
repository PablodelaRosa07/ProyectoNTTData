package com.warlocksai.videoclub;

import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.CategoriaRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final PeliculaRepository peliculaRepository;

    public DataInitializer(CategoriaRepository categoriaRepository, PeliculaRepository peliculaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.peliculaRepository = peliculaRepository;
    }

    @Override
    public void run(String... args) {
        Categoria accion = categoriaRepository.save(new Categoria("Accion", "Peliculas con persecuciones y aventuras"));
        Categoria comedia = categoriaRepository.save(new Categoria("Comedia", "Historias para pasar un buen rato"));
        Categoria cienciaFiccion = categoriaRepository.save(new Categoria("Ciencia ficcion", "Viajes, tecnologia y futuros posibles"));

        peliculaRepository.save(new Pelicula("Matrix", "Lana Wachowski y Lilly Wachowski", 1999, true, cienciaFiccion));
        peliculaRepository.save(new Pelicula("Regreso al futuro", "Robert Zemeckis", 1985, true, cienciaFiccion));
        peliculaRepository.save(new Pelicula("Jungla de cristal", "John McTiernan", 1988, false, accion));
        peliculaRepository.save(new Pelicula("Aterriza como puedas", "Jim Abrahams", 1980, true, comedia));
    }
}

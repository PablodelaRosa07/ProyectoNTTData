package com.warlocksai.videoclub;

import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.model.Director;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.CategoriaRepository;
import com.warlocksai.videoclub.repository.DirectorRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final DirectorRepository directorRepository;
    private final PeliculaRepository peliculaRepository;

    public DataInitializer(
            CategoriaRepository categoriaRepository,
            DirectorRepository directorRepository,
            PeliculaRepository peliculaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.directorRepository = directorRepository;
        this.peliculaRepository = peliculaRepository;
    }

    @Override
    public void run(String... args) {
        Categoria accion = categoriaRepository.save(new Categoria("Accion", "Peliculas con persecuciones y aventuras"));
        Categoria comedia = categoriaRepository.save(new Categoria("Comedia", "Historias para pasar un buen rato"));
        Categoria cienciaFiccion = categoriaRepository.save(new Categoria("Ciencia ficcion", "Viajes, tecnologia y futuros posibles"));

        Director wachowski = directorRepository.save(new Director("Lana Wachowski y Lilly Wachowski"));
        Director zemeckis = directorRepository.save(new Director("Robert Zemeckis"));
        Director mctiernan = directorRepository.save(new Director("John McTiernan"));
        Director abrahams = directorRepository.save(new Director("Jim Abrahams"));

        peliculaRepository.save(new Pelicula("Matrix", wachowski, 1999, true, cienciaFiccion));
        peliculaRepository.save(new Pelicula("Regreso al futuro", zemeckis, 1985, true, cienciaFiccion));
        peliculaRepository.save(new Pelicula("Jungla de cristal", mctiernan, 1988, false, accion));
        peliculaRepository.save(new Pelicula("Aterriza como puedas", abrahams, 1980, true, comedia));
    }
}

package com.warlocksai.videoclub.repository;

import com.warlocksai.videoclub.model.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    List<Pelicula> findByGeneroIgnoreCase(String genero);
    List<Pelicula> findByDisponibleTrue();
    List<Pelicula> findByTituloContainingIgnoreCase(String titulo);
}

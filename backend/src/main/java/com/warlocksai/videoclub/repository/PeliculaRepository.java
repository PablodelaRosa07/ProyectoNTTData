package com.warlocksai.videoclub.repository;

import com.warlocksai.videoclub.model.Pelicula;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    List<Pelicula> findByCategoriaId(Long categoriaId);
}

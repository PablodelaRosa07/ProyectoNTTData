package com.warlocksai.videoclub.repository;

import com.warlocksai.videoclub.model.Pelicula;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    List<Pelicula> findByCategoriaId(Long categoriaId);

    List<Pelicula> findByDirectorId(Long directorId);

    @Query("""
            select p from Pelicula p
            where (:titulo = '' or lower(p.titulo) like lower(concat('%', :titulo, '%')))
              and (:categoriaId is null or p.categoria.id = :categoriaId)
              and (:directorId is null or p.director.id = :directorId)
            """)
    List<Pelicula> buscar(
            @Param("titulo") String titulo,
            @Param("categoriaId") Long categoriaId,
            @Param("directorId") Long directorId);
}

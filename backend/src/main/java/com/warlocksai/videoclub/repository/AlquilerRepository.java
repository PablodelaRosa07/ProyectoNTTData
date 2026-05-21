package com.warlocksai.videoclub.repository;

import com.warlocksai.videoclub.model.Alquiler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {
    List<Alquiler> findByPeliculaId(Long peliculaId);
    List<Alquiler> findByNombreClienteContainingIgnoreCase(String nombre);
    List<Alquiler> findByEstado(Alquiler.EstadoAlquiler estado);
}

package com.warlocksai.videoclub.repository;

import com.warlocksai.videoclub.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}

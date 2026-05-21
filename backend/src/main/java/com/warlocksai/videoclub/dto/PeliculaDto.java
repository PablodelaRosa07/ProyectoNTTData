package com.warlocksai.videoclub.dto;

public record PeliculaDto(
        Long id,
        String titulo,
        String director,
        Long directorId,
        String directorNombre,
        Integer anio,
        Boolean disponible,
        Long categoriaId,
        String categoriaNombre) {
}

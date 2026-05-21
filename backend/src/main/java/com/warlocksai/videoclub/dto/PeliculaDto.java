package com.warlocksai.videoclub.dto;

public record PeliculaDto(
        Long id,
        String titulo,
        String director,
        Integer anio,
        Boolean disponible,
        Long categoriaId,
        String categoriaNombre) {
}

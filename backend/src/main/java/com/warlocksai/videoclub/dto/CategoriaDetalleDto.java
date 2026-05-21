package com.warlocksai.videoclub.dto;

import java.util.List;

public record CategoriaDetalleDto(Long id, String nombre, String descripcion, List<PeliculaDto> peliculas) {
}

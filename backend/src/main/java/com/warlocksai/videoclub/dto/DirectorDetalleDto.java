package com.warlocksai.videoclub.dto;

import java.util.List;

public record DirectorDetalleDto(Long id, String nombre, List<PeliculaDto> peliculas) {
}

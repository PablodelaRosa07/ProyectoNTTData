package com.warlocksai.videoclub.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CrearPeliculaRequest(
        @NotBlank(message = "El titulo es obligatorio") String titulo,
        @NotNull(message = "El director es obligatorio") Long directorId,
        @NotNull(message = "El anio es obligatorio") @Min(1900) @Max(2100) Integer anio,
        @NotNull(message = "La disponibilidad es obligatoria") Boolean disponible,
        @NotNull(message = "La categoria es obligatoria") Long categoriaId) {
}

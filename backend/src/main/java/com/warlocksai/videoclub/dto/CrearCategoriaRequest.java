package com.warlocksai.videoclub.dto;

import jakarta.validation.constraints.NotBlank;

public record CrearCategoriaRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        String descripcion) {
}

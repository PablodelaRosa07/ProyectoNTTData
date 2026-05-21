package com.warlocksai.videoclub.dto;

import jakarta.validation.constraints.NotBlank;

public record CrearDirectorRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre) {
}

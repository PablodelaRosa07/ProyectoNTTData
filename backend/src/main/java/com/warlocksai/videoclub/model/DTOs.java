package com.warlocksai.videoclub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

public class DTOs {

    @Data
    public static class PeliculaRequest {
        @NotBlank(message = "El título es obligatorio")
        private String titulo;
        @NotBlank(message = "El director es obligatorio")
        private String director;
        @NotNull(message = "El año es obligatorio")
        private Integer anio;
        @NotBlank(message = "El género es obligatorio")
        private String genero;
        private String sinopsis;
        private String portadaUrl;
        private Boolean disponible = true;
    }

    @Data
    public static class AlquilerRequest {
        @NotBlank(message = "El nombre del cliente es obligatorio")
        private String nombreCliente;
        @NotNull(message = "La fecha de alquiler es obligatoria")
        private LocalDate fechaAlquiler;
        private LocalDate fechaDevolucion;
        @NotNull(message = "El ID de la película es obligatorio")
        private Long peliculaId;
    }

    @Data
    public static class AlquilerResponse {
        private Long id;
        private String nombreCliente;
        private LocalDate fechaAlquiler;
        private LocalDate fechaDevolucion;
        private Alquiler.EstadoAlquiler estado;
        private Long peliculaId;
        private String peliculaTitulo;
    }
}

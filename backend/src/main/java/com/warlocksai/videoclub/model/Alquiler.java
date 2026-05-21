package com.warlocksai.videoclub.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "alquileres")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombreCliente;

    @NotNull
    private LocalDate fechaAlquiler;

    private LocalDate fechaDevolucion;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EstadoAlquiler estado = EstadoAlquiler.ACTIVO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pelicula_id", nullable = false)
    @JsonBackReference
    private Pelicula pelicula;

    public enum EstadoAlquiler {
        ACTIVO, DEVUELTO, RETRASADO
    }
}

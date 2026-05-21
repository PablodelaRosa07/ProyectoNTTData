package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.model.DTOs.AlquilerResponse;
import com.warlocksai.videoclub.model.DTOs.PeliculaRequest;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.service.AlquilerService;
import com.warlocksai.videoclub.service.PeliculaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PeliculaController {

    private final PeliculaService peliculaService;
    private final AlquilerService alquilerService;

    // GET /api/peliculas - Listar todas
    @GetMapping
    public ResponseEntity<List<Pelicula>> getAll(
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean disponible) {

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(peliculaService.search(search));
        }
        if (genero != null && !genero.isBlank()) {
            return ResponseEntity.ok(peliculaService.findByGenero(genero));
        }
        if (Boolean.TRUE.equals(disponible)) {
            return ResponseEntity.ok(peliculaService.findDisponibles());
        }
        return ResponseEntity.ok(peliculaService.findAll());
    }

    // GET /api/peliculas/{id} - Ver detalle
    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> getById(@PathVariable Long id) {
        return ResponseEntity.ok(peliculaService.findById(id));
    }

    // GET /api/peliculas/{id}/alquileres - Relación 1:M
    @GetMapping("/{id}/alquileres")
    public ResponseEntity<List<AlquilerResponse>> getAlquileres(@PathVariable Long id) {
        return ResponseEntity.ok(alquilerService.findByPelicula(id));
    }

    // POST /api/peliculas - Crear
    @PostMapping
    public ResponseEntity<Pelicula> create(@Valid @RequestBody PeliculaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(peliculaService.create(request));
    }

    // PUT /api/peliculas/{id} - Editar
    @PutMapping("/{id}")
    public ResponseEntity<Pelicula> update(@PathVariable Long id, @Valid @RequestBody PeliculaRequest request) {
        return ResponseEntity.ok(peliculaService.update(id, request));
    }

    // DELETE /api/peliculas/{id} - Borrar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        peliculaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

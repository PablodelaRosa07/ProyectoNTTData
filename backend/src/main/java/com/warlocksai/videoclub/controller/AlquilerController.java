package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.model.DTOs.AlquilerRequest;
import com.warlocksai.videoclub.model.DTOs.AlquilerResponse;
import com.warlocksai.videoclub.service.AlquilerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alquileres")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlquilerController {

    private final AlquilerService alquilerService;

    // GET /api/alquileres - Listar todos
    @GetMapping
    public ResponseEntity<List<AlquilerResponse>> getAll() {
        return ResponseEntity.ok(alquilerService.findAll());
    }

    // GET /api/alquileres/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AlquilerResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(alquilerService.findById(id));
    }

    // POST /api/alquileres - Crear alquiler
    @PostMapping
    public ResponseEntity<AlquilerResponse> create(@Valid @RequestBody AlquilerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alquilerService.create(request));
    }

    // PATCH /api/alquileres/{id}/devolver - Marcar como devuelto
    @PatchMapping("/{id}/devolver")
    public ResponseEntity<AlquilerResponse> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(alquilerService.devolver(id));
    }

    // DELETE /api/alquileres/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alquilerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

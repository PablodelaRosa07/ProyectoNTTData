package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.dto.CrearPeliculaRequest;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.service.PeliculaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/peliculas")
@CrossOrigin(origins = "http://localhost:4200")
public class PeliculaController {

    private final PeliculaService peliculaService;

    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    @GetMapping
    public List<PeliculaDto> listar(
            @RequestParam(defaultValue = "") String titulo,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Long directorId) {

        return peliculaService.listar(titulo, categoriaId, directorId);
    }

    @GetMapping("/{id}")
    public PeliculaDto detalle(@PathVariable Long id) {
        return peliculaService.detalle(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PeliculaDto crear(@Valid @RequestBody CrearPeliculaRequest request) {
        return peliculaService.crear(request);
    }

    @PutMapping("/{id}")
    public PeliculaDto actualizar(@PathVariable Long id, @Valid @RequestBody CrearPeliculaRequest request) {
        return peliculaService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable Long id) {
        peliculaService.borrar(id);
    }
}

package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.dto.CrearDirectorRequest;
import com.warlocksai.videoclub.dto.DirectorDetalleDto;
import com.warlocksai.videoclub.dto.DirectorDto;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.service.DirectorService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/directores")
@CrossOrigin(origins = "http://localhost:4200")
public class DirectorController {

    private final DirectorService directorService;

    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping
    public List<DirectorDto> listar() {
        return directorService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DirectorDto crear(@Valid @RequestBody CrearDirectorRequest request) {
        return directorService.crear(request);
    }

    @PutMapping("/{id}")
    public DirectorDto actualizar(@PathVariable Long id, @Valid @RequestBody CrearDirectorRequest request) {
        return directorService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable Long id) {
        directorService.borrar(id);
    }

    @GetMapping("/{id}")
    public DirectorDetalleDto detalle(@PathVariable Long id) {
        return directorService.detalle(id);
    }

    @GetMapping("/{id}/peliculas")
    public List<PeliculaDto> peliculasPorDirector(@PathVariable Long id) {
        return directorService.peliculasPorDirector(id);
    }
}

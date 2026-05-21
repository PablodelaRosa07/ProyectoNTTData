package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.dto.CrearPeliculaRequest;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.CategoriaRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/peliculas")
@CrossOrigin(origins = "http://localhost:4200")
public class PeliculaController {

    private final PeliculaRepository peliculaRepository;
    private final CategoriaRepository categoriaRepository;

    public PeliculaController(PeliculaRepository peliculaRepository, CategoriaRepository categoriaRepository) {
        this.peliculaRepository = peliculaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public List<PeliculaDto> listar() {
        return peliculaRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public PeliculaDto detalle(@PathVariable Long id) {
        return peliculaRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pelicula no encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PeliculaDto crear(@Valid @RequestBody CrearPeliculaRequest request) {
        Categoria categoria = categoriaRepository.findById(request.categoriaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria no valida"));

        Pelicula pelicula = new Pelicula(
                request.titulo(),
                request.director(),
                request.anio(),
                request.disponible(),
                categoria);

        return toDto(peliculaRepository.save(pelicula));
    }

    private PeliculaDto toDto(Pelicula pelicula) {
        Categoria categoria = pelicula.getCategoria();
        return new PeliculaDto(
                pelicula.getId(),
                pelicula.getTitulo(),
                pelicula.getDirector(),
                pelicula.getAnio(),
                pelicula.getDisponible(),
                categoria.getId(),
                categoria.getNombre());
    }
}

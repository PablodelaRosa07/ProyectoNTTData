package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.dto.CategoriaDetalleDto;
import com.warlocksai.videoclub.dto.CategoriaDto;
import com.warlocksai.videoclub.dto.CrearCategoriaRequest;
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
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;
    private final PeliculaRepository peliculaRepository;

    public CategoriaController(CategoriaRepository categoriaRepository, PeliculaRepository peliculaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.peliculaRepository = peliculaRepository;
    }

    @GetMapping
    public List<CategoriaDto> listar() {
        return categoriaRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public CategoriaDetalleDto detalle(@PathVariable Long id) {
        Categoria categoria = buscarCategoria(id);
        List<PeliculaDto> peliculas = peliculaRepository.findByCategoriaId(id).stream()
                .map(this::toPeliculaDto)
                .toList();

        return new CategoriaDetalleDto(categoria.getId(), categoria.getNombre(), categoria.getDescripcion(), peliculas);
    }

    @GetMapping("/{id}/peliculas")
    public List<PeliculaDto> peliculasPorCategoria(@PathVariable Long id) {
        buscarCategoria(id);
        return peliculaRepository.findByCategoriaId(id).stream()
                .map(this::toPeliculaDto)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDto crear(@Valid @RequestBody CrearCategoriaRequest request) {
        Categoria categoria = new Categoria(request.nombre(), request.descripcion());
        return toDto(categoriaRepository.save(categoria));
    }

    private Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada"));
    }

    private CategoriaDto toDto(Categoria categoria) {
        return new CategoriaDto(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion(),
                categoria.getPeliculas().size());
    }

    private PeliculaDto toPeliculaDto(Pelicula pelicula) {
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

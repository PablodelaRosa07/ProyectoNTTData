package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.dto.CrearPeliculaRequest;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.model.Director;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.CategoriaRepository;
import com.warlocksai.videoclub.repository.DirectorRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PeliculaService {

    private final PeliculaRepository peliculaRepository;
    private final CategoriaRepository categoriaRepository;
    private final DirectorRepository directorRepository;
    private final PeliculaMapper mapper;

    public PeliculaService(
            PeliculaRepository peliculaRepository,
            CategoriaRepository categoriaRepository,
            DirectorRepository directorRepository,
            PeliculaMapper mapper) {
        this.peliculaRepository = peliculaRepository;
        this.categoriaRepository = categoriaRepository;
        this.directorRepository = directorRepository;
        this.mapper = mapper;
    }

    public List<PeliculaDto> listar(String titulo, Long categoriaId, Long directorId) {
        return peliculaRepository.buscar(titulo, categoriaId, directorId).stream()
                .map(mapper::toPeliculaDto)
                .toList();
    }

    public PeliculaDto detalle(Long id) {
        return peliculaRepository.findById(id)
                .map(mapper::toPeliculaDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pelicula no encontrada"));
    }

    public PeliculaDto crear(CrearPeliculaRequest request) {
        Categoria categoria = buscarCategoria(request.categoriaId());
        Director director = buscarDirector(request.directorId());

        Pelicula pelicula = new Pelicula(
                request.titulo(),
                director,
                request.anio(),
                request.disponible(),
                categoria);

        return mapper.toPeliculaDto(peliculaRepository.save(pelicula));
    }

    public PeliculaDto actualizar(Long id, CrearPeliculaRequest request) {
        Pelicula pelicula = peliculaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pelicula no encontrada"));
        Categoria categoria = buscarCategoria(request.categoriaId());
        Director director = buscarDirector(request.directorId());

        pelicula.setTitulo(request.titulo());
        pelicula.setDirector(director);
        pelicula.setAnio(request.anio());
        pelicula.setDisponible(request.disponible());
        pelicula.setCategoria(categoria);

        return mapper.toPeliculaDto(peliculaRepository.save(pelicula));
    }

    public void borrar(Long id) {
        if (!peliculaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pelicula no encontrada");
        }

        peliculaRepository.deleteById(id);
    }

    private Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria no valida"));
    }

    private Director buscarDirector(Long id) {
        return directorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Director no valido"));
    }
}

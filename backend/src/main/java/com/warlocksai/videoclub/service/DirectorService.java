package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.dto.CrearDirectorRequest;
import com.warlocksai.videoclub.dto.DirectorDetalleDto;
import com.warlocksai.videoclub.dto.DirectorDto;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.model.Director;
import com.warlocksai.videoclub.repository.DirectorRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DirectorService {

    private final DirectorRepository directorRepository;
    private final PeliculaRepository peliculaRepository;
    private final PeliculaMapper mapper;

    public DirectorService(
            DirectorRepository directorRepository,
            PeliculaRepository peliculaRepository,
            PeliculaMapper mapper) {
        this.directorRepository = directorRepository;
        this.peliculaRepository = peliculaRepository;
        this.mapper = mapper;
    }

    public List<DirectorDto> listar() {
        return directorRepository.findAll().stream()
                .map(mapper::toDirectorDto)
                .toList();
    }

    public DirectorDto crear(CrearDirectorRequest request) {
        Director director = new Director(request.nombre());
        return mapper.toDirectorDto(directorRepository.save(director));
    }

    public DirectorDto actualizar(Long id, CrearDirectorRequest request) {
        Director director = buscarDirector(id);
        director.setNombre(request.nombre());
        return mapper.toDirectorDto(directorRepository.save(director));
    }

    public void borrar(Long id) {
        Director director = buscarDirector(id);
        directorRepository.delete(director);
    }

    public DirectorDetalleDto detalle(Long id) {
        Director director = buscarDirector(id);
        List<PeliculaDto> peliculas = peliculasPorDirector(id);

        return new DirectorDetalleDto(director.getId(), director.getNombre(), peliculas);
    }

    public List<PeliculaDto> peliculasPorDirector(Long id) {
        buscarDirector(id);
        return peliculaRepository.findByDirectorId(id).stream()
                .map(mapper::toPeliculaDto)
                .toList();
    }

    private Director buscarDirector(Long id) {
        return directorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Director no encontrado"));
    }
}

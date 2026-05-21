package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.model.DTOs.PeliculaRequest;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeliculaService {

    private final PeliculaRepository peliculaRepository;

    public List<Pelicula> findAll() {
        return peliculaRepository.findAll();
    }

    public Pelicula findById(Long id) {
        return peliculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Película no encontrada con id: " + id));
    }

    public List<Pelicula> findDisponibles() {
        return peliculaRepository.findByDisponibleTrue();
    }

    public List<Pelicula> findByGenero(String genero) {
        return peliculaRepository.findByGeneroIgnoreCase(genero);
    }

    public List<Pelicula> search(String titulo) {
        return peliculaRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public Pelicula create(PeliculaRequest request) {
        Pelicula pelicula = Pelicula.builder()
                .titulo(request.getTitulo())
                .director(request.getDirector())
                .anio(request.getAnio())
                .genero(request.getGenero())
                .sinopsis(request.getSinopsis())
                .portadaUrl(request.getPortadaUrl())
                .disponible(request.getDisponible() != null ? request.getDisponible() : true)
                .build();
        return peliculaRepository.save(pelicula);
    }

    public Pelicula update(Long id, PeliculaRequest request) {
        Pelicula pelicula = findById(id);
        pelicula.setTitulo(request.getTitulo());
        pelicula.setDirector(request.getDirector());
        pelicula.setAnio(request.getAnio());
        pelicula.setGenero(request.getGenero());
        pelicula.setSinopsis(request.getSinopsis());
        pelicula.setPortadaUrl(request.getPortadaUrl());
        if (request.getDisponible() != null) pelicula.setDisponible(request.getDisponible());
        return peliculaRepository.save(pelicula);
    }

    public void delete(Long id) {
        findById(id);
        peliculaRepository.deleteById(id);
    }
}

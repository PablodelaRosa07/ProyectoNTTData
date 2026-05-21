package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.model.Alquiler;
import com.warlocksai.videoclub.model.DTOs.AlquilerRequest;
import com.warlocksai.videoclub.model.DTOs.AlquilerResponse;
import com.warlocksai.videoclub.model.Pelicula;
import com.warlocksai.videoclub.repository.AlquilerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlquilerService {

    private final AlquilerRepository alquilerRepository;
    private final PeliculaService peliculaService;

    public List<AlquilerResponse> findAll() {
        return alquilerRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AlquilerResponse findById(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alquiler no encontrado con id: " + id));
        return toResponse(alquiler);
    }

    public List<AlquilerResponse> findByPelicula(Long peliculaId) {
        return alquilerRepository.findByPeliculaId(peliculaId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AlquilerResponse create(AlquilerRequest request) {
        Pelicula pelicula = peliculaService.findById(request.getPeliculaId());
        Alquiler alquiler = Alquiler.builder()
                .nombreCliente(request.getNombreCliente())
                .fechaAlquiler(request.getFechaAlquiler())
                .fechaDevolucion(request.getFechaDevolucion())
                .pelicula(pelicula)
                .estado(Alquiler.EstadoAlquiler.ACTIVO)
                .build();
        return toResponse(alquilerRepository.save(alquiler));
    }

    public AlquilerResponse devolver(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alquiler no encontrado con id: " + id));
        alquiler.setEstado(Alquiler.EstadoAlquiler.DEVUELTO);
        return toResponse(alquilerRepository.save(alquiler));
    }

    public void delete(Long id) {
        alquilerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alquiler no encontrado con id: " + id));
        alquilerRepository.deleteById(id);
    }

    private AlquilerResponse toResponse(Alquiler a) {
        AlquilerResponse r = new AlquilerResponse();
        r.setId(a.getId());
        r.setNombreCliente(a.getNombreCliente());
        r.setFechaAlquiler(a.getFechaAlquiler());
        r.setFechaDevolucion(a.getFechaDevolucion());
        r.setEstado(a.getEstado());
        r.setPeliculaId(a.getPelicula().getId());
        r.setPeliculaTitulo(a.getPelicula().getTitulo());
        return r;
    }
}

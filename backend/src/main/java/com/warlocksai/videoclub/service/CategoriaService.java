package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.dto.CategoriaDetalleDto;
import com.warlocksai.videoclub.dto.CategoriaDto;
import com.warlocksai.videoclub.dto.CrearCategoriaRequest;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.repository.CategoriaRepository;
import com.warlocksai.videoclub.repository.PeliculaRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final PeliculaRepository peliculaRepository;
    private final PeliculaMapper mapper;

    public CategoriaService(
            CategoriaRepository categoriaRepository,
            PeliculaRepository peliculaRepository,
            PeliculaMapper mapper) {
        this.categoriaRepository = categoriaRepository;
        this.peliculaRepository = peliculaRepository;
        this.mapper = mapper;
    }

    public List<CategoriaDto> listar() {
        return categoriaRepository.findAll().stream()
                .map(mapper::toCategoriaDto)
                .toList();
    }

    public CategoriaDetalleDto detalle(Long id) {
        Categoria categoria = buscarCategoria(id);
        List<PeliculaDto> peliculas = peliculasPorCategoria(id);

        return new CategoriaDetalleDto(categoria.getId(), categoria.getNombre(), categoria.getDescripcion(), peliculas);
    }

    public List<PeliculaDto> peliculasPorCategoria(Long id) {
        buscarCategoria(id);
        return peliculaRepository.findByCategoriaId(id).stream()
                .map(mapper::toPeliculaDto)
                .toList();
    }

    public CategoriaDto crear(CrearCategoriaRequest request) {
        Categoria categoria = new Categoria(request.nombre(), request.descripcion());
        return mapper.toCategoriaDto(categoriaRepository.save(categoria));
    }

    private Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada"));
    }
}

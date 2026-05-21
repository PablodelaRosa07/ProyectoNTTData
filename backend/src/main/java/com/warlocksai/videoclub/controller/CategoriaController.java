package com.warlocksai.videoclub.controller;

import com.warlocksai.videoclub.dto.CategoriaDetalleDto;
import com.warlocksai.videoclub.dto.CategoriaDto;
import com.warlocksai.videoclub.dto.CrearCategoriaRequest;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.service.CategoriaService;
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

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public List<CategoriaDto> listar() {
        return categoriaService.listar();
    }

    @GetMapping("/{id}")
    public CategoriaDetalleDto detalle(@PathVariable Long id) {
        return categoriaService.detalle(id);
    }

    @GetMapping("/{id}/peliculas")
    public List<PeliculaDto> peliculasPorCategoria(@PathVariable Long id) {
        return categoriaService.peliculasPorCategoria(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDto crear(@Valid @RequestBody CrearCategoriaRequest request) {
        return categoriaService.crear(request);
    }
}

package com.warlocksai.videoclub.service;

import com.warlocksai.videoclub.dto.CategoriaDto;
import com.warlocksai.videoclub.dto.DirectorDto;
import com.warlocksai.videoclub.dto.PeliculaDto;
import com.warlocksai.videoclub.model.Categoria;
import com.warlocksai.videoclub.model.Director;
import com.warlocksai.videoclub.model.Pelicula;
import org.springframework.stereotype.Component;

@Component
public class PeliculaMapper {

    public PeliculaDto toPeliculaDto(Pelicula pelicula) {
        Categoria categoria = pelicula.getCategoria();
        Director director = pelicula.getDirector();
        return new PeliculaDto(
                pelicula.getId(),
                pelicula.getTitulo(),
                director.getNombre(),
                director.getId(),
                director.getNombre(),
                pelicula.getAnio(),
                pelicula.getDisponible(),
                categoria.getId(),
                categoria.getNombre());
    }

    public CategoriaDto toCategoriaDto(Categoria categoria) {
        return new CategoriaDto(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion(),
                categoria.getPeliculas().size());
    }

    public DirectorDto toDirectorDto(Director director) {
        return new DirectorDto(director.getId(), director.getNombre(), director.getPeliculas().size());
    }
}

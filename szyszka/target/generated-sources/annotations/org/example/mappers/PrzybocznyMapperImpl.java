package org.example.mappers;

import javax.annotation.processing.Generated;
import org.example.DTOs.PrzybocznyDTO;
import org.example.entities.Przyboczny;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-10T14:48:29+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class PrzybocznyMapperImpl implements PrzybocznyMapper {

    @Override
    public PrzybocznyDTO toDTO(Przyboczny przyboczny) {
        if ( przyboczny == null ) {
            return null;
        }

        PrzybocznyDTO przybocznyDTO = new PrzybocznyDTO();

        return przybocznyDTO;
    }

    @Override
    public Przyboczny toEntity(PrzybocznyDTO przybocznyDTO) {
        if ( przybocznyDTO == null ) {
            return null;
        }

        Przyboczny przyboczny = new Przyboczny();

        return przyboczny;
    }
}

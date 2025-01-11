package org.example.mappers;

import javax.annotation.processing.Generated;
import org.example.DTOs.RodzicDTO;
import org.example.entities.Rodzic;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-10T14:48:29+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class RodzicMapperImpl implements RodzicMapper {

    @Override
    public RodzicDTO toDTO(Rodzic rodzic) {
        if ( rodzic == null ) {
            return null;
        }

        RodzicDTO rodzicDTO = new RodzicDTO();

        return rodzicDTO;
    }

    @Override
    public Rodzic toEntity(RodzicDTO rodzicDTO) {
        if ( rodzicDTO == null ) {
            return null;
        }

        Rodzic rodzic = new Rodzic();

        return rodzic;
    }
}

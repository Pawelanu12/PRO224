package org.example.mappers;

import javax.annotation.processing.Generated;
import org.example.DTOs.ZuchDTO;
import org.example.entities.Zuch;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-13T18:22:31+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class ZuchMapperImpl implements ZuchMapper {

    @Override
    public ZuchDTO toDTO(Zuch zuch) {
        if ( zuch == null ) {
            return null;
        }

        ZuchDTO zuchDTO = new ZuchDTO();

        return zuchDTO;
    }

    @Override
    public Zuch toEntity(ZuchDTO zuchDTO) {
        if ( zuchDTO == null ) {
            return null;
        }

        Zuch zuch = new Zuch();

        return zuch;
    }
}

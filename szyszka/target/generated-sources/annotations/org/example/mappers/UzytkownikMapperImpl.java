package org.example.mappers;

import javax.annotation.processing.Generated;
import org.example.DTOs.UzytkownikDTO;
import org.example.entities.Uzytkownik;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-13T18:22:31+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class UzytkownikMapperImpl implements UzytkownikMapper {

    @Override
    public UzytkownikDTO toDTO(Uzytkownik uzytkownik) {
        if ( uzytkownik == null ) {
            return null;
        }

        UzytkownikDTO uzytkownikDTO = new UzytkownikDTO();

        return uzytkownikDTO;
    }
}

package org.example.mappers;

import org.example.DTOs.UzytkownikDTO;
import org.example.entities.Uzytkownik;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UzytkownikMapper {
    UzytkownikMapper INSTANCE = Mappers.getMapper(UzytkownikMapper.class);

    UzytkownikDTO toDTO(Uzytkownik uzytkownik);
}

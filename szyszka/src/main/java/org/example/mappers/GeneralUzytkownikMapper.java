package org.example.mappers;

import org.example.DTOs.*;
import org.example.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GeneralUzytkownikMapper {
    GeneralUzytkownikMapper INSTANCE = Mappers.getMapper(GeneralUzytkownikMapper.class);

    default UzytkownikDTO toDTO(Uzytkownik uzytkownik) {
        if (uzytkownik instanceof Zuch) {
            return ZuchMapper.INSTANCE.toDTO((Zuch) uzytkownik);
        } else if (uzytkownik instanceof Rodzic) {
            return RodzicMapper.INSTANCE.toDTO((Rodzic) uzytkownik);
        } else if (uzytkownik instanceof Przyboczny) {
            return PrzybocznyMapper.INSTANCE.toDTO((Przyboczny) uzytkownik);
        } else if (uzytkownik instanceof Druzynowy) {
            return DruzynowyMapper.INSTANCE.toDTO((Druzynowy) uzytkownik);
        } else {
            throw new IllegalArgumentException("Nieobsługiwany typ użytkownika");
        }
    }

    default Uzytkownik toEntity(UzytkownikDTO uzytkownikDTO) {
        if (uzytkownikDTO instanceof ZuchDTO) {
            return ZuchMapper.INSTANCE.toEntity((ZuchDTO) uzytkownikDTO);
        } else if (uzytkownikDTO instanceof RodzicDTO) {
            return RodzicMapper.INSTANCE.toEntity((RodzicDTO) uzytkownikDTO);
        } else if (uzytkownikDTO instanceof PrzybocznyDTO) {
            return PrzybocznyMapper.INSTANCE.toEntity((PrzybocznyDTO) uzytkownikDTO);
        } else if (uzytkownikDTO instanceof DruzynowyDTO) {
            return DruzynowyMapper.INSTANCE.toEntity((DruzynowyDTO) uzytkownikDTO);
        } else {
            throw new IllegalArgumentException("Nieobsługiwany typ DTO użytkownika");
        }
    }
}

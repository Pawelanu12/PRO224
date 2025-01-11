package org.example.mappers;

import org.example.DTOs.PrzybocznyDTO;
import org.example.entities.Przyboczny;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PrzybocznyMapper {
    PrzybocznyMapper INSTANCE = Mappers.getMapper(PrzybocznyMapper.class);

    PrzybocznyDTO toDTO(Przyboczny przyboczny);
    Przyboczny toEntity(PrzybocznyDTO przybocznyDTO);
}

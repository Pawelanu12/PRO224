package org.example.mappers;

import org.example.DTOs.RodzicDTO;
import org.example.entities.Rodzic;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RodzicMapper {
    RodzicMapper INSTANCE = Mappers.getMapper(RodzicMapper.class);

    RodzicDTO toDTO(Rodzic rodzic);
    Rodzic toEntity(RodzicDTO rodzicDTO);
}

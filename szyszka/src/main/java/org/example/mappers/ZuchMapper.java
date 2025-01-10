package org.example.mappers;

import org.example.DTOs.ZuchDTO;
import org.example.entities.Zuch;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ZuchMapper {
    ZuchMapper INSTANCE = Mappers.getMapper(ZuchMapper.class);

    ZuchDTO toDTO(Zuch zuch);
    Zuch toEntity(ZuchDTO zuchDTO);
}

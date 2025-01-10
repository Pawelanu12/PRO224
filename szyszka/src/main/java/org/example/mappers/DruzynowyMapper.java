package org.example.mappers;

import org.example.DTOs.DruzynowyDTO;
import org.example.entities.Druzynowy;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DruzynowyMapper {
    DruzynowyMapper INSTANCE = Mappers.getMapper(DruzynowyMapper.class);

    DruzynowyDTO toDTO(Druzynowy druzynowy);
    Druzynowy toEntity(DruzynowyDTO druzynowyDTO);
}

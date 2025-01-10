package org.example.mappers;

import javax.annotation.processing.Generated;
import org.example.DTOs.DruzynowyDTO;
import org.example.entities.Druzynowy;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-10T14:48:29+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class DruzynowyMapperImpl implements DruzynowyMapper {

    @Override
    public DruzynowyDTO toDTO(Druzynowy druzynowy) {
        if ( druzynowy == null ) {
            return null;
        }

        DruzynowyDTO druzynowyDTO = new DruzynowyDTO();

        return druzynowyDTO;
    }

    @Override
    public Druzynowy toEntity(DruzynowyDTO druzynowyDTO) {
        if ( druzynowyDTO == null ) {
            return null;
        }

        Druzynowy druzynowy = new Druzynowy();

        return druzynowy;
    }
}

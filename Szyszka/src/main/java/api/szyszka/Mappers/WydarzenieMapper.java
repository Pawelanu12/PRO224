package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.WydarzenieDto;
import api.szyszka.Entities.Wydarzenie;

import java.util.ArrayList;

public class WydarzenieMapper {

    public static WydarzenieDto toDto(Wydarzenie entity){
        if(entity == null) return null;
        return new WydarzenieDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getDataWyjazdu(),
                entity.getDataZakonczenia(),
                entity.getOpis(),
                entity.getOrganizator().getId(),
                entity.getUczestnictwa(),
                entity.getZdjecia()
        );
    }

    public static Wydarzenie fromCreateRequest(CreateWydarzenieRequest request){
        if(request == null) return null;
        Wydarzenie wydarzenie = new Wydarzenie();
        wydarzenie.setNazwa(request.getNazwa());
        wydarzenie.setDataWyjazdu(request.getDataWyjazdu());
        wydarzenie.setDataZakonczenia(request.getDataZakonczenia());
        wydarzenie.setOpis(request.getOpis());

        return wydarzenie;
    }

    public static void updateEntity(Wydarzenie entity, UpdateWydarzenieRequest request){
        if(entity == null || request == null) return;
        entity.setNazwa(request.getNazwa());
        entity.setDataWyjazdu(request.getDataWyjazdu());
        entity.setDataZakonczenia(request.getDataZakonczenia());
        entity.setOpis(request.getOpis());
        entity.setOrganizator(entity.getOrganizator());
        entity.setUczestnictwa(request.getUczestnictwa());
        entity.setZdjecia(entity.getZdjecia());
    }
}

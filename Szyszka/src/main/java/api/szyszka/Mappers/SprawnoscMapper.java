package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateSprawnoscRequest;
import api.szyszka.DTOs.SprawnoscDto;
import api.szyszka.DTOs.UpdateSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.Szostka;

public class SprawnoscMapper {

    public static SprawnoscDto toDto(Sprawnosc entity) {
        if (entity == null) return null;
        return new SprawnoscDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getOpis(),
                entity.getOpisWymagan(),
                entity.getIkona()
        );
    }

    public static Sprawnosc fromCreateRequest(CreateSprawnoscRequest request) {
        if (request == null) return null;
        Sprawnosc sprawnosc = new Sprawnosc();
        sprawnosc.setNazwa(request.getNazwa());
        sprawnosc.setOpis(request.getOpis());
        sprawnosc.setOpisWymagan(request.getOpisWymagan());
        sprawnosc.setIkona(request.getIkona());
        return sprawnosc;
    }

    public static void updateEntity(Sprawnosc entity, UpdateSprawnoscRequest request) {
        if (request == null || entity == null) return;
        entity.setNazwa(request.getNazwa());
        entity.setOpis(request.getOpis());
        entity.setOpisWymagan(request.getOpisWymagan());
        entity.setIkona(request.getIkona());
    }
}

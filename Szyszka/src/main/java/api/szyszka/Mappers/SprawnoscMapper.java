package api.szyszka.Mappers;

import api.szyszka.DTOs.Sprawnosci.CreateSprawnoscRequest;
import api.szyszka.DTOs.Sprawnosci.SprawnoscDto;
import api.szyszka.DTOs.Sprawnosci.UpdateSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;

public class SprawnoscMapper {

    public static SprawnoscDto toDto(Sprawnosc entity) {
        if (entity == null) return null;
        String ikona = entity.getIkona();
        String ikonaUrl = null;

        if (ikona != null) {
            ikonaUrl ="/uploads/" + ikona;

        }

        SprawnoscDto dto = new SprawnoscDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getOpis(),
                entity.getOpisWymagan(),
                ikona,
                ikonaUrl
        );
//        dto.setIkonaUrl(ikonaUrl);
        return dto;
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
        //entity.setIkona(request.getIkona());
    }
}

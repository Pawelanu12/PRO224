package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateZdobytaSprawnoscRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.UpdateZdobytaSprawnoscRequest;
import api.szyszka.DTOs.ZdobytaSprawnoscDto;
import api.szyszka.Entities.ZdobytaSprawnosc;

public class ZdobytaSprawnoscMapper {

    public static ZdobytaSprawnoscDto toDto(ZdobytaSprawnosc entity) {
        if (entity == null) return null;
        return new ZdobytaSprawnoscDto(
                entity.getId(),
                entity.getDataZdobyciaSprawnosci(),
                entity.getUzytkownik().getId(),
                entity.getSprawnosc().getId()
        );
    }

    public static ZdobytaSprawnosc fromCreateRequest(CreateZdobytaSprawnoscRequest request) {
        if (request == null) return null;
        ZdobytaSprawnosc zdobytaSprawnosc = new ZdobytaSprawnosc();
        zdobytaSprawnosc.setDataZdobyciaSprawnosci(request.getDataZdobyciaSprawnosci());
        return zdobytaSprawnosc;
    }

    public static void updateEntity(ZdobytaSprawnosc entity, UpdateZdobytaSprawnoscRequest request) {
        if (entity == null || request == null) return;
        entity.setDataZdobyciaSprawnosci(request.getDataZdobyciaSprawnosci());

        if (request.getSprawnosc() != null) {
            entity.setSprawnosc(request.getSprawnosc());
        }

        if (request.getUzytkownik() != null) {
            entity.setUzytkownik(request.getUzytkownik());
        }
    }
}

package api.szyszka.Mappers;

import api.szyszka.DTOs.Event.CreateUczestnictwoRequest;
import api.szyszka.DTOs.Event.UczestnictwoDto;
import api.szyszka.Entities.Uczestnictwo;

public class UczestnictwoMapper {

    public static UczestnictwoDto toDto(Uczestnictwo entity) {
        if (entity == null) return null;
        return new UczestnictwoDto(
                entity.getId(),
                entity.isObecny(),
                entity.getUzytkownik().getId(),
                entity.getWydarzenie().getId()
        );
    }

    public static Uczestnictwo fromCreateRequest(CreateUczestnictwoRequest reguest) {
        if (reguest == null) return null;
        Uczestnictwo uczestnictwo = new Uczestnictwo();
        uczestnictwo.setObecny(reguest.isUczestnictwo());
        return uczestnictwo;
    }

    public static void updateEntity(Uczestnictwo entity, Uczestnictwo request) {
        if (request == null || entity == null) return;
        entity.setObecny(request.isObecny());
    }
}

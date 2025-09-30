package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateUczestnictwoRequest;
import api.szyszka.DTOs.UczestnictwoDto;
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
}

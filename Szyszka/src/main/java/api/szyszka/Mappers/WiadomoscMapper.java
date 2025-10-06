package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateWiadomoscRequest;
import api.szyszka.DTOs.UpdateWiadomoscRequest;
import api.szyszka.DTOs.UpdateZdjecieRequest;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Entities.Zdjecie;

public class WiadomoscMapper {

    public static WiadomoscDto toDto(Wiadomosc wiadomosc) {
        if(wiadomosc == null) return null;
        return new WiadomoscDto(
                wiadomosc.getId(),
                wiadomosc.getCzat().getId(),
                wiadomosc.getNadawca().getId(),
                wiadomosc.getTresc(),
                wiadomosc.getDataWyslania()
        );
    }

    public static Wiadomosc fromCreateRequest(CreateWiadomoscRequest entity) {
        if (entity == null) return null;
        Wiadomosc wiadomosc = new Wiadomosc();
        wiadomosc.setTresc(entity.getTresc());
        wiadomosc.setDataWyslania(entity.getDataWiadomosc());
        return wiadomosc;
    }

    public static void updateEntity(Wiadomosc entity, UpdateWiadomoscRequest request) {
        if (request == null || entity == null)  return;
        entity.setTresc(request.getTresc());
        entity.setDataWyslania(request.getDataWyslania());
    }
}

package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.WydarzenieDto;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Entities.WydarzenieZdjecie;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class WydarzenieMapper {

    public static WydarzenieDto toDto(Wydarzenie entity) {
        if (entity == null) return null;

        List<String> zdjeciaSciezki = new ArrayList<>();
        if (entity.getZdjecia() != null) {
            for (WydarzenieZdjecie zdj : entity.getZdjecia()) {
                zdjeciaSciezki.add(zdj.getSciezka());
            }
        }

        return new WydarzenieDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getDataWyjazdu(),
                entity.getDataZakonczenia(),
                entity.getOpis(),
                entity.getOrganizator() != null ? entity.getOrganizator().getId() : null,
                entity.getUczestnictwa(),
                zdjeciaSciezki
        );
    }

    // =======================
    // CREATE REQUEST -> ENTITY
    // =======================
    public static Wydarzenie fromCreateRequest(CreateWydarzenieRequest request) {
        if (request == null) return null;

        Wydarzenie wydarzenie = new Wydarzenie();
        wydarzenie.setNazwa(request.getNazwa());
        wydarzenie.setDataWyjazdu(request.getDataWyjazdu());
        wydarzenie.setDataZakonczenia(request.getDataZakonczenia());
        wydarzenie.setOpis(request.getOpis());

        return wydarzenie;
    }
    public static void updateEntity(Wydarzenie entity, UpdateWydarzenieRequest request) {
        if (entity == null || request == null) return;

        entity.setNazwa(request.getNazwa());

        if (request.getDataWyjazdu() != null) {
            entity.setDataWyjazdu(
                    request.getDataWyjazdu().atStartOfDay()
            );
        }

        if (request.getDataZakonczenia() != null) {
            entity.setDataZakonczenia(
                    request.getDataZakonczenia().atTime(LocalTime.MAX)
            );
        }

        entity.setOpis(request.getOpis());
    }
}

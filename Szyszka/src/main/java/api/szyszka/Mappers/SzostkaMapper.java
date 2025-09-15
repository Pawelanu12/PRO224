package api.szyszka.Mappers;


import api.szyszka.DTOs.CreateSzostkaRequest;
import api.szyszka.DTOs.SzostkaDto;
import api.szyszka.DTOs.UpdateSzostkaRequest;
import api.szyszka.Entities.Szostka;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class SzostkaMapper {

    public static SzostkaDto toDto(Szostka entity) {
        if (entity == null) return null;
        return new SzostkaDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getDataStworzenia(),
                //entity.getUzytkownicy()
                entity.getUzytkownicy().stream()
                        .map(UzytkownikShortcutMapper::mapToPublic)
                        .collect(Collectors.toList())

        );
    }

    public static Szostka fromCreateRequest(CreateSzostkaRequest request){
        if (request == null) return null;
        Szostka szostka = new Szostka();
        szostka.setNazwa(request.getNazwa());
        szostka.setDataStworzenia(request.getDataStworzenia());
        szostka.setUzytkownicy(request.getUzytkonicy());
        szostka.setUzytkownicy(
                request.getUzytkonicy() != null ? request.getUzytkonicy() : new ArrayList<>()
        );
        return szostka;
    }

    public static void updateEntity(Szostka entity, UpdateSzostkaRequest request){
        if (request == null || entity == null) return;
        entity.setNazwa(request.getNazwa());
        entity.setDataStworzenia(request.getDataStworzenia());
        //entity.setUzytkownicy(request.getUzytkonicy());
        entity.setUzytkownicy(
                request.getUzytkonicy() != null ? request.getUzytkonicy() : new ArrayList<>()
        );
    }
}

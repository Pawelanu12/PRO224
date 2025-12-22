package api.szyszka.Mappers;

import api.szyszka.DTOs.CzatDto;
import api.szyszka.DTOs.CzatSummaryDto;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;

import java.util.List;
import java.util.stream.Collectors;

public class CzatMapper {

    public static CzatDto toDto(Czat entity) {
        if (entity == null) return null;

        List<Long> uczestnicyIds = entity.getUczestnicy().stream()
                .map(CzatUzytkownik::getUzytkownik)
                .map(u -> u.getId())
                .collect(Collectors.toList());

        List<WiadomoscDto> wiadomosciDtos = entity.getWiadomosci().stream()
                .map(w -> new WiadomoscDto(
                        w.getId(),
                        w.getCzat().getId(),
                        w.getNadawca().getId(),
                        w.getTresc(),
                        w.getDataWyslania()
                ))
                .collect(Collectors.toList());

        return new CzatDto(
                entity.getId(),
                entity.getNazwa(),
                entity.isCzyGrupowy(),
                entity.getDataUtworzenia(),
                uczestnicyIds,
                wiadomosciDtos
        );
    }
    public static CzatSummaryDto toSummaryDto(Czat czat) {
        return new CzatSummaryDto(
                czat.getId(),
                czat.getNazwa(),
                czat.isCzyGrupowy(),
                czat.getDataUtworzenia(),
                czat.getUczestnicy()
                        .stream()
                        .map(u -> u.getUzytkownik().getId())
                        .toList()
        );
    }

}

package api.szyszka.Mappers;

import api.szyszka.DTOs.Chat.CzatDto;
import api.szyszka.DTOs.Chat.CzatSummaryDto;
import api.szyszka.DTOs.Chat.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class CzatMapper {

    public static CzatDto toDto(Czat entity) {
        if (entity == null) return null;

        // Lista ID uczestników
        List<Long> uczestnicyIds = entity.getUczestnicy() == null ? List.of() :
                entity.getUczestnicy().stream()
                        .map(CzatUzytkownik::getUzytkownik)
                        .filter(u -> u != null)
                        .map(Uzytkownik::getId)
                        .collect(Collectors.toList());

        List<String> uczestnicyLogins = entity.getUczestnicy() == null ? List.of() :
                entity.getUczestnicy().stream()
                        .map(CzatUzytkownik::getUzytkownik)
                        .filter(u -> u != null)
                        .map(Uzytkownik::getLogin)
                        .collect(Collectors.toList());


        // Lista wiadomości
        List<WiadomoscDto> wiadomosciDtos = entity.getWiadomosci() == null ? List.of() :
                entity.getWiadomosci().stream()
                        .map(w -> new WiadomoscDto(
                                w.getId(),
                                w.getCzat() != null ? w.getCzat().getId() : null,
                                w.getNadawca() != null ? w.getNadawca().getLogin() : null,
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
                uczestnicyLogins,
                wiadomosciDtos
        );
    }


    public static CzatSummaryDto toSummaryDto(CzatUzytkownik czatUzytkownik) {
        if (czatUzytkownik == null || czatUzytkownik.getCzat() == null) return null;

        Czat czat = czatUzytkownik.getCzat();

        List<String> uczestnicyLogins = czat.getUczestnicy() == null ? List.of() :
                czat.getUczestnicy().stream()
                        .map(CzatUzytkownik::getUzytkownik)
                        .filter(u -> u != null)
                        .map(Uzytkownik::getLogin)
                        .collect(Collectors.toList());

        WiadomoscDto ostatniaWiadomosc = czatUzytkownik.getLastReadMessage() == null ? null :
                new WiadomoscDto(
                        czatUzytkownik.getLastReadMessage().getId(),
                        czat.getId(),
                        czatUzytkownik.getLastReadMessage().getNadawca() != null ? czatUzytkownik.getLastReadMessage().getNadawca().getLogin() : null,
                        czatUzytkownik.getLastReadMessage().getTresc(),
                        czatUzytkownik.getLastReadMessage().getDataWyslania()
                );
        List<Wiadomosc> wiadomoscs=czatUzytkownik.getCzat().getWiadomosci();
        LocalDateTime datum;
        if(wiadomoscs!=null&& !wiadomoscs.isEmpty()){
            datum= wiadomoscs.get(wiadomoscs.size() - 1).getDataWyslania();
        }
        else
             datum =LocalDateTime.now();
        System.out.println(datum);
        return new CzatSummaryDto(
                czat.getId(),
                czat.getNazwa(),
                czat.isCzyGrupowy(),
                czat.getDataUtworzenia(),
                uczestnicyLogins,
                czatUzytkownik.getNieprzeczytaneWiadomosci(),
                ostatniaWiadomosc,
                datum
        );
    }

}

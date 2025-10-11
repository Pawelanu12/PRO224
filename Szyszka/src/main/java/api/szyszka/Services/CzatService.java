//package api.szyszka.Services;
//
//import api.szyszka.DTOs.*;
//import api.szyszka.Entities.*;
//import api.szyszka.Repositories.*;
//import jakarta.persistence.EntityNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@Transactional
//public class CzatService {
//
//    private final CzatRepository czatRepository;
//    private final CzatUzytkownikRepository czatUzytkownikRepository;
//    private final WiadomoscRepository wiadomoscRepository;
//    private final UzytkownikService uzytkownikService;
//
//    public CzatService(CzatRepository czatRepository,
//                       CzatUzytkownikRepository czatUzytkownikRepository,
//                       WiadomoscRepository wiadomoscRepository,
//                       UzytkownikService uzytkownikService) {
//        this.czatRepository = czatRepository;
//        this.czatUzytkownikRepository = czatUzytkownikRepository;
//        this.wiadomoscRepository = wiadomoscRepository;
//        this.uzytkownikService = uzytkownikService;
//    }
//
//    public CzatDto createChat(CreateCzatRequest request) {
//        List<Uzytkownik> users = request.getUserIds().stream()
//                .map(uzytkownikService::getUserById)
//                .toList();
//
//        if (!request.isGroup() && users.size() != 2) {
//            throw new IllegalArgumentException("Private chat must have exactly 2 users.");
//        }
//
//        Czat czat = new Czat();
//        if (request.isGroup()) {
//            czat.setNazwa(request.getNazwa() != null ? request.getNazwa() : "Nowa grupa");
//            czat.setCzyGrupowy(true);
//        } else {
//            Uzytkownik u1 = users.get(0);
//            Uzytkownik u2 = users.get(1);
//            czat.setNazwa("Chat: " + u1.getImie() + " " + u1.getNazwisko() +
//                    " & " + u2.getImie() + " " + u2.getNazwisko());
//            czat.setCzyGrupowy(false);
//        }
//
//        Czat saved = czatRepository.save(czat);
//
//        for (Uzytkownik user : users) {
//            CzatUzytkownik link = new CzatUzytkownik();
//            link.setCzat(saved);
//            link.setUzytkownik(user);
//            czatUzytkownikRepository.save(link);
//        }
//
//        return toDto(saved);
//    }
//
//    public List<CzatDto> findByName(String name) {
//        return czatRepository.findByNazwaContainingIgnoreCase(name).stream()
//                .map(this::toDto)
//                .collect(Collectors.toList());
//    }
//
//    public WiadomoscDto sendMessage(Long czatId, SendMessageRequest request) {
//        Czat czat = czatRepository.findById(czatId)
//                .orElseThrow(() -> new EntityNotFoundException("Czat not found"));
//
//        Uzytkownik nadawca = uzytkownikService.getUserById(request.getNadawcaId());
//
//        Wiadomosc wiadomosc = new Wiadomosc();
//        wiadomosc.setCzat(czat);
//        wiadomosc.setNadawca(nadawca);
//        wiadomosc.setTresc(request.getTresc());
//
//        Wiadomosc saved = wiadomoscRepository.save(wiadomosc);
//        return toDto(saved);
//    }
//
//    // --- Mapper methods ---
////    private CzatDto toDto(Czat czat) {
////        CzatDto dto = new CzatDto();
////        dto.setId(czat.getId());
////        dto.setNazwa(czat.getNazwa());
////        dto.setCzyGrupowy(czat.isCzyGrupowy());
////        dto.setDataUtworzenia(czat.getDataUtworzenia());
////        dto.setUczestnicyIds(
////                czat.getUczestnicy() != null ?
////                        czat.getUczestnicy().stream()
////                                .map(cu -> cu.getUzytkownik().getId())
////                                .collect(Collectors.toList())
////                        : List.of()
////        );
////        return dto;
////    }
//
//    private WiadomoscDto toDto(Wiadomosc wiadomosc) {
//        WiadomoscDto dto = new WiadomoscDto();
//        dto.setId(wiadomosc.getId());
//        dto.setNadawcaId(wiadomosc.getNadawca().getId());
//        dto.setTresc(wiadomosc.getTresc());
//        dto.setDataWyslania(wiadomosc.getDataWyslania());
//        return dto;
//    }
//}

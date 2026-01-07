package api.szyszka.Services;

import api.szyszka.DTOs.Chat.CreateWiadomoscRequest;
import api.szyszka.DTOs.Chat.CzatUpdateDto;
import api.szyszka.DTOs.Chat.WiadomoscDto;
import api.szyszka.Entities.*;
import api.szyszka.Mappers.WiadomoscMapper;
import api.szyszka.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
@Transactional

public class WiadomoscService {
    private final WiadomoscRepository wiadomoscRepository;
    private final CzatRepository czatRepository;
    private final UzytkownikRepository uzytkownikRepository;
    private final ZdjecieRepository zdjecieRepository;
    private final CzatUzytkownikRepository czatUzytkownikRepository;
    private final SimpMessagingTemplate messagingTemplate;



//    public WiadomoscService(WiadomoscRepository wiadomoscRepository, CzatRepository czatRepository,
//                            UzytkownikRepository uzytkownikRepository, ZdjecieRepository zdjecieRepository) {
//        this.wiadomoscRepository = wiadomoscRepository;
//        this.czatRepository = czatRepository;
//        this.uzytkownikRepository = uzytkownikRepository;
//        this.zdjecieRepository = zdjecieRepository;
//    }

    public Wiadomosc createWiadomosc(CreateWiadomoscRequest request) {
        Wiadomosc wiadomosc = WiadomoscMapper.fromCreateRequest(request);

        Czat czat = czatRepository.findById(request.getCzatId())
                .orElseThrow(() -> new NoSuchElementException("Chat not found"));
        wiadomosc.setCzat(czat);
        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        wiadomosc.setNadawca(uzytkownik);
        Wiadomosc savedWiadomosc= wiadomoscRepository.save(wiadomosc);

        handleMessage(request,wiadomosc);
        return savedWiadomosc;
    }

    public void handleMessage(CreateWiadomoscRequest request, Wiadomosc wiadomosc) {
        WiadomoscDto dto = WiadomoscMapper.toDto(wiadomosc);
        List<CzatUzytkownik> uczestnicy = czatUzytkownikRepository.findAllByCzatId(request.getCzatId());

        for (CzatUzytkownik cu : uczestnicy) {
            Long userId = cu.getUzytkownik().getId();
            Long nadawcaId = wiadomosc.getNadawca().getId();

            if (!userId.equals(nadawcaId)) {
                cu.setNieprzeczytaneWiadomosci(cu.getNieprzeczytaneWiadomosci() + 1);
                cu.setLastReadMessage(wiadomosc);
            } else {
                cu.setLastReadMessage(wiadomosc);
            }

            czatUzytkownikRepository.save(cu);

            messagingTemplate.convertAndSend(
                    "/topic/uzytkownik/" + userId,
                    new CzatUpdateDto(request.getCzatId(), cu.getNieprzeczytaneWiadomosci(), dto)
            );
        }
        messagingTemplate.convertAndSend(
                "/topic/chat/" + request.getCzatId(),
                dto
        );
    }

    //    public void incrementUnread(CzatUzytkownik czatUzytkownik,Wiadomosc wiadomosc){
//        System.out.println("incrementUnread");
//        czatUzytkownik.setWiadomosc(wiadomosc);
//        czatUzytkownik.setNieprzeczytaneWiadomosci(czatUzytkownik.getNieprzeczytaneWiadomosci()+1);
////        czatUzytkownikRepository.save(czatUzytkownik);
//    }
    public Wiadomosc getWiadomoscById(long id) {
        return wiadomoscRepository.findById(id).get();
    }

    public List<Wiadomosc> getAllWiadomosc() {
        return wiadomoscRepository.findAll();
    }

    public void deleteWiadomoscById(long id) {wiadomoscRepository.deleteById(id);}

    public Wiadomosc modifyWiadomosc(long id, String tresc) {
        Wiadomosc oldWiadomosc = getWiadomoscById(id);
        oldWiadomosc.setTresc(tresc);

        return wiadomoscRepository.save(oldWiadomosc);
    }
}

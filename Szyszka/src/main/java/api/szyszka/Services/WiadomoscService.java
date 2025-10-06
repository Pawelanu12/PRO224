package api.szyszka.Services;

import api.szyszka.DTOs.CreateWiadomoscRequest;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Entities.Zdjecie;
import api.szyszka.Mappers.WiadomoscMapper;
import api.szyszka.Repositories.CzatRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WiadomoscRepository;
import api.szyszka.Repositories.ZdjecieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WiadomoscService {
    private final WiadomoscRepository wiadomoscRepository;
    private final CzatRepository czatRepository;
    private final UzytkownikRepository uzytkownikRepository;
    private final ZdjecieRepository zdjecieRepository;

    public WiadomoscService(WiadomoscRepository wiadomoscRepository, CzatRepository czatRepository,
                            UzytkownikRepository uzytkownikRepository, ZdjecieRepository zdjecieRepository) {
        this.wiadomoscRepository = wiadomoscRepository;
        this.czatRepository = czatRepository;
        this.uzytkownikRepository = uzytkownikRepository;
        this.zdjecieRepository = zdjecieRepository;
    }

    public Wiadomosc createWiadomosc(CreateWiadomoscRequest request) {
        Wiadomosc wiadomosc = WiadomoscMapper.fromCreateRequest(request);

        Czat czat = czatRepository.findById(request.getCzatId())
                .orElseThrow(() -> new NoSuchElementException("Chat not found"));
        wiadomosc.setCzat(czat);
        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        wiadomosc.setNadawca(uzytkownik);

        return wiadomoscRepository.save(wiadomosc);
    }

    public Wiadomosc getWiadomoscById(long id) {
        return wiadomoscRepository.findById(id).get();
    }

    public List<Wiadomosc> getAllWiadomosc() {
        return wiadomoscRepository.findAll();
    }

    public void deleteWiadomoscById(long id) {zdjecieRepository.deleteById(id);}

    public Wiadomosc modifyWiadomosc(long id, Wiadomosc updatedWiadomosc) {
        Wiadomosc oldWiadomosc = getWiadomoscById(id);

        oldWiadomosc.setCzat(updatedWiadomosc.getCzat());
        oldWiadomosc.setNadawca(updatedWiadomosc.getNadawca());
        oldWiadomosc.setTresc(updatedWiadomosc.getTresc());
        oldWiadomosc.setDataWyslania(updatedWiadomosc.getDataWyslania());

        return wiadomoscRepository.save(oldWiadomosc);
    }
}

package api.szyszka.Services;

import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Exceptions.ResourceNotFoundException;
import api.szyszka.Repositories.CzatRepository;
import api.szyszka.Repositories.CzatUzytkownikRepository;
import api.szyszka.Repositories.WiadomoscRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CzatService {

    private final CzatRepository czatRepository;
    private final CzatUzytkownikRepository czatUzytkownikRepository;
    private final WiadomoscRepository wiadomoscRepository;

    // --- Chat ---
    public Czat createCzat(String nazwa, boolean czyGrupowy) {
        Czat czat = new Czat();
        czat.setNazwa(nazwa);
        czat.setCzyGrupowy(czyGrupowy);
        czat.setDataUtworzenia(LocalDateTime.now());
        return czatRepository.save(czat);
    }
    public List<Czat> getCzatyForUser(Uzytkownik user) {
        List<CzatUzytkownik> uczestnictwa = czatUzytkownikRepository
                .findAll()
                .stream()
                .filter(p -> p.getUzytkownik().getId().equals(user.getId()))
                .toList();

        return uczestnictwa.stream()
                .map(CzatUzytkownik::getCzat)
                .toList();
    }

    public Czat getCzatById(Long id) {
        return czatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Czat> getAllCzaty() {
        return czatRepository.findAll();
    }

    public void deleteCzat(Long id) {
        if (!czatRepository.existsById(id)) {
            throw new ResourceNotFoundException(id);
        }
        czatRepository.deleteById(id);
    }

    public CzatUzytkownik addParticipant(Czat czat, Uzytkownik uzytkownik) {
        CzatUzytkownik participant = new CzatUzytkownik();
        participant.setCzat(czat);
        participant.setUzytkownik(uzytkownik);
        return czatUzytkownikRepository.save(participant);
    }

    public void removeParticipant(Long czatId, Long uzytkownikId) {
        CzatUzytkownik participant = czatUzytkownikRepository
                .findByCzatId(czatId).stream()
                .filter(p -> p.getUzytkownik().getId().equals(uzytkownikId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(uzytkownikId));
        czatUzytkownikRepository.delete(participant);
    }

    public List<CzatUzytkownik> getParticipants(Long czatId) {
        return czatUzytkownikRepository.findByCzatId(czatId);
    }

    public Wiadomosc sendMessage(Czat czat, Uzytkownik nadawca, String tresc) {
        Wiadomosc wiadomosc = new Wiadomosc();
        wiadomosc.setCzat(czat);
        wiadomosc.setNadawca(nadawca);
        wiadomosc.setTresc(tresc);
        wiadomosc.setDataWyslania(LocalDateTime.now());
        return wiadomoscRepository.save(wiadomosc);
    }

    public List<Wiadomosc> getMessages(Long czatId) {
        return wiadomoscRepository.findByCzatIdOrderByDataWyslaniaAsc(czatId);
    }
}

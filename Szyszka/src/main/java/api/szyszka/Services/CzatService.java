package api.szyszka.Services;

import api.szyszka.DTOs.CzatDto;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Exceptions.ResourceNotFoundException;
import api.szyszka.Mappers.CzatMapper;
import api.szyszka.Repositories.CzatRepository;
import api.szyszka.Repositories.CzatUzytkownikRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WiadomoscRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CzatService {

    private final CzatRepository czatRepository;
    private final CzatUzytkownikRepository czatUzytkownikRepository;
    private final WiadomoscRepository wiadomoscRepository;
    private final UzytkownikRepository uzytkownikRepository;

    @Transactional
    public Czat createPrivateChat(Long user1Id, Long user2Id) {
        Optional<Uzytkownik>  u1= uzytkownikRepository.findById(user1Id);
        Optional<Uzytkownik>  u2= uzytkownikRepository.findById(user2Id);
        if(u1.isPresent()&&u2.isPresent()){
            Uzytkownik user1=u1.get();
            Uzytkownik user2=u2.get();
//        List<CzatUzytkownik> existing = czatUzytkownikRepository.findAll();
//        for (CzatUzytkownik cu : existing) {
//            Czat czat = cu.getCzat();
//            if (!czat.isCzyGrupowy()) {
//                List<Long> participantIds = czat.getUczestnicy() != null
//                        ? czat.getUczestnicy().stream().map(p -> p.getUzytkownik().getId()).toList()
//                        : List.of();
//                if (participantIds.contains(user1.getId()) && participantIds.contains(user2.getId())) {
//                    return CzatMapper.toDto(czat);
//                }
//            }
//        }

        Czat czat = new Czat();
        czat.setCzyGrupowy(false);
        czat.setDataUtworzenia(LocalDateTime.now());
        czat.setNazwa(null);
        Czat savedCzat = czatRepository.save(czat);

        CzatUzytkownik cu1 = addParticipant(savedCzat, user1);
        cu1.setNieprzeczytaneWiadomosci(0);
        CzatUzytkownik cu2 = addParticipant(savedCzat, user2);
        cu2.setNieprzeczytaneWiadomosci(0);

        savedCzat.setUczestnicy(List.of(cu1, cu2));

        return savedCzat;
        }
        return null;
    }

    public CzatDto createGroupChat(String nazwa, Uzytkownik creator, List<String> participantLogins) {
        Czat czat = new Czat();
        czat.setCzyGrupowy(true);
        czat.setNazwa(nazwa);
        czat.setDataUtworzenia(LocalDateTime.now());
        Czat savedCzat = czatRepository.save(czat);

        CzatUzytkownik creatorEntry = addParticipant(savedCzat, creator);

        List<CzatUzytkownik> participants = participantLogins.stream()
                .filter(login -> !login.equals(creator.getLogin()))
                .map(login -> uzytkownikRepository.findByLogin(login)
                        .orElse( null))
                .map(uzytkownik -> addParticipant(savedCzat, uzytkownik))
                .toList();

        participants.add(creatorEntry);
        savedCzat.setUczestnicy(participants);

        return CzatMapper.toDto(savedCzat);
    }

    public CzatUzytkownik addParticipant(Czat czat, Uzytkownik user) {
        if(user!=null) {
            CzatUzytkownik cu = new CzatUzytkownik();
            cu.setCzat(czat);
            cu.setUzytkownik(user);
            return czatUzytkownikRepository.save(cu);
        }
        return null;
    }




    public List<CzatUzytkownik> getCzatyForUser(Uzytkownik user) {
        List<CzatUzytkownik> uczestnictwa = czatUzytkownikRepository
                .findAll()
                .stream()
                .filter(p -> p.getUzytkownik().getId().equals(user.getId()))
                .toList();

        return uczestnictwa;
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

package api.szyszka.Services;

import api.szyszka.DTOs.Event.CreateUczestnictwoRequest;
import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Mappers.UczestnictwoMapper;
import api.szyszka.Repositories.UczestnictwoRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UczestnictwoService {
    private final UczestnictwoRepository uczestnictwoRepository;
    private final WydarzenieRepository wydarzenieRepository;
    private final UzytkownikRepository uzytkownikRepository;

    public UczestnictwoService(UczestnictwoRepository uczestnictwoRepository, WydarzenieRepository wydarzenieRepository, UzytkownikRepository uzytkownikRepository) {
        this.uczestnictwoRepository = uczestnictwoRepository;
        this.wydarzenieRepository = wydarzenieRepository;
        this.uzytkownikRepository = uzytkownikRepository;
    }

//    public Uczestnictwo createUczestnictwo(CreateUczestnictwoRequest request) {
//        Uczestnictwo uczestnictwo = UczestnictwoMapper.fromCreateRequest(request);
//
//        if (uczestnictwoRepository.findUczestnictwoByUzytkownikId(uczestnictwo.getUzytkownik()).isPresent()) {
//            throw new DuplicateUserUczestnictwoException(uczestnictwo.getUzytkownik());
//        }
//
//        Wydarzenie wydarzenie = wydarzenieRepository.findById(request.getWydarzenie())
//                .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione"));
//        uczestnictwo.setWydarzenie(wydarzenie);
//        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
//                .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione"));
//
//        uczestnictwo.setWydarzenie(wydarzenie);
//        uczestnictwo.setUzytkownik(uzytkownik);
//
//        return uczestnictwoRepository.save(uczestnictwo);
//    }
public Uczestnictwo createUczestnictwo(CreateUczestnictwoRequest request) {
    Uczestnictwo uczestnictwo = UczestnictwoMapper.fromCreateRequest(request);

    // Sprawdź, czy użytkownik już uczestniczy
//    if (uczestnictwoRepository.findUczestnictwoByUzytkownikId(request.getUzytkownikId()).isPresent()) {
//        throw new DuplicateUserUczestnictwoException(request.getUzytkownikId());
//    }

    // Pobierz powiązane encje z bazy
    Wydarzenie wydarzenie = wydarzenieRepository.findById(request.getWydarzenieId())
            .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione"));
    Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
            .orElseThrow(() -> new NoSuchElementException("Użytkownik nie znaleziony"));

    // Przypisz relacje
    uczestnictwo.setWydarzenie(wydarzenie);
    uczestnictwo.setUzytkownik(uzytkownik);

    // Zapisz encję
    return uczestnictwoRepository.save(uczestnictwo);
}

    public Uczestnictwo getUczestnictwoById(Long id) {return uczestnictwoRepository.findById(id).get();}

    public List<Uczestnictwo> getAllUczestnictwo() {return uczestnictwoRepository.findAll();}

    public void deleteUczestnictwoById(Long id) {uczestnictwoRepository.deleteById(id);}

//    public Uczestnictwo modifyUczesnictwoById(Long id, Uczestnictwo updateUczestnictwo) {
//        Uczestnictwo oldUczestnictwo = getUczestnictwoById(id);
//
//        oldUczestnictwo.setObecny(updateUczestnictwo.isObecny());
//        oldUczestnictwo.setUzytkownik(updateUczestnictwo.getUzytkownik());
//        oldUczestnictwo.setWydarzenie(updateUczestnictwo.getWydarzenie());
//
//        return uczestnictwoRepository.save(oldUczestnictwo);
//    }
}

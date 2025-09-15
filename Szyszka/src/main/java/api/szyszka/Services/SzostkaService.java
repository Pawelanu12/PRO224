package api.szyszka.Services;

import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.DuplicateLoginException;
import api.szyszka.Exceptions.DuplicateSzostkaException;
import api.szyszka.Repositories.SzostkaRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SzostkaService {
    private final SzostkaRepository szostkaRepository;
    public SzostkaService(SzostkaRepository szostkaRepository) {
        this.szostkaRepository = szostkaRepository;
    }

    public Szostka create(Szostka szostka) {return szostkaRepository.save(szostka);}

    public Szostka getSzostkaById(Long id) {return szostkaRepository.findById(id).get();}

    public List<Szostka> getAllSzostka() {return szostkaRepository.findAll();}

    public void deleteSzostkaById(Long id) {szostkaRepository.deleteById(id);}

    public Szostka modifySzostkaById(Long id, Szostka updateSzostka) {
        Szostka oldSzostka = getSzostkaById(id);

        if (!oldSzostka.getNazwa().equals(updateSzostka.getNazwa())
                && szostkaRepository.findByNazwa(updateSzostka.getNazwa()).isPresent()) {
            throw new DuplicateSzostkaException(updateSzostka.getNazwa());
        }

        oldSzostka.setNazwa(updateSzostka.getNazwa());
        oldSzostka.setDataStworzenia(updateSzostka.getDataStworzenia());
        oldSzostka.setUzytkownicy(updateSzostka.getUzytkownicy());

        return szostkaRepository.save(oldSzostka);
    }

//    public Optional<Szostka> getSzostkaByUzytkonik(Uzytkownik uzytkownik) {
//        return UzytkownikRepository.findById(uzytkownik.getId())
//                .map(Uzytkownik::getSzostka);
//    }
}

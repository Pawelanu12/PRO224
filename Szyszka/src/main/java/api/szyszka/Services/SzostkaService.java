package api.szyszka.Services;

import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
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

    public Optional<Szostka> getSzostkaById(Long id) {return szostkaRepository.findById(id);}

    public List<Szostka> getAllSprawnosc() {return szostkaRepository.findAll();}

    public void deleteSzostkaById(Long id) {szostkaRepository.deleteById(id);}

    public void modifySzostkaById(Long id, Szostka updatSzostka) {
        Optional<Szostka> oldSzostka = szostkaRepository.findById(id);

        if (oldSzostka.isPresent()) {
            Szostka szostka = oldSzostka.get();
            szostka.setNazwa(updatSzostka.getNazwa());
            szostka.setDataStworzenia(updatSzostka.getDataStworzenia());
            szostka.setUzytkownicy(updatSzostka.getUzytkownicy());
            szostkaRepository.save(szostka);
        }
        else {
            throw new NoSuchElementException("Post not found by id: " + id);
        }
    }

//    public Optional<Szostka> getSzostkaByUzytkonik(Uzytkownik uzytkownik) {
//        return UzytkownikRepository.findById(uzytkownik.getId())
//                .map(Uzytkownik::getSzostka);
//    }
}

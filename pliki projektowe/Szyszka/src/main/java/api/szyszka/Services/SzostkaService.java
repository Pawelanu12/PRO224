package api.szyszka.Services;

import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.DuplicateSzostkaException;
import api.szyszka.Exceptions.SzostkaNotFoundException;
import api.szyszka.Exceptions.UserNotFoundException;
import api.szyszka.Repositories.SzostkaRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SzostkaService {
    private final SzostkaRepository szostkaRepository;
    private final UzytkownikRepository uzytkownikRepository;
    public SzostkaService(SzostkaRepository szostkaRepository, UzytkownikRepository uzytkownikRepository) {
        this.szostkaRepository = szostkaRepository;
        this.uzytkownikRepository = uzytkownikRepository;
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
//        oldSzostka.setDataStworzenia(updateSzostka.getDataStworzenia());
//        oldSzostka.setUzytkownicy(updateSzostka.getUzytkownicy());

        return szostkaRepository.save(oldSzostka);
    }

    public Szostka addUserToSzostka(Long id,String login) {
        Optional<Szostka> szostka = szostkaRepository.findById(id);
        if (szostka.isEmpty()) {
            throw new SzostkaNotFoundException(id);
        }
        Optional<Uzytkownik> user = uzytkownikRepository.findByLogin(login);

        if (user.isEmpty()) {
            throw new UserNotFoundException(id);
        }
        if(user.get().getTypUzytkownika().name().equals("ZUCH"))
        {
            Uzytkownik uzytkownik = user.get();
            uzytkownik.setSzostka(szostka.get());
            uzytkownikRepository.save(uzytkownik);
        }

        return getSzostkaById(id);

    }


    public void deleteUserFromSzostka(Long id) {
        Optional<Uzytkownik> user = uzytkownikRepository.findById(id);

        if (user.isEmpty()) {
            throw new UserNotFoundException(id);
        }
        if(user.get().getSzostka()!=null)
        {
            Uzytkownik uzytkownik = user.get();
            uzytkownik.setSzostka(null);
            uzytkownikRepository.save(uzytkownik);
        }


    }


//    public Optional<Szostka> getSzostkaByUzytkonik(Uzytkownik uzytkownik) {
//        return UzytkownikRepository.findById(uzytkownik.getId())
//                .map(Uzytkownik::getSzostka);
//    }
}

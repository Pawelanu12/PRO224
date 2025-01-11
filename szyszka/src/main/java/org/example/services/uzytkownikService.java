package org.example.services;
//import ...
import jakarta.validation.constraints.Null;
import org.example.entities.Uzytkownik;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class uzytkownikService {

    private UzytkownikRepository uzytkownikRepository;

    public uzytkownikService(UzytkonikRepository uzytkownikRepository)
    {
        this.UztkownikRepository = uzytkownikRepository;
    }

    public void addUzytkownik(Uzytkownik uzytkownik) {
        //this.uzytkownikRepository.save(uzytkownik);
    }

    public Uzytkownik findUzytkownikById(Long id)
    {
        Uzytkownik u = this.findUzytkownikById(id);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Uzytkownik findUzytkownikByImie(String imie)
    {
        Uzytkownik u = this.findUzytkownikByImie(imie);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Uzytkownik findUzytkownikByNazwisko(String nazwisko)
    {
        Uzytkownik u = this.findUzytkownikByNazwisko(nazwisko);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Uzytkownik findUzytkownikByEmail(String email)
    {
        Uzytkownik u = this.findUzytkownikByEmail(email);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public void deleteUzytkownik(Long id) {
        Optional<Uzytkownik> d = this.uzytkownikRepository.findById(id);
        if (d.isPresent()) {
            this.uzytkownikRepository.deleteById(id);
        }
    }

    public void updateUzytkownik(Uzytownik uzytkownik) {
        Optional<Uzytkownik> optionalDog = this.UzytkownkRepository.findById(uzytkownik.getId());
        if (optionalUzytkownik.isPresent()) {
            Uzykownik UzytkownikToUpdate = optionalUzytkownik.get();
            UzytkownikToUpdate.setImie(Uzytkownik.getImie());
            UzytkownikToUpdate.setNazwisko(Uzytkownik.getNazwisko());
            UzytkownikToUpdate.setEmail(Uzytkownik.getEmail());

        }

    }


}

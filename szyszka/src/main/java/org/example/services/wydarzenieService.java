package org.example.services;
//import ...
import jakarta.validation.constraints.Null;
import org.example.entities.Uzytkownik;
import org.example.entities.Wydarzenie;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service

public class wydarzenieService {

    private WydarzenieRepository wydarzenieRepository;

    public wydarzenieService(WydarzenieRepository wydarzenieRepository)
    {
        this.WydarzenieRepository = wydarzenieRepository;
    }

    public void addWydarzenie(Wydarzenie wydarzenie) {
        //this.wydarzenieRepository.save(wydarzenie);
    }

    public Wydarzenie findWydarzenieById(Long id)
    {
        Wydarzenie u = this.findWydarzenieById(id);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Wydarzenie findWydarzenieByNazwa(String nazwa)
    {
        Wydarzenie u = this.findWydarzenieByNazwa(nazwa);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Wydarzenie findWydarzenieByDataWyjazdu(LocalDateTime dataWyjazdu)
    {
        Wydarzenie u = this.findWydarzenieByDataWyjazdu(dataWyjazdu);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Wydarzenie findWydarzenieByDataZakonczenia(LocalDateTime dataZakonczenia)
    {
        Wydarzenie u = this.findWydarzenieByDataZakonczenia(dataZakonczenia);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public Wydarzenie findWydarzenieByOrganizator(Uzytkownik organizator)
    {
        Wydarzenie u = this.findWydarzenieByOrganizator(organizator);
        if (u == null)
        {
            return null;
        }
        else return u;

    }

    public void deleteWydarzenie(Long id) {
        Optional<Wydarzenie> d = this.wydarzenieRepository.findById(id);
        if (d.isPresent()) {
            this.wydarzenieRepository.deleteById(id);
        }
    }

    public void updateUzytkownik(Wydarzenie wydarzenie) {
        Optional<Wydarzenie> optionalWydarzenie = this.WydarzenieRepository.findById(wydarzenie.getId());
        if (optionalWydarzenie.isPresent()) {
            Wydarzenie WydarzenieToUpdate = optionalWydarzenie.get();
            WydarzenieToUpdate.setNazwa(Wydarzenie.getNazwa());
            WydarzenieToUpdate.setDataWyjazdu(Wydarzenie.getDataWyjazdu());
            WydarzenieToUpdate.setDataZakonczenia(Wydarzenie.getDataZakonczenia());
            WydarzenieToUpdate.setOrganizator(Wydarzenie.getOrganizator());

        }

    }
}

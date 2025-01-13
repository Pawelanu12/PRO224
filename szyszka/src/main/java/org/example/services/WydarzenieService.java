package org.example.services;

import org.example.entities.Wydarzenie;
import org.example.repositories.WydarzenieRepository;
import org.example.exceptions.WydarzenieNotFoundException; // import wyjątku
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WydarzenieService {

    private final WydarzenieRepository wydarzenieRepository;

    public WydarzenieService(WydarzenieRepository wydarzenieRepository) {
        this.wydarzenieRepository = wydarzenieRepository;
    }

    public void addWydarzenie(Wydarzenie wydarzenie) {
        this.wydarzenieRepository.save(wydarzenie);
    }

    public Wydarzenie findWydarzenieById(Long id) {
        return wydarzenieRepository.findById(id)
                .orElseThrow(() -> new WydarzenieNotFoundException("Wydarzenie o ID " + id + " nie zostało znalezione"));
    }

    public Wydarzenie findWydarzenieByNazwa(String nazwa) {
        Wydarzenie wydarzenie = wydarzenieRepository.findByNazwa(nazwa);
        if (wydarzenie == null) {
            throw new WydarzenieNotFoundException("Wydarzenie o nazwie " + nazwa + " nie zostało znalezione");
        }
        return wydarzenie;
    }

    public Wydarzenie findWydarzenieByDataWyjazdu(LocalDateTime dataWyjazdu) {
        return wydarzenieRepository.findByDataWyjazdu(dataWyjazdu);
    }

    public Wydarzenie findWydarzenieByDataZakonczenia(LocalDateTime dataZakonczenia) {
        return wydarzenieRepository.findByDataZakonczenia(dataZakonczenia);
    }

    public List<Wydarzenie> findWydarzeniaByOrganizatorId(Long organizatorId) {
        List<Wydarzenie> wydarzenia = wydarzenieRepository.findByOrganizatorId(organizatorId);
        if (wydarzenia.isEmpty()) {
            throw new WydarzenieNotFoundException("Nie znaleziono wydarzeń dla organizatora o ID " + organizatorId);
        }
        return wydarzenia;
    }

    public void deleteWydarzenie(Long id) {
        Optional<Wydarzenie> wydarzenie = wydarzenieRepository.findById(id);
        if (wydarzenie.isPresent()) {
            wydarzenieRepository.deleteById(id);
        } else {
            throw new WydarzenieNotFoundException("Wydarzenie o ID " + id + " nie zostało znalezione, więc nie mogło zostać usunięte");
        }
    }

    public void updateWydarzenie(Wydarzenie wydarzenie) {
        Optional<Wydarzenie> optionalWydarzenie = wydarzenieRepository.findById(wydarzenie.getId());
        if (optionalWydarzenie.isPresent()) {
            Wydarzenie wydarzenieToUpdate = optionalWydarzenie.get();
            wydarzenieToUpdate.setNazwa(wydarzenie.getNazwa());
            wydarzenieToUpdate.setDataWyjazdu(wydarzenie.getDataWyjazdu());
            wydarzenieToUpdate.setDataZakonczenia(wydarzenie.getDataZakonczenia());
            wydarzenieToUpdate.setOrganizatorId(wydarzenie.getOrganizatorId());

            // Zapisz zaktualizowane wydarzenie
            wydarzenieRepository.save(wydarzenieToUpdate);
        } else {
            throw new WydarzenieNotFoundException("Wydarzenie o ID " + wydarzenie.getId() + " nie zostało znalezione, więc nie mogło zostać zaktualizowane");
        }
    }
}

package org.example.services;

import org.example.exceptions.UzytkownikNotFoundException;
import org.example.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.repositories.*;

import java.util.List;
import java.util.Optional;

@Service
public class UzytkownikService {

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private ZuchRepository zuchRepository;

    @Autowired
    private RodzicRepository rodzicRepository;

    @Autowired
    private DruzynowyRepository druzynowyRepository;

    @Autowired
    private PrzybocznyRepository przybocznyRepository;


    public Zuch addZuch(Zuch zuch) {
        return zuchRepository.save(zuch);
    }

    public Rodzic addRodzic(Rodzic rodzic) {
        return rodzicRepository.save(rodzic);
    }

    public Druzynowy addDruzynowy(Druzynowy druzynowy) {
        return druzynowyRepository.save(druzynowy);
    }

    public Przyboczny addPrzyboczny(Przyboczny przyboczny) {
        return przybocznyRepository.save(przyboczny);
    }

    public void deleteUzytkownikById(Long id) {
        if (!uzytkownikRepository.existsById(id)) {
            throw new UzytkownikNotFoundException("Użytkownik o ID " + id + " nie istnieje.");
        }

        // Znajdź wszystkie zuchy powiązane z rodzicem
        List<Zuch> powiazaniZuchy = zuchRepository.findByRodzicId(id);

        // Usuń powiązania z rodzicem
        for (Zuch zuch : powiazaniZuchy) {
            if (id.equals(zuch.getRodzic1())) {
                zuch.setRodzic1(null); // Usuń powiązanie z rodzic_id1
            }
            if (id.equals(zuch.getRodzic2())) {
                zuch.setRodzic2(null); // Usuń powiązanie z rodzic_id2
            }
            zuchRepository.save(zuch); // Zapisz zmiany w bazie
        }

        // Usuń użytkownika
        uzytkownikRepository.deleteById(id);
    }



    //findALL
    public List<Zuch> getAllZuchy() {
        return zuchRepository.findAll();
    }

    public List<Rodzic> getAllRodzice() {
        return rodzicRepository.findAll();
    }

    public List<Druzynowy> getAllDruzynowi() {
        return druzynowyRepository.findAll();
    }

    public List<Przyboczny> getAllPrzyboczni() {
        return przybocznyRepository.findAll();
    }

    public List<Uzytkownik> getUzytkownicyByNazwisko(String nazwisko) {
        return uzytkownikRepository.findByNazwisko(nazwisko);
    }
    public Optional<Uzytkownik> findUzytkownikById(Long id){
        return uzytkownikRepository.findById(id);
    }

}

package org.example.controllers;

import org.example.entities.*;
import org.example.services.UzytkownikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/uzytkownicy")
public class UzytkownikController {

    @Autowired
    private UzytkownikService uzytkownikService;

    @PostMapping("/add/zuch")
    public Zuch addZuch(@RequestBody Zuch zuch) {
        return uzytkownikService.addZuch(zuch);
    }

    @PostMapping("/add/rodzic")
    public Rodzic addRodzic(@RequestBody Rodzic rodzic) {
        return uzytkownikService.addRodzic(rodzic);
    }
    @PostMapping("/add/druzynowy")
    public Druzynowy addDruzynowy(@RequestBody Druzynowy druzynowy) {
        return uzytkownikService.addDruzynowy(druzynowy);
    }

    @PostMapping("/add/przyboczny")
    public Przyboczny addPrzyboczny(@RequestBody Przyboczny przyboczny) {
        return uzytkownikService.addPrzyboczny(przyboczny);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUzytkownikById(@PathVariable Long id) {
        uzytkownikService.deleteUzytkownikById(id);
    }

    @GetMapping("/findall/zuchy")
    public List<Zuch> getAllZuchy() {
        return uzytkownikService.getAllZuchy();
    }

    @GetMapping("/findall/rodzice")
    public List<Rodzic> getAllRodzice() {
        return uzytkownikService.getAllRodzice();
    }

    @GetMapping("/findall/druzynowi")
    public List<Druzynowy> getAllDruzynowi() {
        return uzytkownikService.getAllDruzynowi();
    }

    @GetMapping("/findall/przyboczni")
    public List<Przyboczny> getAllPrzyboczni() {
        return uzytkownikService.getAllPrzyboczni();
    }

    @GetMapping("/findall/bysurname/{nazwisko}")
    public List<Uzytkownik> getUzytkownicyByNazwisko(@PathVariable String nazwisko) {
        return uzytkownikService.getUzytkownicyByNazwisko(nazwisko);
    }

    @GetMapping("/find/byid/{id}")
    public Optional<Uzytkownik> getUzytkownikById(@PathVariable Long id){
        return uzytkownikService.findUzytkownikById(id);
    }
}

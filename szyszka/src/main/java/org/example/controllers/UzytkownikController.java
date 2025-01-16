package org.example.controllers;

import org.example.entities.*;
import org.example.services.UzytkownikService;
import org.example.services.ZdobyteSprawnosciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/uzytkownicy")
public class UzytkownikController {

    @Autowired
    private ZdobyteSprawnosciService zdobyteSprawnosciService;
    @Autowired
    private UzytkownikService uzytkownikService;

    @PostMapping("/add/zuch")
    public ResponseEntity<Zuch> addZuch(@RequestBody Zuch zuch) {
        Zuch createdZuch = uzytkownikService.addZuch(zuch);
        return ResponseEntity.ok(createdZuch);
    }

    @PostMapping("/add/rodzic")
    public ResponseEntity<Rodzic> addRodzic(@RequestBody Rodzic rodzic) {
        Rodzic createdRodzic = uzytkownikService.addRodzic(rodzic);
        return ResponseEntity.ok(createdRodzic);
    }

    @PostMapping("/add/druzynowy")
    public ResponseEntity<Druzynowy> addDruzynowy(@RequestBody Druzynowy druzynowy) {
        Druzynowy createdDruzynowy = uzytkownikService.addDruzynowy(druzynowy);
        return ResponseEntity.ok(createdDruzynowy);
    }

    @PostMapping("/add/przyboczny")
    public ResponseEntity<Przyboczny> addPrzyboczny(@RequestBody Przyboczny przyboczny) {
        Przyboczny createdPrzyboczny = uzytkownikService.addPrzyboczny(przyboczny);
        return ResponseEntity.ok(createdPrzyboczny);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUzytkownikById(@PathVariable Long id) {
        uzytkownikService.deleteUzytkownikById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/findall/zuchy")
    public ResponseEntity<List<Zuch>> getAllZuchy() {
        List<Zuch> zuchy = uzytkownikService.getAllZuchy();
        return ResponseEntity.ok(zuchy);
    }

    @GetMapping("/findall/rodzice")
    public ResponseEntity<List<Rodzic>> getAllRodzice() {
        List<Rodzic> rodzice = uzytkownikService.getAllRodzice();
        return ResponseEntity.ok(rodzice);
    }

    @GetMapping("/findall/druzynowi")
    public ResponseEntity<List<Druzynowy>> getAllDruzynowi() {
        List<Druzynowy> druzynowi = uzytkownikService.getAllDruzynowi();
        return ResponseEntity.ok(druzynowi);
    }

    @GetMapping("/findall/przyboczni")
    public ResponseEntity<List<Przyboczny>> getAllPrzyboczni() {
        List<Przyboczny> przyboczni = uzytkownikService.getAllPrzyboczni();
        return ResponseEntity.ok(przyboczni);
    }

    @GetMapping("/findall/bysurname/{nazwisko}")
    public ResponseEntity<List<Uzytkownik>> getUzytkownicyByNazwisko(@PathVariable String nazwisko) {
        List<Uzytkownik> uzytkownicy = uzytkownikService.getUzytkownicyByNazwisko(nazwisko);
        return ResponseEntity.ok(uzytkownicy);
    }

    @GetMapping("/find/byid/{id}")
    public ResponseEntity<Optional<Uzytkownik>> getUzytkownikById(@PathVariable Long id){
        Optional<Uzytkownik> uzytkownik = uzytkownikService.findUzytkownikById(id);
        return ResponseEntity.of(Optional.ofNullable(uzytkownik));
    }

    @GetMapping("/{id}/zdobyteSprawnosci")
    public ResponseEntity<List<ZdobyteSprawnosci>> getZdobyteSprawnosciByUzytkownikId(@PathVariable Long id) {
        Optional<List<ZdobyteSprawnosci>> zdobyteSprawnosci = Optional.ofNullable(zdobyteSprawnosciService.findByUzytkownikId(id));
        return zdobyteSprawnosci.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}

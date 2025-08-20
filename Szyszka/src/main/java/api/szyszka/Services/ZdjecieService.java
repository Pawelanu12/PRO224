package api.szyszka.Services;

import api.szyszka.Entities.Zdjecie;
import api.szyszka.Repositories.ZdjecieRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class ZdjecieService {
    private final ZdjecieRepository zdjecieRepository;
    public ZdjecieService(ZdjecieRepository zdjecieRepository) {
        this.zdjecieRepository = zdjecieRepository;
    }

    public Zdjecie createZdjecie(Zdjecie zdjecie) {return zdjecieRepository.save(zdjecie);}

    public Optional<Zdjecie> getZdjecieById(long id) {return zdjecieRepository.findById(id);}

    public List<Zdjecie> getAllZdjecies() {return zdjecieRepository.findAll();}

    public void deleteZdjecie(long id) {zdjecieRepository.deleteById(id);}

    public void modifyZdjecieById(long id, Zdjecie updateZdjecie) {
        Optional<Zdjecie> oldZdjecie = zdjecieRepository.findById(id);

        if (oldZdjecie.isPresent()) {
            Zdjecie zdjecie = oldZdjecie.get();
            zdjecie.setSciezka(updateZdjecie.getSciezka());
            zdjecie.setPost(updateZdjecie.getPost());
            zdjecie.setWydarzenie(updateZdjecie.getWydarzenie());
            zdjecie.setUzytkownik(updateZdjecie.getUzytkownik());
            zdjecieRepository.save(updateZdjecie);
        }
        else {
            throw new NoSuchElementException("Zdjecie not found by id: " + id);
        }
    }
}

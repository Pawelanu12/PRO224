package api.szyszka.Services;

import api.szyszka.DTOs.CreateZdjecieRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Entities.Zdjecie;
import api.szyszka.Mappers.ZdjecieMapper;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Repositories.ZdjecieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ZdjecieService {
    private final ZdjecieRepository zdjecieRepository;
    private final UzytkownikRepository uzytkownikRepository;
    private final PostRepository postRepository;
    private final WydarzenieService wydarzenieService;
    private final WydarzenieRepository wydarzenieRepository;

    public ZdjecieService(ZdjecieRepository zdjecieRepository, UzytkownikRepository uzytkownikRepository,
                          PostRepository postRepository, WydarzenieService wydarzenieService, WydarzenieRepository wydarzenieRepository) {
        this.zdjecieRepository = zdjecieRepository;
        this.uzytkownikRepository = uzytkownikRepository;
        this.postRepository = postRepository;
        this.wydarzenieService = wydarzenieService;
        this.wydarzenieRepository = wydarzenieRepository;
    }

    public Zdjecie createZdjecie(CreateZdjecieRequest request) {
        Zdjecie zdjecie = ZdjecieMapper.fromCreateRequest(request);

        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
                .orElseThrow(() -> new NoSuchElementException("uzytkownik nie znaleziony"));
        zdjecie.setUzytkownik(uzytkownik);
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new NoSuchElementException("post nie znaleziony"));
        zdjecie.setPost(post);
        Wydarzenie wydarzenie = wydarzenieRepository.findById(request.getWydarzenieId())
                .orElseThrow(() -> new NoSuchElementException("wydarzenia nie znaleziono"));
        zdjecie.setWydarzenie(wydarzenie);

        return zdjecieRepository.save(zdjecie);
    }

    public Zdjecie getZdjecieById(long id) {return zdjecieRepository.findById(id).get();}

    public List<Zdjecie> getAllZdjecies() {return zdjecieRepository.findAll();}

    public void deleteZdjecie(long id) {zdjecieRepository.deleteById(id);}

    public Zdjecie modifyZdjecieById(long id, Zdjecie updateZdjecie) {
        Zdjecie oldZdjecie = getZdjecieById(id);

        oldZdjecie.setSciezka(updateZdjecie.getSciezka());
        oldZdjecie.setWydarzenie(updateZdjecie.getWydarzenie());
        oldZdjecie.setPost(updateZdjecie.getPost());
        oldZdjecie.setUzytkownik(updateZdjecie.getUzytkownik());

//        if (oldZdjecie.isPresent()) {
//            Zdjecie zdjecie = oldZdjecie.get();
//            zdjecie.setSciezka(updateZdjecie.getSciezka());
//            zdjecie.setPost(updateZdjecie.getPost());
//            zdjecie.setWydarzenie(updateZdjecie.getWydarzenie());
//            zdjecie.setUzytkownik(updateZdjecie.getUzytkownik());
//            zdjecieRepository.save(updateZdjecie);
//        }
//        else {
//            throw new NoSuchElementException("Zdjecie not found by id: " + id);
//        }
        return zdjecieRepository.save(oldZdjecie);
    }
}

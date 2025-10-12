package api.szyszka.Services;

import api.szyszka.DTOs.CreateKomentarzRequest;
import api.szyszka.Entities.Komentarz;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.KomentarzMapper;
import api.szyszka.Repositories.KomentarzRepository;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class KomentarzService {

    private final KomentarzRepository komentarzRepository;
    private final PostRepository postRepository;
    private final UzytkownikRepository uzytkownikRepository;
    private final WydarzenieRepository wydarzenieRepository;

    public KomentarzService(KomentarzRepository komentarzRepository, PostRepository postRepository
    , UzytkownikRepository uzytkownikRepository, WydarzenieRepository wydarzenieRepository) {
        this.komentarzRepository = komentarzRepository;
        this.postRepository = postRepository;
        this.uzytkownikRepository = uzytkownikRepository;
        this.wydarzenieRepository = wydarzenieRepository;
    }

    public Komentarz CreateKomentarz(CreateKomentarzRequest request) {
        Komentarz komentarz = KomentarzMapper.fromCreateRequest(request);

        Uzytkownik autor = uzytkownikRepository.findById(request.getAutorId())
                .orElseThrow(() -> new NoSuchElementException("Autor nie znaleziony" + request.getAutorId()));

        komentarz.setAutor(autor);

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new NoSuchElementException("Post nie znaleziony" + request.getPostId()));

        komentarz.setPost(post);

        return komentarzRepository.save(komentarz);
    }

    public List<Komentarz> GetAllKomentarz() {
        return komentarzRepository.findAll();
    }

    public List<Komentarz> getKomentarzByAutor(Long autorId) {
        return komentarzRepository.findByAutor_Id(autorId);
    }

    public List<Komentarz> getKomentarzByPost(Long postId) {
        return komentarzRepository.findByPostId(postId);
    }

    public Komentarz GetKomentarzById(Long id) {
        return komentarzRepository.findById(id).get();
    }

    public void deleteKomentarz(Long id) {
        komentarzRepository.deleteById(id);
    }

    public Komentarz modifyKomentarz(Long id, Komentarz updateKomentarz) {
        Komentarz oldKomentarz = GetKomentarzById(id);

        oldKomentarz.setDataStworzenia(updateKomentarz.getDataStworzenia());
        oldKomentarz.setTresc(updateKomentarz.getTresc());
        oldKomentarz.setPost(updateKomentarz.getPost());
        oldKomentarz.setAutor(updateKomentarz.getAutor());

        return komentarzRepository.save(oldKomentarz);
    }
}

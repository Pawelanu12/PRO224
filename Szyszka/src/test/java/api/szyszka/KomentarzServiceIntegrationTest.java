package api.szyszka;

import api.szyszka.DTOs.Post.CreateKomentarzRequest;
import api.szyszka.Entities.Komentarz;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.KomentarzRepository;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.KomentarzService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class KomentarzServiceIntegrationTest {

    @Autowired
    private KomentarzService komentarzService;

    @Autowired
    private KomentarzRepository komentarzRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private PostRepository postRepository;

    private Uzytkownik autor;
    private Post post;

    @BeforeEach
    void setUp() {
        autor = new Uzytkownik();
        autor.setLogin("autor_login");
        autor.setEmail("autor@test.pl");
        autor.setHaslo("haslo");
        autor.setImie("Jan");
        autor.setNazwisko("Kowalski");
        autor.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);
        autor = uzytkownikRepository.save(autor);

        post = new Post();
        post.setAutor(autor);
        post.setTresc("Post testowy");
        post.setDataStworzenia(LocalDateTime.now()); // systemowo
        post = postRepository.save(post);
    }

    // ================= CREATE =================

    @Test
    void shouldCreateKomentarz() {
        CreateKomentarzRequest request = new CreateKomentarzRequest();
        request.setTresc("Komentarz testowy");
        request.setAutorId(autor.getId());
        request.setPostId(post.getId());
        request.setDataStworzenia(LocalDateTime.now()); // SYMULACJA SYSTEMU

        Komentarz komentarz = komentarzService.CreateKomentarz(request);

        assertNotNull(komentarz.getId());
        assertEquals("Komentarz testowy", komentarz.getTresc());
        assertEquals(autor.getId(), komentarz.getAutor().getId());
        assertEquals(post.getId(), komentarz.getPost().getId());
        assertNotNull(komentarz.getDataStworzenia());
    }

    // ================= READ =================

    @Test
    void shouldReturnKomentarzeByAutor() {
        createKomentarz("A");
        createKomentarz("B");

        List<Komentarz> komentarze =
                komentarzService.getKomentarzByAutor(autor.getId());

        assertEquals(2, komentarze.size());
    }

    @Test
    void shouldReturnKomentarzeByPost() {
        createKomentarz("Komentarz");

        List<Komentarz> komentarze =
                komentarzService.getKomentarzByPost(post.getId());

        assertEquals(1, komentarze.size());
    }

    @Test
    void shouldReturnKomentarzById() {
        Komentarz komentarz = createKomentarz("Jedyny");

        Komentarz found =
                komentarzService.GetKomentarzById(komentarz.getId());

        assertEquals(komentarz.getId(), found.getId());
    }

    // ================= UPDATE =================

    @Test
    void shouldModifyKomentarz() {
        Komentarz komentarz = createKomentarz("Old");

        komentarz.setTresc("New");

        Komentarz updated =
                komentarzService.modifyKomentarz(komentarz.getId(), komentarz);

        assertEquals("New", updated.getTresc());
    }

    // ================= DELETE =================

    @Test
    void shouldDeleteKomentarz() {
        Komentarz komentarz = createKomentarz("Do usunięcia");

        komentarzService.deleteKomentarz(komentarz.getId());

        assertTrue(
                komentarzRepository.findById(komentarz.getId()).isEmpty()
        );
    }

    // ================= HELPER =================

    private Komentarz createKomentarz(String tresc) {
        CreateKomentarzRequest request = new CreateKomentarzRequest();
        request.setTresc(tresc);
        request.setAutorId(autor.getId());
        request.setPostId(post.getId());
        request.setDataStworzenia(LocalDateTime.now()); // KLUCZOWE

        return komentarzService.CreateKomentarz(request);
    }
}
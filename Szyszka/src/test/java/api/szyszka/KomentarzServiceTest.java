package api.szyszka;

import api.szyszka.DTOs.Post.CreateKomentarzRequest;
import api.szyszka.Entities.Komentarz;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.KomentarzRepository;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.KomentarzService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KomentarzServiceTest {

    @Mock
    private KomentarzRepository komentarzRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private UzytkownikRepository uzytkownikRepository;
    @Mock
    private WydarzenieRepository wydarzenieRepository;

    @InjectMocks
    private KomentarzService komentarzService;

    // ========= CreateKomentarz =========
    @Test
    void shouldCreateKomentarz() {
        CreateKomentarzRequest req = new CreateKomentarzRequest();
        req.setAutorId(1L);
        req.setPostId(2L);
        req.setTresc("test");

        Uzytkownik autor = new Uzytkownik();
        autor.setId(1L);

        Post post = new Post();
        post.setId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(autor));
        when(postRepository.findById(2L))
                .thenReturn(Optional.of(post));
        when(komentarzRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Komentarz komentarz = komentarzService.CreateKomentarz(req);

        assertThat(komentarz).isNotNull();
        assertThat(komentarz.getAutor()).isEqualTo(autor);
        assertThat(komentarz.getPost()).isEqualTo(post);
    }

    @Test
    void shouldThrowWhenAutorNotFound() {
        CreateKomentarzRequest req = new CreateKomentarzRequest();
        req.setAutorId(1L);
        req.setPostId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> komentarzService.CreateKomentarz(req))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void shouldThrowWhenPostNotFound() {
        CreateKomentarzRequest req = new CreateKomentarzRequest();
        req.setAutorId(1L);
        req.setPostId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(new Uzytkownik()));
        when(postRepository.findById(2L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> komentarzService.CreateKomentarz(req))
                .isInstanceOf(NoSuchElementException.class);
    }

    // ========= GetAllKomentarz =========
    @Test
    void shouldReturnAllKomentarze() {
        when(komentarzRepository.findAll())
                .thenReturn(List.of(new Komentarz(), new Komentarz()));

        List<Komentarz> result = komentarzService.GetAllKomentarz();

        assertThat(result).hasSize(2);
    }

    // ========= getKomentarzByAutor =========
    @Test
    void shouldReturnKomentarzeByAutor() {
        when(komentarzRepository.findByAutor_Id(1L))
                .thenReturn(List.of(new Komentarz()));

        List<Komentarz> result = komentarzService.getKomentarzByAutor(1L);

        assertThat(result).hasSize(1);
    }

    // ========= getKomentarzByPost =========
    @Test
    void shouldReturnKomentarzeByPost() {
        when(komentarzRepository.findByPostId(1L))
                .thenReturn(List.of(new Komentarz()));

        List<Komentarz> result = komentarzService.getKomentarzByPost(1L);

        assertThat(result).hasSize(1);
    }

    // ========= GetKomentarzById =========
    @Test
    void shouldReturnKomentarzById() {
        Komentarz komentarz = new Komentarz();
        komentarz.setId(1L);

        when(komentarzRepository.findById(1L))
                .thenReturn(Optional.of(komentarz));

        Komentarz result = komentarzService.GetKomentarzById(1L);

        assertThat(result).isEqualTo(komentarz);
    }

    // ========= deleteKomentarz =========
    @Test
    void shouldDeleteKomentarz() {
        komentarzService.deleteKomentarz(1L);

        verify(komentarzRepository).deleteById(1L);
    }

    // ========= modifyKomentarz =========
    @Test
    void shouldModifyKomentarz() {
        Komentarz oldKomentarz = new Komentarz();
        oldKomentarz.setId(1L);
        oldKomentarz.setTresc("old");

        Komentarz update = new Komentarz();
        update.setTresc("new");

        when(komentarzRepository.findById(1L))
                .thenReturn(Optional.of(oldKomentarz));
        when(komentarzRepository.save(any()))
                .thenReturn(oldKomentarz);

        Komentarz result = komentarzService.modifyKomentarz(1L, update);

        assertThat(result.getTresc()).isEqualTo("new");
    }
}

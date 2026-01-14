package api.szyszka;

import api.szyszka.DTOs.Images.CreateZdjecieRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Entities.Zdjecie;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Repositories.ZdjecieRepository;
import api.szyszka.Services.WydarzenieService;
import api.szyszka.Services.ZdjecieService;
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
class ZdjecieServiceTest {

    @Mock
    private ZdjecieRepository zdjecieRepository;
    @Mock
    private UzytkownikRepository uzytkownikRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private WydarzenieRepository wydarzenieRepository;
    @Mock
    private WydarzenieService wydarzenieService;

    @InjectMocks
    private ZdjecieService zdjecieService;

    // ========= createZdjecie =========

    @Test
    void shouldCreateZdjecieWithUzytkownik() {
        CreateZdjecieRequest req = new CreateZdjecieRequest();
        req.setUzytkownikId(1L);

        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(zdjecieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Zdjecie result = zdjecieService.createZdjecie(req);

        assertThat(result.getUzytkownik()).isEqualTo(user);
    }

    @Test
    void shouldCreateZdjecieWithPost() {
        CreateZdjecieRequest req = new CreateZdjecieRequest();
        req.setPostId(2L);

        Post post = new Post();
        post.setId(2L);

        when(postRepository.findById(2L))
                .thenReturn(Optional.of(post));
        when(zdjecieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Zdjecie result = zdjecieService.createZdjecie(req);

        assertThat(result.getPost()).isEqualTo(post);
    }

    @Test
    void shouldCreateZdjecieWithWydarzenie() {
        CreateZdjecieRequest req = new CreateZdjecieRequest();
        req.setWydarzenieId(3L);

        Wydarzenie wydarzenie = new Wydarzenie();
        wydarzenie.setId(3L);

        when(wydarzenieRepository.findById(3L))
                .thenReturn(Optional.of(wydarzenie));
        when(zdjecieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Zdjecie result = zdjecieService.createZdjecie(req);

        assertThat(result.getWydarzenie()).isEqualTo(wydarzenie);
    }

    @Test
    void shouldThrowWhenUzytkownikNotFound() {
        CreateZdjecieRequest req = new CreateZdjecieRequest();
        req.setUzytkownikId(1L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> zdjecieService.createZdjecie(req))
                .isInstanceOf(NoSuchElementException.class);
    }

    // ========= getZdjecieById =========

    @Test
    void shouldReturnZdjecieById() {
        Zdjecie zdjecie = new Zdjecie();
        zdjecie.setId(1L);

        when(zdjecieRepository.findById(1L))
                .thenReturn(Optional.of(zdjecie));

        Zdjecie result = zdjecieService.getZdjecieById(1L);

        assertThat(result).isEqualTo(zdjecie);
    }

    // ========= getAllZdjecies =========

    @Test
    void shouldReturnAllZdjecia() {
        when(zdjecieRepository.findAll())
                .thenReturn(List.of(new Zdjecie(), new Zdjecie()));

        List<Zdjecie> result = zdjecieService.getAllZdjecies();

        assertThat(result).hasSize(2);
    }

    // ========= deleteZdjecie =========

    @Test
    void shouldDeleteZdjecie() {
        zdjecieService.deleteZdjecie(1L);

        verify(zdjecieRepository).deleteById(1L);
    }

    // ========= modifyZdjecieById =========

    @Test
    void shouldModifyZdjecie() {
        Zdjecie old = new Zdjecie();
        old.setId(1L);
        old.setSciezka("old.jpg");

        Zdjecie update = new Zdjecie();
        update.setSciezka("new.jpg");

        when(zdjecieRepository.findById(1L))
                .thenReturn(Optional.of(old));
        when(zdjecieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Zdjecie result = zdjecieService.modifyZdjecieById(1L, update);

        assertThat(result.getSciezka()).isEqualTo("new.jpg");
    }
}
package api.szyszka;

import api.szyszka.DTOs.Event.CreateUczestnictwoRequest;
import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Repositories.UczestnictwoRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.UczestnictwoService;
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
class UczestnictwoServiceTest {

    @Mock
    private UczestnictwoRepository uczestnictwoRepository;
    @Mock
    private WydarzenieRepository wydarzenieRepository;
    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @InjectMocks
    private UczestnictwoService uczestnictwoService;

    // ========= createUczestnictwo =========

    @Test
    void shouldCreateUczestnictwo() {
        CreateUczestnictwoRequest req = new CreateUczestnictwoRequest();
        req.setUzytkownikId(1L);
        req.setWydarzenieId(2L);

        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        Wydarzenie wydarzenie = new Wydarzenie();
        wydarzenie.setId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(wydarzenieRepository.findById(2L))
                .thenReturn(Optional.of(wydarzenie));
        when(uczestnictwoRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Uczestnictwo result = uczestnictwoService.createUczestnictwo(req);

        assertThat(result.getUzytkownik()).isEqualTo(user);
        assertThat(result.getWydarzenie()).isEqualTo(wydarzenie);
    }

    @Test
    void shouldThrowWhenWydarzenieNotFound() {
        CreateUczestnictwoRequest req = new CreateUczestnictwoRequest();
        req.setUzytkownikId(1L);
        req.setWydarzenieId(2L);

        when(wydarzenieRepository.findById(2L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> uczestnictwoService.createUczestnictwo(req))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void shouldThrowWhenUzytkownikNotFound() {
        CreateUczestnictwoRequest req = new CreateUczestnictwoRequest();
        req.setUzytkownikId(1L);
        req.setWydarzenieId(2L);

        when(wydarzenieRepository.findById(2L))
                .thenReturn(Optional.of(new Wydarzenie()));
        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> uczestnictwoService.createUczestnictwo(req))
                .isInstanceOf(NoSuchElementException.class);
    }

    // ========= getUczestnictwoById =========

    @Test
    void shouldReturnUczestnictwoById() {
        Uczestnictwo uczestnictwo = new Uczestnictwo();
        uczestnictwo.setId(1L);

        when(uczestnictwoRepository.findById(1L))
                .thenReturn(Optional.of(uczestnictwo));

        Uczestnictwo result =
                uczestnictwoService.getUczestnictwoById(1L);

        assertThat(result).isEqualTo(uczestnictwo);
    }

    // ========= getAllUczestnictwo =========

    @Test
    void shouldReturnAllUczestnictwa() {
        when(uczestnictwoRepository.findAll())
                .thenReturn(List.of(new Uczestnictwo(), new Uczestnictwo()));

        List<Uczestnictwo> result =
                uczestnictwoService.getAllUczestnictwo();

        assertThat(result).hasSize(2);
    }

    // ========= deleteUczestnictwoById =========

    @Test
    void shouldDeleteUczestnictwo() {
        uczestnictwoService.deleteUczestnictwoById(1L);

        verify(uczestnictwoRepository).deleteById(1L);
    }
}
package api.szyszka;

import api.szyszka.DTOs.Event.CreateWydarzenieRequest;
import api.szyszka.DTOs.Event.UpdateWydarzenieRequest;
import api.szyszka.Entities.TypWydarzenia;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Entities.WydarzenieZdjecie;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.WydarzenieService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WydarzenieServiceTest {

    @Mock
    private WydarzenieRepository wydarzenieRepository;

    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @Spy
    @InjectMocks
    private WydarzenieService wydarzenieService;

    // ========= createWydarzenieWithPhotos =========

    @Test
    void shouldCreateWydarzenieWithoutPhotos() {
        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
        req.setNazwa("Biwy");
        req.setOrganizatorId(1L);

        Uzytkownik organizator = new Uzytkownik();
        organizator.setId(1L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(organizator));

        when(wydarzenieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Wydarzenie result =
                wydarzenieService.createWydarzenieWithPhotos(req, null);

        assertThat(result.getOrganizator()).isEqualTo(organizator);
        assertThat(result.getNazwa()).isEqualTo("Biwy");
        assertThat(result.getZdjecia()).isEmpty();
    }

    @Test
    void shouldThrowWhenOrganizatorNotFound() {
        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
        req.setOrganizatorId(99L);

        when(uzytkownikRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                wydarzenieService.createWydarzenieWithPhotos(req, null)
        ).isInstanceOf(NoSuchElementException.class);
    }

    // ========= getAllWydarzenia =========

    @Test
    void shouldReturnAllWydarzenia() {
        when(wydarzenieRepository.findAll())
                .thenReturn(List.of(new Wydarzenie(), new Wydarzenie()));

        List<Wydarzenie> result = wydarzenieService.getAllWydarzenia();

        assertThat(result).hasSize(2);
    }

    // ========= getWydarzenieById =========

    @Test
    void shouldReturnWydarzenieById() {
        Wydarzenie w = new Wydarzenie();
        w.setId(1L);

        when(wydarzenieRepository.findById(1L))
                .thenReturn(Optional.of(w));

        Wydarzenie result = wydarzenieService.getWydarzenieById(1L);

        assertThat(result).isEqualTo(w);
    }

    // ========= deleteWydarzenie =========

    @Test
    void shouldDeleteWydarzenie() {
        wydarzenieService.deleteWydarzenie(1L);

        verify(wydarzenieRepository).deleteById(1L);
    }

    // ========= modifyWydarzenie =========

    @Test
    void shouldModifyWydarzenie() {
        Wydarzenie old = new Wydarzenie();
        old.setId(1L);
        old.setNazwa("Stare");
        old.setTyp(TypWydarzenia.BIWAK); // stary typ

        UpdateWydarzenieRequest req = new UpdateWydarzenieRequest(
                "Nowe",
                LocalDateTime.now(),
                null,
                "Opis",
                TypWydarzenia.ZIMOWISKO, // nowy typ
                null, // zdjecia do usunięcia
                null  // nowe zdjecia
        );

        when(wydarzenieRepository.findById(1L))
                .thenReturn(Optional.of(old));
        when(wydarzenieRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Wydarzenie result = wydarzenieService.modifyWydarzenie(1L, req);

        assertThat(result.getNazwa()).isEqualTo("Nowe");
        assertThat(result.getOpis()).isEqualTo("Opis");
        assertThat(result.getTyp()).isEqualTo(TypWydarzenia.ZIMOWISKO); // sprawdzenie typu
    }


    // ========= getWydarzenieByNazwa =========

    @Test
    void shouldReturnWydarzenieByNazwa() {
        Wydarzenie w = new Wydarzenie();
        w.setNazwa("Rajd");

        when(wydarzenieRepository.findByNazwa("Rajd"))
                .thenReturn(Optional.of(w));

        Wydarzenie result =
                wydarzenieService.getWydarzenieByNazwa("Rajd");

        assertThat(result).isEqualTo(w);
    }
}
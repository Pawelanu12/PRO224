package api.szyszka;

import api.szyszka.DTOs.Chat.CreateWiadomoscRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.*;
import api.szyszka.Services.WiadomoscService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WiadomoscServiceTest {

    @Mock
    private WiadomoscRepository wiadomoscRepository;
    @Mock
    private CzatRepository czatRepository;
    @Mock
    private UzytkownikRepository uzytkownikRepository;
    @Mock
    private ZdjecieRepository zdjecieRepository;
    @Mock
    private CzatUzytkownikRepository czatUzytkownikRepository;
    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private WiadomoscService wiadomoscService;

    // ========= createWiadomosc =========
    @Test
    void shouldCreateWiadomosc() {
        CreateWiadomoscRequest req = new CreateWiadomoscRequest();
        req.setCzatId(1L);
        req.setUzytkownikId(2L);
        req.setTresc("hello");

        Czat czat = new Czat();
        czat.setId(1L);

        Uzytkownik user = new Uzytkownik();
        user.setId(2L);

        when(czatRepository.findById(1L))
                .thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findById(2L))
                .thenReturn(Optional.of(user));
        when(wiadomoscRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));
        when(czatUzytkownikRepository.findAllByCzatId(1L))
                .thenReturn(List.of());

        Wiadomosc result = wiadomoscService.createWiadomosc(req);

        assertThat(result.getCzat()).isEqualTo(czat);
        assertThat(result.getNadawca()).isEqualTo(user);
    }

    // ========= handleMessage =========
    @Test
    void shouldHandleMessageAndIncrementUnread() {
        CreateWiadomoscRequest req = new CreateWiadomoscRequest();
        req.setCzatId(1L);

        // ===== nadawca =====
        Uzytkownik nadawca = new Uzytkownik();
        nadawca.setId(1L);

        // ===== czat =====
        Czat czat = new Czat();
        czat.setId(1L);

        // ===== wiadomość =====
        Wiadomosc wiadomosc = new Wiadomosc();
        wiadomosc.setNadawca(nadawca);
        wiadomosc.setCzat(czat);

        // ===== uczestnik czatu (odbiorca) =====
        CzatUzytkownik cu = new CzatUzytkownik();
        Uzytkownik odbiorca = new Uzytkownik();
        odbiorca.setId(2L);

        cu.setUzytkownik(odbiorca);
        cu.setNieprzeczytaneWiadomosci(0);

        when(czatUzytkownikRepository.findAllByCzatId(1L))
                .thenReturn(List.of(cu));

        // ===== when =====
        wiadomoscService.handleMessage(req, wiadomosc);

        // ===== then =====
        assertThat(cu.getNieprzeczytaneWiadomosci()).isEqualTo(1);
        verify(czatUzytkownikRepository).save(cu);

        verify(messagingTemplate, atLeastOnce())
                .convertAndSend(anyString(), any(Object.class));
    }

    // ========= getWiadomoscById =========
    @Test
    void shouldReturnWiadomoscById() {
        Wiadomosc w = new Wiadomosc();
        w.setId(1L);

        when(wiadomoscRepository.findById(1L))
                .thenReturn(Optional.of(w));

        Wiadomosc result = wiadomoscService.getWiadomoscById(1L);

        assertThat(result).isEqualTo(w);
    }

    // ========= getAllWiadomosc =========
    @Test
    void shouldReturnAllWiadomosci() {
        when(wiadomoscRepository.findAll())
                .thenReturn(List.of(new Wiadomosc(), new Wiadomosc()));

        List<Wiadomosc> result = wiadomoscService.getAllWiadomosc();

        assertThat(result).hasSize(2);
    }

    // ========= deleteWiadomoscById =========
    @Test
    void shouldDeleteWiadomosc() {
        wiadomoscService.deleteWiadomoscById(1L);

        verify(wiadomoscRepository).deleteById(1L);
    }

    // ========= modifyWiadomosc =========
    @Test
    void shouldModifyWiadomosc() {
        Wiadomosc old = new Wiadomosc();
        old.setId(1L);
        old.setTresc("old");

        when(wiadomoscRepository.findById(1L))
                .thenReturn(Optional.of(old));
        when(wiadomoscRepository.save(any()))
                .thenReturn(old);

        Wiadomosc result = wiadomoscService.modifyWiadomosc(1L, "new");

        assertThat(result.getTresc()).isEqualTo("new");
    }
}
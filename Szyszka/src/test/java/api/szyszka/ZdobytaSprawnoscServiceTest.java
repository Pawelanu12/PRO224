package api.szyszka;

import api.szyszka.DTOs.Sprawnosci.CreateZdobytaSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.ZdobytaSprawnosc;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Repositories.ZdobytaSprawnoscRepository;
import api.szyszka.Services.ZdobytaSprawnoscService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ZdobytaSprawnoscServiceTest {

    @Mock
    private ZdobytaSprawnoscRepository zdobytaSprawnoscRepository;

    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @Mock
    private SprawnoscRepository sprawnoscRepository;

    @Mock
    private WydarzenieRepository wydarzenieRepository;

    @InjectMocks
    private ZdobytaSprawnoscService zdobytaSprawnoscService;

    // ========= createZdobytaSprawnosc =========
    @Test
    void shouldCreateZdobytaSprawnosc() {
        CreateZdobytaSprawnoscRequest req = new CreateZdobytaSprawnoscRequest();
        req.setUzytkownikId(1L);
        req.setSprawnoscId(2L);

        Uzytkownik uzytkownik = new Uzytkownik();
        uzytkownik.setId(1L);

        Sprawnosc sprawnosc = new Sprawnosc();
        sprawnosc.setId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(uzytkownik));
        when(sprawnoscRepository.findById(2L))
                .thenReturn(Optional.of(sprawnosc));
        when(zdobytaSprawnoscRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.createZdobytaSprawnosc(req);

        assertThat(result).isNotNull();
        assertThat(result.getUzytkownik()).isEqualTo(uzytkownik);
        assertThat(result.getSprawnosc()).isEqualTo(sprawnosc);
    }

    @Test
    void shouldThrowWhenUzytkownikNotFound() {
        CreateZdobytaSprawnoscRequest req = new CreateZdobytaSprawnoscRequest();
        req.setUzytkownikId(1L);
        req.setSprawnoscId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                zdobytaSprawnoscService.createZdobytaSprawnosc(req)
        ).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void shouldThrowWhenSprawnoscNotFound() {
        CreateZdobytaSprawnoscRequest req = new CreateZdobytaSprawnoscRequest();
        req.setUzytkownikId(1L);
        req.setSprawnoscId(2L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(new Uzytkownik()));
        when(sprawnoscRepository.findById(2L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                zdobytaSprawnoscService.createZdobytaSprawnosc(req)
        ).isInstanceOf(NoSuchElementException.class);
    }

    // ========= getAllZdobytaSprawnosc =========
    @Test
    void shouldReturnAllZdobyteSprawnosci() {
        when(zdobytaSprawnoscRepository.findAll())
                .thenReturn(List.of(new ZdobytaSprawnosc(), new ZdobytaSprawnosc()));

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnosc();

        assertThat(result).hasSize(2);
    }

    // ========= getAllZdobytaSprawnoscBySprawnoscId =========
    @Test
    void shouldReturnZdobyteSprawnosciBySprawnoscId() {
        when(zdobytaSprawnoscRepository.findBySprawnoscId(1L))
                .thenReturn(List.of(new ZdobytaSprawnosc()));

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscBySprawnoscId(1L);

        assertThat(result).hasSize(1);
    }

    // ========= getAllZdobytaSprawnoscByUzytkownikId =========
    @Test
    void shouldReturnZdobyteSprawnosciByUzytkownikId() {
        when(zdobytaSprawnoscRepository.findByUzytkownikId(1L))
                .thenReturn(List.of(new ZdobytaSprawnosc()));

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscByUzytkownikId(1L);

        assertThat(result).hasSize(1);
    }

    // ========= getZdobytaSprawnoscById =========
    @Test
    void shouldReturnZdobytaSprawnoscById() {
        ZdobytaSprawnosc zs = new ZdobytaSprawnosc();
        zs.setId(1L);

        when(zdobytaSprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(zs));

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.getZdobytaSprawnoscById(1L);

        assertThat(result).isEqualTo(zs);
    }

    // ========= deleteZdobytaSprawnoscById =========
    @Test
    void shouldDeleteZdobytaSprawnosc() {
        zdobytaSprawnoscService.deleteZdobytaSprawnoscById(1L);

        verify(zdobytaSprawnoscRepository).deleteById(1L);
    }

    // ========= modifyZdobytaSprawnosc =========
    @Test
    void shouldModifyZdobytaSprawnosc() {
        ZdobytaSprawnosc old = new ZdobytaSprawnosc();
        old.setId(1L);

        ZdobytaSprawnosc update = new ZdobytaSprawnosc();
        update.setDataZdobyciaSprawnosci(LocalDateTime.now());
        update.setUzytkownik(new Uzytkownik());
        update.setSprawnosc(new Sprawnosc());

        when(zdobytaSprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(old));
        when(zdobytaSprawnoscRepository.save(any()))
                .thenReturn(old);

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.modifyZdobytaSprawnosc(1L, update);

        assertThat(result).isNotNull();
    }
}
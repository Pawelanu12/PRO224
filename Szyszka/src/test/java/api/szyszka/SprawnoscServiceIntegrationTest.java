package api.szyszka;

import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.TypSprawnosci;
import api.szyszka.Exceptions.DuplicateNazwaSprawnosciException;
import api.szyszka.Services.SprawnoscService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static api.szyszka.Entities.TypSprawnosci.YELLOW;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class SprawnoscServiceIntegrationTest {

    @Autowired
    private SprawnoscService sprawnoscService;

    /* =========================
       HELPERY
       ========================= */

    private Sprawnosc createSprawnosc(String nazwa) {
        Sprawnosc s = new Sprawnosc();
        s.setNazwa(nazwa);
        s.setOpis("Opis " + nazwa);
        s.setOpisWymagan("Wymagania " + nazwa);
        s.setIkona("ikonka.png");
        s.setTyp(TypSprawnosci.YELLOW);
        return sprawnoscService.createSprawnosc(s);
    }

    /* =========================
       TESTY
       ========================= */

    @Test
    void shouldCreateSprawnosc() {
        Sprawnosc s = createSprawnosc("Sprawnosc_" + UUID.randomUUID());

        assertThat(s.getId()).isNotNull();
        assertThat(s.getNazwa()).isNotNull();
    }

    @Test
    void shouldReturnSprawnoscById() {
        Sprawnosc s = createSprawnosc("Sprawnosc_" + UUID.randomUUID());

        Sprawnosc found = sprawnoscService.getSprawnoscById(s.getId());

        assertThat(found.getId()).isEqualTo(s.getId());
    }

    @Test
    void shouldReturnAllSprawnosci() {
        createSprawnosc("A_" + UUID.randomUUID());
        createSprawnosc("B_" + UUID.randomUUID());

        List<Sprawnosc> all = sprawnoscService.getAllSprawnosc();

        assertThat(all.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldModifySprawnosc() {
        Sprawnosc s = createSprawnosc("StaraNazwa_" + UUID.randomUUID());

        Sprawnosc updated = new Sprawnosc();
        updated.setNazwa("NowaNazwa_" + UUID.randomUUID());
        updated.setOpis("Nowy opis");
        updated.setOpisWymagan("Nowe wymagania");
        updated.setIkona("nowa_ikona.png");
        updated.setTyp(YELLOW);

        Sprawnosc result =
                sprawnoscService.modifySprawnoscById(s.getId(), updated);

        assertThat(result.getNazwa()).isEqualTo(updated.getNazwa());
        assertThat(result.getOpis()).isEqualTo("Nowy opis");
        assertThat(result.getTyp()).isEqualTo(YELLOW);
    }

    @Test
    void shouldThrowExceptionWhenDuplicateNazwa() {
        // given – dwie różne sprawności
        Sprawnosc pierwsza = createSprawnosc("Pierwsza_" + UUID.randomUUID());
        Sprawnosc druga = createSprawnosc("Druga_" + UUID.randomUUID());

        // when – próbujemy zmienić nazwę drugiej na nazwę pierwszej
        Sprawnosc update = new Sprawnosc();
        update.setNazwa(pierwsza.getNazwa()); // DUPLIKAT
        update.setOpis("opis");
        update.setOpisWymagan("wymagania");
        update.setIkona("ikonka.png");
        update.setTyp(TypSprawnosci.YELLOW);

        // then
        assertThatThrownBy(() ->
                sprawnoscService.modifySprawnoscById(druga.getId(), update)
        ).isInstanceOf(DuplicateNazwaSprawnosciException.class);
    }

    @Test
    void shouldDeleteSprawnosc() {
        Sprawnosc s = createSprawnosc("DoUsuniecia_" + UUID.randomUUID());

        sprawnoscService.deleteSprawnosc(s.getId());

        List<Sprawnosc> all = sprawnoscService.getAllSprawnosc();
        assertThat(all).doesNotContain(s);
    }
}
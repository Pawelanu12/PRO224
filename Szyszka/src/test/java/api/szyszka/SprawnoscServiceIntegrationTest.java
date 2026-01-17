package api.szyszka;

import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Exceptions.DuplicateNazwaSprawnosciException;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Services.SprawnoscService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class SprawnoscServiceIntegrationTest {

    @Autowired
    private SprawnoscService sprawnoscService;

    @Autowired
    private SprawnoscRepository sprawnoscRepository;

    // =====================================================
    // ================= METODY POMOCNICZE =================
    // =====================================================

    private Sprawnosc createSprawnosc(String nazwa) {
        Sprawnosc s = new Sprawnosc();
        s.setNazwa(nazwa);
        s.setOpis("Opis " + nazwa);
        s.setOpisWymagan("Wymagania " + nazwa);
        s.setIkona("ikona.png");
        return sprawnoscRepository.save(s);
    }

    // =====================================================
    // ======================= TESTY =======================
    // =====================================================

    @Test
    void shouldCreateSprawnosc() {
        Sprawnosc s = new Sprawnosc();
        s.setNazwa("Pierwsza pomoc");
        s.setOpis("Opis");
        s.setOpisWymagan("Wymagania");
        s.setIkona("icon.png");

        Sprawnosc result = sprawnoscService.createSprawnosc(s);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getNazwa()).isEqualTo("Pierwsza pomoc");
    }

    @Test
    void shouldGetSprawnoscById() {
        Sprawnosc saved = createSprawnosc("Terenoznawstwo");

        Sprawnosc fetched =
                sprawnoscService.getSprawnoscById(saved.getId());

        assertThat(fetched.getId()).isEqualTo(saved.getId());
    }

    @Test
    void shouldReturnAllSprawnosci() {
        createSprawnosc("Ognisko");
        createSprawnosc("Pływanie");

        List<Sprawnosc> list =
                sprawnoscService.getAllSprawnosc();

        assertThat(list).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldDeleteSprawnosc() {
        Sprawnosc saved = createSprawnosc("Szyfry");

        sprawnoscService.deleteSprawnosc(saved.getId());

        assertThat(sprawnoscRepository.findById(saved.getId())).isEmpty();
    }

    @Test
    void shouldThrowWhenModifyingWithDifferentName() {
        Sprawnosc saved = createSprawnosc("Pierwotna");

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("Inna");

        assertThatThrownBy(() ->
                sprawnoscService.modifySprawnoscById(saved.getId(), update)
        ).isInstanceOf(DuplicateNazwaSprawnosciException.class);
    }

    @Test
    void shouldAllowModifyWhenNameIsTheSame() {
        Sprawnosc saved = createSprawnosc("Stała");

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("Stała");

        Sprawnosc result =
                sprawnoscService.modifySprawnoscById(saved.getId(), update);

        assertThat(result.getNazwa()).isEqualTo("Stała");
    }
}
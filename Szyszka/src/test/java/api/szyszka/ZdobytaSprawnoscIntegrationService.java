package api.szyszka;

import api.szyszka.DTOs.Sprawnosci.CreateZdobytaSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.ZdobytaSprawnosc;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.ZdobytaSprawnoscRepository;
import api.szyszka.Services.ZdobytaSprawnoscService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class ZdobytaSprawnoscIntegrationTest {

    @Autowired
    private ZdobytaSprawnoscService zdobytaSprawnoscService;

    @Autowired
    private ZdobytaSprawnoscRepository zdobytaSprawnoscRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private SprawnoscRepository sprawnoscRepository;

    // ========= HELPERY =========

    private ZdobytaSprawnosc createZdobytaSprawnosc(
            Uzytkownik user,
            Sprawnosc sprawnosc
    ) {
        ZdobytaSprawnosc zs = new ZdobytaSprawnosc();
        zs.setUzytkownik(user);
        zs.setSprawnosc(sprawnosc);
        zs.setDataZdobyciaSprawnosci(LocalDateTime.now());
        return zdobytaSprawnoscRepository.saveAndFlush(zs);
    }

    private Uzytkownik createUser() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("test_login");
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setEmail("jan@test.pl");
        u.setTypUzytkownika(TypUzytkownika.ZUCH);
        return uzytkownikRepository.saveAndFlush(u);
    }

    private Sprawnosc createSprawnosc() {
        Sprawnosc s = new Sprawnosc();
        s.setNazwa("Pierwsza pomoc");
        return sprawnoscRepository.saveAndFlush(s);
    }

    // ========= createZdobytaSprawnosc =========

    @Test
    void shouldCreateZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        CreateZdobytaSprawnoscRequest req = new CreateZdobytaSprawnoscRequest();
        req.setUzytkownikId(user.getId());
        req.setSprawnoscId(sprawnosc.getId());
        req.setDataZdobyciaSprawnosci(LocalDateTime.now());

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.createZdobytaSprawnosc(req);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getUzytkownik().getId()).isEqualTo(user.getId());
        assertThat(result.getSprawnosc().getId()).isEqualTo(sprawnosc.getId());
    }

    // ========= getAllZdobytaSprawnosc =========

    @Test
    void shouldReturnAllZdobyteSprawnosci() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zdobytaSprawnoscRepository.saveAndFlush(zs);

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnosc();

        assertThat(result).isNotEmpty();
    }

    // ========= getAllZdobytaSprawnoscByUzytkownikId =========

    @Test
    void shouldReturnZdobyteSprawnosciByUzytkownikId() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zdobytaSprawnoscRepository.saveAndFlush(zs);

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscByUzytkownikId(user.getId());

        assertThat(result).hasSize(1);
    }

    // ========= getAllZdobytaSprawnoscBySprawnoscId =========

    @Test
    void shouldReturnZdobyteSprawnosciBySprawnoscId() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zdobytaSprawnoscRepository.saveAndFlush(zs);

        List<ZdobytaSprawnosc> result =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscBySprawnoscId(sprawnosc.getId());

        assertThat(result).hasSize(1);
    }

    // ========= getZdobytaSprawnoscById =========

    @Test
    void shouldReturnZdobytaSprawnoscById() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zs = zdobytaSprawnoscRepository.saveAndFlush(zs);

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.getZdobytaSprawnoscById(zs.getId());

        assertThat(result.getId()).isEqualTo(zs.getId());
    }

    // ========= modifyZdobytaSprawnosc =========

    @Test
    void shouldModifyZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zs = zdobytaSprawnoscRepository.saveAndFlush(zs);

        ZdobytaSprawnosc update = new ZdobytaSprawnosc();
        update.setUzytkownik(user);
        update.setSprawnosc(sprawnosc);
        update.setDataZdobyciaSprawnosci(LocalDateTime.now());

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.modifyZdobytaSprawnosc(zs.getId(), update);

        assertThat(result.getDataZdobyciaSprawnosci()).isNotNull();
    }

    // ========= deleteZdobytaSprawnoscById =========

    @Test
    void shouldDeleteZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc();

        ZdobytaSprawnosc zs = createZdobytaSprawnosc(user, sprawnosc);

        zs = zdobytaSprawnoscRepository.saveAndFlush(zs);

        zdobytaSprawnoscService.deleteZdobytaSprawnoscById(zs.getId());

        assertThat(zdobytaSprawnoscRepository.findById(zs.getId()))
                .isEmpty();
    }
}
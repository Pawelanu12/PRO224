package api.szyszka;

import api.szyszka.DTOs.Sprawnosci.CreateZdobytaSprawnoscRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.ZdobytaSprawnoscRepository;
import api.szyszka.Services.ZdobytaSprawnoscService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static api.szyszka.Entities.TypUzytkownika.DRUZYNOWY;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ZdobytaSprawnoscServiceIntegrationTest {

    @Autowired
    private ZdobytaSprawnoscService zdobytaSprawnoscService;

    @Autowired
    private ZdobytaSprawnoscRepository zdobytaSprawnoscRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private SprawnoscRepository sprawnoscRepository;

    // ===================== helpers =====================

    private Uzytkownik createUser() {
        Uzytkownik u = new Uzytkownik();
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setLogin("user_" + UUID.randomUUID());
        u.setTypUzytkownika(DRUZYNOWY);
        return uzytkownikRepository.save(u);
    }

    private Sprawnosc createSprawnosc(String nazwa) {
        Sprawnosc s = new Sprawnosc();
        s.setNazwa(nazwa);
        s.setOpis("Opis");
        s.setOpisWymagan("Wymagania");
        s.setIkona("ikona.png");
        s.setTyp(TypSprawnosci.YELLOW);
        return sprawnoscRepository.save(s);
    }

    private CreateZdobytaSprawnoscRequest validRequest(
            Long userId,
            Long sprawnoscId
    ) {
        CreateZdobytaSprawnoscRequest req = new CreateZdobytaSprawnoscRequest();
        req.setUzytkownikId(userId);
        req.setSprawnoscId(sprawnoscId);
        req.setDataZdobyciaSprawnosci(LocalDateTime.now());
        return req;
    }

    // ===================== tests =====================

    @Test
    void shouldCreateZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc("Pierwsza pomoc");

        CreateZdobytaSprawnoscRequest req =
                validRequest(user.getId(), sprawnosc.getId());

        ZdobytaSprawnosc result =
                zdobytaSprawnoscService.createZdobytaSprawnosc(req);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getUzytkownik().getId()).isEqualTo(user.getId());
        assertThat(result.getSprawnosc().getId()).isEqualTo(sprawnosc.getId());
    }

    @Test
    void shouldReturnAllZdobyteSprawnosci() {
        Uzytkownik user = createUser();
        Sprawnosc s1 = createSprawnosc("A");
        Sprawnosc s2 = createSprawnosc("B");

        zdobytaSprawnoscService.createZdobytaSprawnosc(
                validRequest(user.getId(), s1.getId())
        );
        zdobytaSprawnoscService.createZdobytaSprawnosc(
                validRequest(user.getId(), s2.getId())
        );

        List<ZdobytaSprawnosc> list =
                zdobytaSprawnoscService.getAllZdobytaSprawnosc();

        assertThat(list).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldReturnZdobyteSprawnosciByUzytkownikId() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc("Survival");

        zdobytaSprawnoscService.createZdobytaSprawnosc(
                validRequest(user.getId(), sprawnosc.getId())
        );

        List<ZdobytaSprawnosc> list =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscByUzytkownikId(user.getId());

        assertThat(list).hasSize(1);
        assertThat(list.get(0).getUzytkownik().getId()).isEqualTo(user.getId());
    }

    @Test
    void shouldReturnZdobyteSprawnosciBySprawnoscId() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc("Topografia");

        zdobytaSprawnoscService.createZdobytaSprawnosc(
                validRequest(user.getId(), sprawnosc.getId())
        );

        List<ZdobytaSprawnosc> list =
                zdobytaSprawnoscService.getAllZdobytaSprawnoscBySprawnoscId(sprawnosc.getId());

        assertThat(list).hasSize(1);
        assertThat(list.get(0).getSprawnosc().getId()).isEqualTo(sprawnosc.getId());
    }

    @Test
    void shouldModifyZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc s1 = createSprawnosc("Stara");
        Sprawnosc s2 = createSprawnosc("Nowa");

        ZdobytaSprawnosc saved =
                zdobytaSprawnoscService.createZdobytaSprawnosc(
                        validRequest(user.getId(), s1.getId())
                );

        ZdobytaSprawnosc update = new ZdobytaSprawnosc();
        update.setDataZdobyciaSprawnosci(LocalDateTime.now().minusDays(5));
        update.setUzytkownik(user);
        update.setSprawnosc(s2);

        ZdobytaSprawnosc modified =
                zdobytaSprawnoscService.modifyZdobytaSprawnosc(saved.getId(), update);

        assertThat(modified.getSprawnosc().getId()).isEqualTo(s2.getId());
    }

    @Test
    void shouldDeleteZdobytaSprawnosc() {
        Uzytkownik user = createUser();
        Sprawnosc sprawnosc = createSprawnosc("Do usuniecia");

        ZdobytaSprawnosc saved =
                zdobytaSprawnoscService.createZdobytaSprawnosc(
                        validRequest(user.getId(), sprawnosc.getId())
                );

        zdobytaSprawnoscService.deleteZdobytaSprawnoscById(saved.getId());

        assertThat(
                zdobytaSprawnoscRepository.findById(saved.getId())
        ).isEmpty();
    }
}
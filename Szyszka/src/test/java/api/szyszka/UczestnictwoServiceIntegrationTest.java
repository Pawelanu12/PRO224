package api.szyszka;

import api.szyszka.DTOs.Event.CreateUczestnictwoRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.UczestnictwoRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.UczestnictwoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static api.szyszka.Entities.AuthProvider.LOCAL;
import static api.szyszka.Entities.TypUzytkownika.DRUZYNOWY;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class UczestnictwoServiceIntegrationTest {

    @Autowired
    private UczestnictwoService uczestnictwoService;

    @Autowired
    private UczestnictwoRepository uczestnictwoRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private WydarzenieRepository wydarzenieRepository;

    /* ========================= HELPERY ========================= */

    private Uzytkownik createUser() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("login_" + UUID.randomUUID());
        u.setHaslo("haslo");
        u.setEmail(UUID.randomUUID() + "@test.pl");
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setNrTelefonu("123456789");
        u.setAuthProvider(LOCAL);
        u.setTypUzytkownika(DRUZYNOWY);
        u.setDataUrodzenia(LocalDate.now().minusYears(20));
        u.setDataDolaczeniaDoGromady(LocalDateTime.now().minusYears(2));
        return uzytkownikRepository.save(u);
    }

    private Wydarzenie createEvent(Uzytkownik organizator) {
        Wydarzenie w = new Wydarzenie();
        w.setNazwa("Event testowy");
        w.setOpis("Opis");
        w.setTyp(TypWydarzenia.BIWAK);
        w.setDataWyjazdu(LocalDateTime.now().plusDays(5));
        w.setDataZakonczenia(LocalDateTime.now().plusDays(10));
        w.setOrganizator(organizator);
        return wydarzenieRepository.save(w);
    }

    private CreateUczestnictwoRequest createRequest(Long userId, Long eventId) {
        CreateUczestnictwoRequest req = new CreateUczestnictwoRequest();
        req.setUzytkownikId(userId);
        req.setWydarzenieId(eventId);
        return req;
    }

    /* ========================= TESTY ========================= */

    @Test
    void shouldCreateUczestnictwo() {
        Uzytkownik user = createUser();
        Wydarzenie event = createEvent(user);

        CreateUczestnictwoRequest request =
                createRequest(user.getId(), event.getId());

        Uczestnictwo uczestnictwo =
                uczestnictwoService.createUczestnictwo(request);

        assertThat(uczestnictwo.getId()).isNotNull();
        assertThat(uczestnictwo.getUzytkownik().getId()).isEqualTo(user.getId());
        assertThat(uczestnictwo.getWydarzenie().getId()).isEqualTo(event.getId());
    }

    @Test
    void shouldReturnUczestnictwoById() {
        Uzytkownik user = createUser();
        Wydarzenie event = createEvent(user);

        Uczestnictwo saved = uczestnictwoService.createUczestnictwo(
                createRequest(user.getId(), event.getId())
        );

        Uczestnictwo found =
                uczestnictwoService.getUczestnictwoById(saved.getId());

        assertThat(found.getId()).isEqualTo(saved.getId());
    }

    @Test
    void shouldReturnAllUczestnictwo() {
        Uzytkownik user = createUser();
        Wydarzenie event = createEvent(user);

        uczestnictwoService.createUczestnictwo(
                createRequest(user.getId(), event.getId())
        );

        List<Uczestnictwo> all =
                uczestnictwoService.getAllUczestnictwo();

        assertThat(all).isNotEmpty();
    }

    @Test
    void shouldDeleteUczestnictwo() {
        Uzytkownik user = createUser();
        Wydarzenie event = createEvent(user);

        Uczestnictwo uczestnictwo =
                uczestnictwoService.createUczestnictwo(
                        createRequest(user.getId(), event.getId())
                );

        uczestnictwoService.deleteUczestnictwoById(uczestnictwo.getId());

        assertThat(
                uczestnictwoRepository.findById(uczestnictwo.getId())
        ).isEmpty();
    }

    @Test
    void shouldCreateMultipleUczestnictwaForDifferentUsers() {
        Uzytkownik organizer = createUser();
        Wydarzenie event = createEvent(organizer);

        Uzytkownik user1 = createUser();
        Uzytkownik user2 = createUser();

        uczestnictwoService.createUczestnictwo(
                createRequest(user1.getId(), event.getId())
        );
        uczestnictwoService.createUczestnictwo(
                createRequest(user2.getId(), event.getId())
        );

        List<Uczestnictwo> all = uczestnictwoService.getAllUczestnictwo();
        assertThat(all.size()).isGreaterThanOrEqualTo(2);
    }
}
package api.szyszka;

import api.szyszka.DTOs.Event.CreateUczestnictwoRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.*;
import api.szyszka.Services.UczestnictwoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import static api.szyszka.Entities.TypUzytkownika.DRUZYNOWY;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

    // =====================================================
    // =============== METODY POMOCNICZE ===================
    // =====================================================

    private Uzytkownik createUser(String login) {
        Uzytkownik u = new Uzytkownik();
        u.setLogin(login);
        u.setImie("Jan");
        u.setNazwisko("Testowy");
        u.setTypUzytkownika(DRUZYNOWY);
        return uzytkownikRepository.save(u);
    }

    private Wydarzenie createEvent(Uzytkownik organizator) {
        Wydarzenie w = new Wydarzenie();
        w.setNazwa("Testowe wydarzenie");
        w.setOrganizator(organizator);
        w.setDataWyjazdu(LocalDateTime.now().plusDays(1));
        w.setDataZakonczenia(LocalDateTime.now().plusDays(2));
        return wydarzenieRepository.save(w);
    }

    // =====================================================
    // ===================== TESTY =========================
    // =====================================================

    @Test
    void shouldCreateUczestnictwo() {
        Uzytkownik user = createUser("user1");
        Wydarzenie wydarzenie = createEvent(user);

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(user.getId());
        request.setWydarzenieId(wydarzenie.getId());

        Uczestnictwo result = uczestnictwoService.createUczestnictwo(request);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getUzytkownik().getId()).isEqualTo(user.getId());
        assertThat(result.getWydarzenie().getId()).isEqualTo(wydarzenie.getId());
    }

    @Test
    void shouldThrowWhenUserDoesNotExist() {
        Uzytkownik org = createUser("org");
        Wydarzenie wydarzenie = createEvent(org);

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(999L);
        request.setWydarzenieId(wydarzenie.getId());

        assertThatThrownBy(() ->
                uczestnictwoService.createUczestnictwo(request)
        ).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void shouldThrowWhenEventDoesNotExist() {
        Uzytkownik user = createUser("user2");

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(user.getId());
        request.setWydarzenieId(999L);

        assertThatThrownBy(() ->
                uczestnictwoService.createUczestnictwo(request)
        ).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void shouldGetUczestnictwoById() {
        Uzytkownik user = createUser("user3");
        Wydarzenie wydarzenie = createEvent(user);

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(user.getId());
        request.setWydarzenieId(wydarzenie.getId());

        Uczestnictwo saved = uczestnictwoService.createUczestnictwo(request);

        Uczestnictwo fetched =
                uczestnictwoService.getUczestnictwoById(saved.getId());

        assertThat(fetched.getId()).isEqualTo(saved.getId());
    }

    @Test
    void shouldReturnAllUczestnictwa() {
        Uzytkownik user = createUser("user4");
        Wydarzenie wydarzenie = createEvent(user);

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(user.getId());
        request.setWydarzenieId(wydarzenie.getId());

        uczestnictwoService.createUczestnictwo(request);

        List<Uczestnictwo> list = uczestnictwoService.getAllUczestnictwo();

        assertThat(list).isNotEmpty();
    }

    @Test
    void shouldDeleteUczestnictwo() {
        Uzytkownik user = createUser("user5");
        Wydarzenie wydarzenie = createEvent(user);

        CreateUczestnictwoRequest request = new CreateUczestnictwoRequest();
        request.setUzytkownikId(user.getId());
        request.setWydarzenieId(wydarzenie.getId());

        Uczestnictwo saved = uczestnictwoService.createUczestnictwo(request);

        uczestnictwoService.deleteUczestnictwoById(saved.getId());

        assertThat(uczestnictwoRepository.findById(saved.getId())).isEmpty();
    }
}
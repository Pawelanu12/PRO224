package api.szyszka;

import api.szyszka.DTOs.Event.UpdateWydarzenieRequest;
import api.szyszka.Entities.TypWydarzenia;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.WydarzenieService;
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
class WydarzenieServiceIntegrationTest {

    @Autowired
    private WydarzenieService wydarzenieService;

    @Autowired
    private WydarzenieRepository wydarzenieRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

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

    private Wydarzenie createPersistedWydarzenie(Uzytkownik user, String nazwa) {
        Wydarzenie w = new Wydarzenie();
        w.setNazwa(nazwa);
        w.setOpis("Opis");
        w.setDataWyjazdu(LocalDateTime.now().plusDays(5));
        w.setDataZakonczenia(LocalDateTime.now().plusDays(10));
        w.setTyp(TypWydarzenia.BIWAK); // 🔴 KLUCZOWE
        w.setOrganizator(user);
        return wydarzenieRepository.save(w);
    }

    /* ========================= TESTY (8) ========================= */

    @Test
    void shouldReturnWydarzenieById() {
        Uzytkownik user = createUser();
        Wydarzenie w = createPersistedWydarzenie(user, "Event 1");

        Wydarzenie found = wydarzenieService.getWydarzenieById(w.getId());

        assertThat(found.getId()).isEqualTo(w.getId());
    }

    @Test
    void shouldReturnAllWydarzenia() {
        Uzytkownik user = createUser();
        createPersistedWydarzenie(user, "Event 1");
        createPersistedWydarzenie(user, "Event 2");

        List<Wydarzenie> all = wydarzenieService.getAllWydarzenia();

        assertThat(all.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldReturnWydarzenieByNazwa() {
        Uzytkownik user = createUser();
        createPersistedWydarzenie(user, "Unikalna nazwa");

        Wydarzenie found =
                wydarzenieService.getWydarzenieByNazwa("Unikalna nazwa");

        assertThat(found).isNotNull();
        assertThat(found.getNazwa()).isEqualTo("Unikalna nazwa");
    }

    @Test
    void shouldModifyWydarzenie() {
        Uzytkownik user = createUser();
        Wydarzenie w = createPersistedWydarzenie(user, "Stara nazwa");

        UpdateWydarzenieRequest update = new UpdateWydarzenieRequest(
                "Nowa nazwa",
                LocalDateTime.now().plusDays(6),
                LocalDateTime.now().plusDays(12),
                "Nowy opis",
                TypWydarzenia.OBOZ,
                null,
                null
        );

        Wydarzenie updated =
                wydarzenieService.modifyWydarzenie(w.getId(), update);

        assertThat(updated.getNazwa()).isEqualTo("Nowa nazwa");
        assertThat(updated.getTyp()).isEqualTo(TypWydarzenia.OBOZ);
    }

    @Test
    void shouldModifyOnlyOpis() {
        Uzytkownik user = createUser();
        Wydarzenie w = createPersistedWydarzenie(user, "Event");

        UpdateWydarzenieRequest update = new UpdateWydarzenieRequest(
                w.getNazwa(),
                w.getDataWyjazdu(),
                w.getDataZakonczenia(),
                "Zmieniony opis",
                w.getTyp(),
                null,
                null
        );

        Wydarzenie updated =
                wydarzenieService.modifyWydarzenie(w.getId(), update);

        assertThat(updated.getOpis()).isEqualTo("Zmieniony opis");
    }

    @Test
    void shouldDeleteWydarzenie() {
        Uzytkownik user = createUser();
        Wydarzenie w = createPersistedWydarzenie(user, "Do usunięcia");

        wydarzenieService.deleteWydarzenie(w.getId());

        assertThat(wydarzenieRepository.findById(w.getId())).isEmpty();
    }

    @Test
    void shouldCreateMultipleWydarzeniaForOneUser() {
        Uzytkownik user = createUser();
        createPersistedWydarzenie(user, "E1");
        createPersistedWydarzenie(user, "E2");

        List<Wydarzenie> all = wydarzenieService.getAllWydarzenia();
        assertThat(all.size()).isGreaterThanOrEqualTo(2);
    }
}
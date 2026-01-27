package api.szyszka;

import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.UzytkownikService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class UzytkownikIntegrationTest {

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private UzytkownikService uzytkownikService;

    private Uzytkownik createValidUser(String login) {
        Uzytkownik user = new Uzytkownik();
        user.setLogin(login);
        user.setHaslo("password");
        user.setImie("Jan");
        user.setNazwisko("Kowalski");
        user.setEmail(login + "@test.pl");
        user.setTypUzytkownika(TypUzytkownika.DEFAULT);
        return user;
    }

    @Test
    void shouldSaveUserInDatabase() {

        Uzytkownik user = createValidUser("integration_user");

        Uzytkownik saved = uzytkownikRepository.save(user);

        assertThat(saved.getId()).isNotNull();
    }

    @Test
    void shouldFindUserByLogin() {
        Uzytkownik user = createValidUser("find_me");

        uzytkownikRepository.saveAndFlush(user);

        Uzytkownik found = uzytkownikRepository
                .findByLogin("find_me")
                .orElseThrow();

        assertThat(found.getLogin()).isEqualTo("find_me");
    }

    @Test
    void shouldChangeUserType() {

        Uzytkownik user = createValidUser("integration_user");

        Uzytkownik saved = uzytkownikRepository.save(user);

        saved.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);
        uzytkownikRepository.save(saved);

        Uzytkownik updated = uzytkownikRepository
                .findById(saved.getId())
                .orElseThrow();

        assertThat(updated.getTypUzytkownika())
                .isEqualTo(TypUzytkownika.DRUZYNOWY);
    }

    @Test
    void shouldReturnEmptyWhenUserDoesNotExist() {
        assertThat(
                uzytkownikRepository.findByLogin("not_existing_user")
        ).isEmpty();
    }
}
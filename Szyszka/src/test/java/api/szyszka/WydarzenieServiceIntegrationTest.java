package api.szyszka;

import api.szyszka.DTOs.Event.CreateWydarzenieRequest;
import api.szyszka.DTOs.Event.UpdateWydarzenieRequest;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Services.WydarzenieService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import static api.szyszka.Entities.TypUzytkownika.DRUZYNOWY;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
//@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class WydarzenieServiceIntegrationTest {

    @Autowired
    private WydarzenieService wydarzenieService;

    @Autowired
    private WydarzenieRepository wydarzenieRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    private static final Path UPLOAD_DIR = Path.of("uploads/wydarzenia");

    private Uzytkownik createValidUser(String login) {
        Uzytkownik u = new Uzytkownik();
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setLogin(login);
        u.setTypUzytkownika(DRUZYNOWY);
        return uzytkownikRepository.save(u);
    }

    private CreateWydarzenieRequest validEventRequest(Uzytkownik org, String nazwa) {
        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
        req.setNazwa(nazwa);
        req.setOrganizatorId(org.getId());
        req.setDataWyjazdu(LocalDateTime.now().plusDays(1));
        req.setDataZakonczenia(LocalDateTime.now().plusDays(2));
        return req;
    }

    @AfterEach
    void cleanUploads() throws Exception {
        if (Files.exists(UPLOAD_DIR)) {
            Files.walk(UPLOAD_DIR)
                    .filter(Files::isRegularFile)
                    .forEach(p -> {
                        try {
                            Files.deleteIfExists(p);
                        } catch (Exception ignored) {}
                    });
        }
    }

    // ================= createWydarzenieWithPhotos =================

    @Test
    void shouldCreateEventWithoutPhotos() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org");
//        org = uzytkownikRepository.save(org);

        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Biwak");
//        req.setOrganizatorId(org.getId());
        CreateWydarzenieRequest req = validEventRequest(org, "Biwak");

        Wydarzenie result =
                wydarzenieService.createWydarzenieWithPhotos(req, null);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getZdjecia()).isEmpty();
    }

    @Test
    void shouldCreateEventWithPhotoAndSaveFile() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org2");
//        org = uzytkownikRepository.save(org);
        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Rajd");
//        req.setOrganizatorId(org.getId());

        CreateWydarzenieRequest req = validEventRequest(org, "Biwak");

        MockMultipartFile file = new MockMultipartFile(
                "file", "test.jpg", "image/jpeg", "img".getBytes()
        );

        Wydarzenie result =
                wydarzenieService.createWydarzenieWithPhotos(req, List.of(file));

        assertThat(result.getZdjecia()).hasSize(1);
        assertThat(Files.exists(
                UPLOAD_DIR.resolve(result.getZdjecia().get(0).getSciezka())
        )).isTrue();
    }

    @Test
    void shouldThrowWhenCreatingEventWithMissingOrganizator() {
        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
        req.setNazwa("X");
        req.setOrganizatorId(999L);

        assertThatThrownBy(() ->
                wydarzenieService.createWydarzenieWithPhotos(req, null)
        ).isInstanceOf(NoSuchElementException.class);
    }

    // ================= modifyWydarzenie =================

    @Test
    @Transactional
    void shouldModifyEventFields() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org3");
//        org = uzytkownikRepository.save(org);

        Uzytkownik org = createValidUser("org"  + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Stare");
//        req.setOrganizatorId(org.getId());
        CreateWydarzenieRequest req = validEventRequest(org, "Biwak");

        Wydarzenie wydarzenie =
                wydarzenieService.createWydarzenieWithPhotos(req, null);

        UpdateWydarzenieRequest update = new UpdateWydarzenieRequest(
                "Nowe",
                null,
                null,
                "Opis",
                null,
                null
        );

        Wydarzenie result =
                wydarzenieService.modifyWydarzenie(wydarzenie.getId(), update);

        assertThat(result.getNazwa()).isEqualTo("Nowe");
        assertThat(result.getOpis()).isEqualTo("Opis");
    }

    @Test
    @Transactional
    void shouldAddAndRemovePhotosDuringModify() throws Exception {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org4");
//        org = uzytkownikRepository.save(org);
        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Test");
//        req.setOrganizatorId(org.getId());
        CreateWydarzenieRequest req = validEventRequest(org, "Biwak");

        MockMultipartFile file1 = new MockMultipartFile(
                "file", "a.jpg", "image/jpeg", "a".getBytes()
        );

        Wydarzenie wydarzenie =
                wydarzenieService.createWydarzenieWithPhotos(req, List.of(file1));

        String oldPath = wydarzenie.getZdjecia().get(0).getSciezka();

        MockMultipartFile file2 = new MockMultipartFile(
                "file", "b.jpg", "image/jpeg", "b".getBytes()
        );

        UpdateWydarzenieRequest update = new UpdateWydarzenieRequest(
                "Test",
                null,
                null,
                null,
                List.of(file2),
                List.of(oldPath)
        );

        Wydarzenie result =
                wydarzenieService.modifyWydarzenie(wydarzenie.getId(), update);

        assertThat(result.getZdjecia()).hasSize(1);
        assertThat(Files.exists(UPLOAD_DIR.resolve(oldPath))).isFalse();
    }

    // ================= addZdjecieToEvent =================

    @Test
    @Transactional
    void shouldAddPhotoToExistingEvent() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org5");
//        org = uzytkownikRepository.save(org);
        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Dodawanie");
//        req.setOrganizatorId(org.getId());

        CreateWydarzenieRequest req = validEventRequest(org, "Rocznica");

        Wydarzenie wydarzenie =
                wydarzenieService.createWydarzenieWithPhotos(req, null);

        MockMultipartFile file = new MockMultipartFile(
                "file", "x.jpg", "image/jpeg", "x".getBytes()
        );

        Wydarzenie result =
                wydarzenieService.addZdjecieToEvent(wydarzenie.getId(), file);

        assertThat(result.getZdjecia()).hasSize(1);
    }

    // ================= deleteWydarzenie =================

    @Test
    @Transactional
    void shouldDeleteEventFromDatabase() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org6");
//        org = uzytkownikRepository.save(org);
        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Delete");
//        req.setOrganizatorId(org.getId());

        CreateWydarzenieRequest req = validEventRequest(org, "Biwak");

        Wydarzenie wydarzenie =
                wydarzenieService.createWydarzenieWithPhotos(req, null);

        Long id = wydarzenie.getId();

        wydarzenieService.deleteWydarzenie(id);

        assertThat(wydarzenieRepository.findById(id)).isEmpty();
    }

    // ================= getWydarzenieByNazwa =================

    @Test
    @Transactional
    void shouldFindEventByName() {
//        Uzytkownik org = new Uzytkownik();
//        org.setLogin("org7");
//        org = uzytkownikRepository.save(org);
        Uzytkownik org = createValidUser("org" + UUID.randomUUID());

//        CreateWydarzenieRequest req = new CreateWydarzenieRequest();
//        req.setNazwa("Unikalna");
//        req.setOrganizatorId(org.getId());

        CreateWydarzenieRequest req = validEventRequest(org, "Drewno");

        wydarzenieService.createWydarzenieWithPhotos(req, null);

        Wydarzenie result =
                wydarzenieService.getWydarzenieByNazwa("Drewno");

        assertThat(result).isNotNull();
    }
}
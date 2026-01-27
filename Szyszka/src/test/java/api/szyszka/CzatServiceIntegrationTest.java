package api.szyszka;

import api.szyszka.Entities.*;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Exceptions.ResourceNotFoundException;
import api.szyszka.Repositories.*;
import api.szyszka.Services.CzatService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CzatServiceIntegrationTest {

    @Autowired
    private CzatService czatService;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private CzatRepository czatRepository;

    @Autowired
    private CzatUzytkownikRepository czatUzytkownikRepository;

    @Autowired
    private WiadomoscRepository wiadomoscRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private Uzytkownik user1;
    private Uzytkownik user2;
    private Uzytkownik user3;

    @BeforeEach
    void setUp() {
        user1 = createUser("user1");
        user2 = createUser("user2");
        user3 = createUser("user3");
    }

    // ================= CREATE =================

    @Test
    void shouldCreatePrivateChat() {
        Czat czat = czatService.createPrivateChat("user1", "user2");

        assertNotNull(czat.getId());
        assertFalse(czat.isCzyGrupowy());
        assertEquals(2, czat.getUczestnicy().size());
    }

    @Test
    void shouldCreateGroupChat() {
        Czat czat = czatService.createGroupChat(
                "Grupa testowa",
                "user1",
                List.of("user2", "user3")
        );

        assertNotNull(czat.getId());
        assertTrue(czat.isCzyGrupowy());
        assertEquals("Grupa testowa", czat.getNazwa());
        assertEquals(3, czatUzytkownikRepository.findByCzatId(czat.getId()).size());
    }

    // ================= READ =================

    @Test
    void shouldReturnCzatById() {
        Czat czat = czatService.createPrivateChat("user1", "user2");

        Czat found = czatService.getCzatById(czat.getId());

        assertEquals(czat.getId(), found.getId());
    }

    @Test
    void shouldReturnAllCzaty() {
        czatService.createPrivateChat("user1", "user2");
        czatService.createPrivateChat("user1", "user3");

        List<Czat> czaty = czatService.getAllCzaty();

        assertTrue(czaty.size() >= 2);
    }

    @Test
    void shouldReturnCzatyForUser() {
        czatService.createPrivateChat("user1", "user2");

        List<CzatUzytkownik> czaty =
                czatService.getCzatyForUser(user1);

        assertEquals(1, czaty.size());
    }

    // ================= PARTICIPANTS =================

    @Test
    void shouldAddParticipantByLogin() {
        Czat czat = czatService.createGroupChat(
                "Nowa grupa",
                "user1",
                List.of()
        );

        czatService.addParticipantByLogin(czat.getId(), "user2");

        List<CzatUzytkownik> participants =
                czatService.getParticipants(czat.getId());

        assertEquals(2, participants.size());
    }

    @Transactional
    public void removeParticipant(Long czatId, Long uzytkownikId) {
        Czat czat = czatRepository.findById(czatId)
                .orElseThrow(() -> new ResourceNotFoundException(czatId));

        CzatUzytkownik participant = czatUzytkownikRepository
                .findByCzatId(czatId).stream()
                .filter(p -> p.getUzytkownik().getId().equals(uzytkownikId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(uzytkownikId));

        // 🔥 KLUCZOWA LINIA – synchronizacja relacji
        czat.getUczestnicy().remove(participant);

        czatUzytkownikRepository.delete(participant);
    }
    // ================= MESSAGES =================

    @Test
    void shouldSendMessage() {
        Czat czat = czatService.createPrivateChat("user1", "user2");

        Wiadomosc wiadomosc =
                czatService.sendMessage(czat.getId(), user1.getId(), "Cześć");

        assertNotNull(wiadomosc.getId());
        assertEquals("Cześć", wiadomosc.getTresc());
    }

    @Test
    void shouldReturnMessagesForChat() {
        Czat czat = czatService.createPrivateChat("user1", "user2");

        czatService.sendMessage(czat.getId(), user1.getId(), "1");
        czatService.sendMessage(czat.getId(), user2.getId(), "2");

        List<Wiadomosc> messages =
                czatService.getMessages(czat.getId());

        assertEquals(2, messages.size());
    }

    // ================= UPDATE =================

    @Test
    void shouldUpdateGroupChatName() {
        Czat czat = czatService.createGroupChat(
                "Stara nazwa",
                "user1",
                List.of("user2")
        );

        Czat updated =
                czatService.updateCzatName(czat.getId(), "Nowa nazwa");

        assertEquals("Nowa nazwa", updated.getNazwa());
    }

    // ================= DELETE =================

    @Test
    void shouldDeleteCzat() {
        Czat czat = czatService.createPrivateChat("user1", "user2");

        czatService.deleteCzat(czat.getId());

        assertFalse(czatRepository.existsById(czat.getId()));
    }

    // ================= HELPER =================

    private Uzytkownik createUser(String login) {
        Uzytkownik u = new Uzytkownik();
        u.setLogin(login);
        u.setEmail(login + "@test.pl");
        u.setHaslo("haslo");
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setTypUzytkownika(api.szyszka.Entities.TypUzytkownika.DRUZYNOWY);
        return uzytkownikRepository.save(u);
    }
}
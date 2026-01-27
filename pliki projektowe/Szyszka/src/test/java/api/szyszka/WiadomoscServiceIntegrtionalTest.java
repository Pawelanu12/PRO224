package api.szyszka;

import api.szyszka.DTOs.Chat.CreateWiadomoscRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.*;
import api.szyszka.Services.WiadomoscService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class WiadomoscServiceIntegrationTest {

    @Autowired
    private WiadomoscService wiadomoscService;

    @Autowired
    private WiadomoscRepository wiadomoscRepository;

    @Autowired
    private CzatRepository czatRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    @Autowired
    private CzatUzytkownikRepository czatUzytkownikRepository;

    // =====================================================
    // =============== METODY POMOCNICZE ===================
    // =====================================================

    private Uzytkownik createUser(String login) {
        Uzytkownik u = new Uzytkownik();
        u.setLogin(login);
        u.setImie("Jan");
        u.setNazwisko("Testowy");
        u.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);
        return uzytkownikRepository.save(u);
    }

    private Czat createChat() {
        Czat czat = new Czat();
        czat.setNazwa("Testowy czat");
        czat.setCzyGrupowy(true);
        return czatRepository.save(czat);
    }

    private void addUserToChat(Czat czat, Uzytkownik user) {
        CzatUzytkownik cu = new CzatUzytkownik();
        cu.setCzat(czat);
        cu.setUzytkownik(user);
        cu.setNieprzeczytaneWiadomosci(0);
        czatUzytkownikRepository.save(cu);
    }

    // =====================================================
    // ===================== TESTY =========================
    // =====================================================

    @Test
    void shouldCreateMessageAndPersistIt() {
        Uzytkownik user = createUser("user1");
        Czat czat = createChat();
        addUserToChat(czat, user);

        CreateWiadomoscRequest request = new CreateWiadomoscRequest();
        request.setCzatId(czat.getId());
        request.setUzytkownikId(user.getId());
        request.setTresc("Hello!");

        Wiadomosc result = wiadomoscService.createWiadomosc(request);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getTresc()).isEqualTo("Hello!");
        assertThat(result.getCzat().getId()).isEqualTo(czat.getId());
        assertThat(result.getNadawca().getId()).isEqualTo(user.getId());
    }

    @Test
    void shouldIncrementUnreadMessagesForOtherUsers() {
        Uzytkownik sender = createUser("sender");
        Uzytkownik receiver = createUser("receiver");
        Czat czat = createChat();

        addUserToChat(czat, sender);
        addUserToChat(czat, receiver);

        CreateWiadomoscRequest request = new CreateWiadomoscRequest();
        request.setCzatId(czat.getId());
        request.setUzytkownikId(sender.getId());
        request.setTresc("Hej!");

        wiadomoscService.createWiadomosc(request);

        List<CzatUzytkownik> participants =
                czatUzytkownikRepository.findAllByCzatId(czat.getId());

        CzatUzytkownik receiverCU = participants.stream()
                .filter(cu -> cu.getUzytkownik().getId().equals(receiver.getId()))
                .findFirst()
                .orElseThrow();

        assertThat(receiverCU.getNieprzeczytaneWiadomosci()).isEqualTo(1);
    }

    @Test
    void shouldModifyMessageContent() {
        Uzytkownik user = createUser("user2");
        Czat czat = createChat();
        addUserToChat(czat, user);

        CreateWiadomoscRequest request = new CreateWiadomoscRequest();
        request.setCzatId(czat.getId());
        request.setUzytkownikId(user.getId());
        request.setTresc("Old message");

        Wiadomosc msg = wiadomoscService.createWiadomosc(request);

        Wiadomosc updated =
                wiadomoscService.modifyWiadomosc(msg.getId(), "New message");

        assertThat(updated.getTresc()).isEqualTo("New message");
    }

    @Test
    void shouldDeleteMessageFromDatabase() {
        Uzytkownik user = createUser("user3");
        Czat czat = createChat();
        addUserToChat(czat, user);

        CreateWiadomoscRequest request = new CreateWiadomoscRequest();
        request.setCzatId(czat.getId());
        request.setUzytkownikId(user.getId());
        request.setTresc("To be deleted");

        Wiadomosc msg = wiadomoscService.createWiadomosc(request);

        wiadomoscService.deleteWiadomoscById(msg.getId());

        assertThat(wiadomoscRepository.findById(msg.getId())).isEmpty();
    }
}
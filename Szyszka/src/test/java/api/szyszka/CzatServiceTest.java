package api.szyszka;

import api.szyszka.Entities.*;
import api.szyszka.Exceptions.LoginNotFoundException;
import api.szyszka.Exceptions.ResourceNotFoundException;
import api.szyszka.Repositories.*;
import api.szyszka.Services.CzatService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CzatServiceTest {

    @Mock
    private CzatRepository czatRepository;
    @Mock
    private CzatUzytkownikRepository czatUzytkownikRepository;
    @Mock
    private WiadomoscRepository wiadomoscRepository;
    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @InjectMocks
    private CzatService czatService;

    // ================= createPrivateChat =================

    @Test
    void shouldCreatePrivateChat() {
        Uzytkownik u1 = new Uzytkownik();
        u1.setId(1L);
        Uzytkownik u2 = new Uzytkownik();
        u2.setId(2L);

        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.of(u1));
        when(uzytkownikRepository.findById(2L)).thenReturn(Optional.of(u2));
        when(czatRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(czatUzytkownikRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Czat result = czatService.createPrivateChat(1L, 2L);

        assertThat(result).isNotNull();
        assertThat(result.isCzyGrupowy()).isFalse();
    }

    @Test
    void shouldReturnNullWhenUserNotFoundInPrivateChat() {
        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.empty());

        Czat result = czatService.createPrivateChat(1L, 2L);

        assertThat(result).isNull();
    }

    // ================= createGroupChat =================

    @Test
    void shouldCreateGroupChat() {
        Uzytkownik creator = new Uzytkownik();
        creator.setId(1L);

        Uzytkownik member = new Uzytkownik();
        member.setId(2L);

        when(czatRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(uzytkownikRepository.findById(2L)).thenReturn(Optional.of(member));
        when(czatUzytkownikRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Czat result = czatService.createGroupChat(
                "Grupa",
                creator,
                List.of(2L)
        );

        assertThat(result.isCzyGrupowy()).isTrue();
        assertThat(result.getNazwa()).isEqualTo("Grupa");
    }

    // ================= getCzatById =================

    @Test
    void shouldReturnCzatById() {
        Czat czat = new Czat();
        czat.setId(1L);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));

        Czat result = czatService.getCzatById(1L);

        assertThat(result).isEqualTo(czat);
    }

    @Test
    void shouldThrowWhenCzatNotFound() {
        when(czatRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> czatService.getCzatById(1L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ================= deleteCzat =================

    @Test
    void shouldDeleteCzat() {
        when(czatRepository.existsById(1L)).thenReturn(true);

        czatService.deleteCzat(1L);

        verify(czatRepository).deleteById(1L);
    }

    @Test
    void shouldThrowWhenDeletingNonExistingCzat() {
        when(czatRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> czatService.deleteCzat(1L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ================= sendMessage =================

    @Test
    void shouldSendMessageAndIncrementUnread() {
        Czat czat = new Czat();
        czat.setId(1L);

        Uzytkownik sender = new Uzytkownik();
        sender.setId(1L);

        CzatUzytkownik receiver = new CzatUzytkownik();
        Uzytkownik other = new Uzytkownik();
        other.setId(2L);
        receiver.setUzytkownik(other);
        receiver.setNieprzeczytaneWiadomosci(0);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.of(sender));
        when(wiadomoscRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of(receiver));

        Wiadomosc result = czatService.sendMessage(1L, 1L, "hej");

        assertThat(result.getTresc()).isEqualTo("hej");
        assertThat(receiver.getNieprzeczytaneWiadomosci()).isEqualTo(1);
    }

    // ================= updateCzatName =================

    @Test
    void shouldUpdateGroupChatName() {
        Czat czat = new Czat();
        czat.setCzyGrupowy(true);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(czatRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Czat result = czatService.updateCzatName(1L, "Nowa");

        assertThat(result.getNazwa()).isEqualTo("Nowa");
    }

    @Test
    void shouldThrowWhenUpdatingPrivateChatName() {
        Czat czat = new Czat();
        czat.setCzyGrupowy(false);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));

        assertThatThrownBy(() -> czatService.updateCzatName(1L, "Nowa"))
                .isInstanceOf(IllegalStateException.class);
    }

    // ================= addParticipantByLogin =================

    @Test
    void shouldAddParticipantByLogin() {
        Czat czat = new Czat();
        czat.setUczestnicy(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();
        user.setLogin("test");

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findByLogin("test"))
                .thenReturn(Optional.of(user));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of());
        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        CzatUzytkownik result =
                czatService.addParticipantByLogin(1L, "test");

        assertThat(result.getUzytkownik()).isEqualTo(user);
    }

    @Test
    void shouldThrowWhenLoginNotFound() {
        when(czatRepository.findById(1L)).thenReturn(Optional.of(new Czat()));
        when(uzytkownikRepository.findByLogin("x"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                czatService.addParticipantByLogin(1L, "x"))
                .isInstanceOf(LoginNotFoundException.class);
    }


    // ========= addParticipantById =========
//    @Test
//    void shouldAddParticipantById() {
//        Czat czat = new Czat();
//        czat.setUczestnicy(new java.util.ArrayList<>());
//
//        Uzytkownik user = new Uzytkownik();
//        user.setId(2L);
//
//        when(czatRepository.findById(1L))
//                .thenReturn(Optional.of(czat));
//        when(uzytkownikRepository.findById(2L))
//                .thenReturn(Optional.of(user));
//        when(czatUzytkownikRepository.findByCzatId(1L))
//                .thenReturn(List.of());
//        when(czatUzytkownikRepository.save(any()))
//                .thenAnswer(inv -> inv.getArgument(0));
//
//        CzatUzytkownik result =
//                czatService.addParticipantById(1L, 2L);
//
//        assertThat(result.getUzytkownik()).isEqualTo(user);
//    }
}
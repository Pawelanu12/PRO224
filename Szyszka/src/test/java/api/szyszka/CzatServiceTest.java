package api.szyszka;

import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Exceptions.LoginNotFoundException;
import api.szyszka.Exceptions.ResourceNotFoundException;
import api.szyszka.Repositories.CzatRepository;
import api.szyszka.Repositories.CzatUzytkownikRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WiadomoscRepository;
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
    private CzatService service;

    /* ================= createPrivateChat ================= */

    @Test
    void shouldCreatePrivateChat() {
        Uzytkownik u1 = new Uzytkownik();
        u1.setId(1L);
        Uzytkownik u2 = new Uzytkownik();
        u2.setId(2L);

        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.of(u1));
        when(uzytkownikRepository.findById(2L)).thenReturn(Optional.of(u2));
        when(czatRepository.save(any(Czat.class))).thenAnswer(i -> i.getArgument(0));
        when(czatUzytkownikRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Czat czat = service.createPrivateChat(1L, 2L);

        assertThat(czat).isNotNull();
        assertThat(czat.isCzyGrupowy()).isFalse();
        assertThat(czat.getUczestnicy()).hasSize(2);
    }

    @Test
    void shouldReturnNullWhenUserNotFoundInPrivateChat() {
        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.empty());

        Czat czat = service.createPrivateChat(1L, 2L);

        assertThat(czat).isNull();
    }

    /* ================= createGroupChat ================= */

    @Test
    void shouldCreateGroupChat() {
        Uzytkownik creator = new Uzytkownik();
        creator.setId(1L);

        Uzytkownik member = new Uzytkownik();
        member.setId(2L);

        when(czatRepository.save(any(Czat.class))).thenAnswer(i -> i.getArgument(0));
        when(uzytkownikRepository.findById(2L)).thenReturn(Optional.of(member));
        when(czatUzytkownikRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Czat czat = service.createGroupChat(
                "Grupa",
                creator,
                List.of(2L)
        );

        assertThat(czat.isCzyGrupowy()).isTrue();
    }

    /* ================= getCzatyForUser ================= */

    @Test
    void shouldReturnChatsForUser() {
        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        CzatUzytkownik cu = new CzatUzytkownik();
        cu.setUzytkownik(user);

        when(czatUzytkownikRepository.findAll()).thenReturn(List.of(cu));

        List<CzatUzytkownik> result = service.getCzatyForUser(user);

        assertThat(result).hasSize(1);
    }

    /* ================= getCzatById ================= */

    @Test
    void shouldReturnCzatById() {
        Czat czat = new Czat();
        czat.setId(1L);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));

        assertThat(service.getCzatById(1L)).isEqualTo(czat);
    }

    @Test
    void shouldThrowWhenCzatNotFound() {
        when(czatRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getCzatById(1L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    /* ================= deleteCzat ================= */

    @Test
    void shouldDeleteCzat() {
        when(czatRepository.existsById(1L)).thenReturn(true);

        service.deleteCzat(1L);

        verify(czatRepository).deleteById(1L);
    }

    @Test
    void shouldThrowWhenDeletingNonExistingCzat() {
        when(czatRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> service.deleteCzat(1L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    /* ================= removeParticipant ================= */

    @Test
    void shouldRemoveParticipant() {
        CzatUzytkownik cu = new CzatUzytkownik();
        Uzytkownik u = new Uzytkownik();
        u.setId(1L);
        cu.setUzytkownik(u);

        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of(cu));

        service.removeParticipant(1L, 1L);

        verify(czatUzytkownikRepository).delete(cu);
    }

    /* ================= sendMessage ================= */

    @Test
    void shouldSendMessage() {
        Czat czat = new Czat();
        czat.setId(1L);

        Uzytkownik sender = new Uzytkownik();
        sender.setId(1L);

        CzatUzytkownik cu = new CzatUzytkownik();
        cu.setUzytkownik(sender);
        cu.setNieprzeczytaneWiadomosci(0);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.of(sender));
        when(wiadomoscRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of(cu));

        Wiadomosc msg = service.sendMessage(1L, 1L, "hello");

        assertThat(msg.getTresc()).isEqualTo("hello");
    }

    /* ================= updateCzatName ================= */

    @Test
    void shouldUpdateGroupChatName() {
        Czat czat = new Czat();
        czat.setCzyGrupowy(true);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(czatRepository.save(czat)).thenReturn(czat);

        Czat updated = service.updateCzatName(1L, "Nowa nazwa");

        assertThat(updated.getNazwa()).isEqualTo("Nowa nazwa");
    }

    @Test
    void shouldThrowWhenUpdatingPrivateChatName() {
        Czat czat = new Czat();
        czat.setCzyGrupowy(false);

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));

        assertThatThrownBy(() -> service.updateCzatName(1L, "X"))
                .isInstanceOf(IllegalStateException.class);
    }

    /* ================= addParticipantByLogin ================= */

    @Test
    void shouldAddParticipantByLogin() {
        Czat czat = new Czat();
        czat.setUczestnicy(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();
        user.setLogin("login");

        when(czatRepository.findById(1L)).thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findByLogin("login"))
                .thenReturn(Optional.of(user));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of());
        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(i -> i.getArgument(0));

        CzatUzytkownik cu = service.addParticipantByLogin(1L, "login");

        assertThat(cu.getUzytkownik()).isEqualTo(user);
    }

    @Test
    void shouldThrowWhenLoginNotFound() {
        when(czatRepository.findById(1L)).thenReturn(Optional.of(new Czat()));
        when(uzytkownikRepository.findByLogin("x"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.addParticipantByLogin(1L, "x"))
                .isInstanceOf(LoginNotFoundException.class);
    }
}
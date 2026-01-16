package api.szyszka;

import api.szyszka.Entities.*;
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

    // ========= createPrivateChat =========
    @Test
    void shouldCreatePrivateChat() {
        Uzytkownik u1 = new Uzytkownik();
        u1.setId(1L);
        Uzytkownik u2 = new Uzytkownik();
        u2.setId(2L);

        Czat czat = new Czat();
        czat.setId(10L);

        when(uzytkownikRepository.findById(1L)).thenReturn(Optional.of(u1));
        when(uzytkownikRepository.findById(2L)).thenReturn(Optional.of(u2));
        when(czatRepository.save(any())).thenReturn(czat);
        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Czat result = czatService.createPrivateChat(1L, 2L);

        assertThat(result).isNotNull();
        verify(czatRepository).save(any(Czat.class));
    }

    // ========= createGroupChat =========
    @Test
    void shouldCreateGroupChat() {
        Uzytkownik creator = new Uzytkownik();
        creator.setId(1L);

        Uzytkownik member = new Uzytkownik();
        member.setId(2L);

        when(czatRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        when(uzytkownikRepository.findById(2L))
                .thenReturn(Optional.of(member));

        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Czat result = czatService.createGroupChat(
                "Grupa", creator, List.of(2L));

        assertThat(result.isCzyGrupowy()).isTrue();
    }
    // ========= addParticipant =========
    @Test
    void shouldAddParticipant() {
        Czat czat = new Czat();
        czat.setUczestnicy(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();

        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        CzatUzytkownik cu = czatService.addParticipant(czat, user);

        assertThat(cu).isNotNull();
        assertThat(czat.getUczestnicy()).hasSize(1);
    }

    // ========= getCzatById =========
    @Test
    void shouldReturnCzatById() {
        Czat czat = new Czat();
        when(czatRepository.findById(1L))
                .thenReturn(Optional.of(czat));

        assertThat(czatService.getCzatById(1L)).isEqualTo(czat);
    }

    @Test
    void shouldThrowWhenCzatNotFound() {
        when(czatRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> czatService.getCzatById(1L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ========= deleteCzat =========
    @Test
    void shouldDeleteCzat() {
        when(czatRepository.existsById(1L)).thenReturn(true);

        czatService.deleteCzat(1L);

        verify(czatRepository).deleteById(1L);
    }

    // ========= removeParticipant =========
    @Test
    void shouldRemoveParticipant() {
        Uzytkownik user = new Uzytkownik();
        user.setId(2L);

        CzatUzytkownik cu = new CzatUzytkownik();
        cu.setUzytkownik(user);

        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of(cu));

        czatService.removeParticipant(1L, 2L);

        verify(czatUzytkownikRepository).delete(cu);
    }

    // ========= getParticipants =========
    @Test
    void shouldReturnParticipants() {
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of(new CzatUzytkownik()));

        assertThat(czatService.getParticipants(1L)).hasSize(1);
    }

    // ========= sendMessage =========
    @Test
    void shouldSendMessage() {
        Czat czat = new Czat();
        Uzytkownik nadawca = new Uzytkownik();
        nadawca.setId(1L);

        when(czatRepository.findById(1L))
                .thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(nadawca));
        when(wiadomoscRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of());

        Wiadomosc result =
                czatService.sendMessage(1L, 1L, "hej");

        assertThat(result.getTresc()).isEqualTo("hej");
    }

    // ========= getMessages =========
    @Test
    void shouldReturnMessages() {
        when(wiadomoscRepository
                .findByCzatIdOrderByDataWyslaniaAsc(1L))
                .thenReturn(List.of(new Wiadomosc()));

        assertThat(czatService.getMessages(1L)).hasSize(1);
    }

    // ========= updateCzatName =========
    @Test
    void shouldUpdateCzatName() {
        Czat czat = new Czat();
        czat.setCzyGrupowy(true);

        when(czatRepository.findById(1L))
                .thenReturn(Optional.of(czat));
        when(czatRepository.save(any()))
                .thenReturn(czat);

        Czat result = czatService.updateCzatName(1L, "Nowa");

        assertThat(result.getNazwa()).isEqualTo("Nowa");
    }

    // ========= addParticipantById =========
    @Test
    void shouldAddParticipantById() {
        Czat czat = new Czat();
        czat.setUczestnicy(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();
        user.setId(2L);

        when(czatRepository.findById(1L))
                .thenReturn(Optional.of(czat));
        when(uzytkownikRepository.findById(2L))
                .thenReturn(Optional.of(user));
        when(czatUzytkownikRepository.findByCzatId(1L))
                .thenReturn(List.of());
        when(czatUzytkownikRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        CzatUzytkownik result =
                czatService.addParticipantById(1L, 2L);

        assertThat(result.getUzytkownik()).isEqualTo(user);
    }
}
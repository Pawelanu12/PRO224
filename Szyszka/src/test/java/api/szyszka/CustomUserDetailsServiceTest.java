package api.szyszka;

import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {

    @Mock
    private UzytkownikRepository repo;

    @InjectMocks
    private CustomUserDetailsService service;

    @Test
    void shouldLoadUserWithPassword() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("login");
        u.setHaslo("encoded");
        u.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);

        when(repo.findByLogin("login"))
                .thenReturn(Optional.of(u));

        UserDetails details = service.loadUserByUsername("login");

        assertThat(details.getUsername()).isEqualTo("login");
        assertThat(details.getPassword()).isEqualTo("encoded");
        assertThat(details.getAuthorities())
                .extracting("authority")
                .containsExactly("ROLE_DRUZYNOWY");
    }

    @Test
    void shouldLoadUserWithoutPassword() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("login");
        u.setHaslo(null);
        u.setTypUzytkownika(TypUzytkownika.DEFAULT);

        when(repo.findByLogin("login"))
                .thenReturn(Optional.of(u));

        UserDetails details = service.loadUserByUsername("login");

        assertThat(details.getPassword()).isEqualTo("null");
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        when(repo.findByLogin("login"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.loadUserByUsername("login"))
                .isInstanceOf(UsernameNotFoundException.class);
    }
}
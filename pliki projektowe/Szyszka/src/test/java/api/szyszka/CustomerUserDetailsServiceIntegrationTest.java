package api.szyszka;

import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.CustomUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class CustomUserDetailsServiceIntegrationTest {

    @Autowired
    private CustomUserDetailsService service;

    @Autowired
    private UzytkownikRepository repository;

    @BeforeEach
    void setUp() {
        Uzytkownik user = new Uzytkownik();
        user.setLogin("user1");
        user.setHaslo("password");
        user.setEmail("user@test.pl");
        user.setImie("Jan");
        user.setNazwisko("Kowalski");
        user.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);

        repository.save(user);
    }

//    @Test
//    void shouldLoadUserByUsername() {
//        UserDetails details = service.loadUserByUsername("user1");
//
//        assertEquals("user1", details.getUsername());
//        assertEquals("password", details.getPassword());
//        assertTrue(
//                details.getAuthorities().stream()
//                        .anyMatch(a -> a.getAuthority().equals("ROLE_USER"))
//        );
//    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername("unknown")
        );
    }
}

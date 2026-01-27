package api.szyszka;

import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.User.*;
import api.szyszka.Entities.AuthProvider;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Mappers.UzytkownikMapper;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.JwtService;
import api.szyszka.Services.UzytkownikService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UzytkownikServiceTest {

    @Mock
    private UzytkownikRepository uzytkownikRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UzytkownikService service;

    /* ================= createUser ================= */

    @Test
    void shouldCreateUser() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("test");

        when(uzytkownikRepository.findByLogin("test"))
                .thenReturn(Optional.empty());
        when(uzytkownikRepository.save(u))
                .thenReturn(u);

        Uzytkownik result = service.createUser(u);

        assertThat(result).isNotNull();
        verify(uzytkownikRepository).save(u);
    }

    @Test
    void shouldThrowDuplicateLoginExceptionOnCreateUser() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("test");

        when(uzytkownikRepository.findByLogin("test"))
                .thenReturn(Optional.of(new Uzytkownik()));

        assertThatThrownBy(() -> service.createUser(u))
                .isInstanceOf(DuplicateLoginException.class);
    }

    /* ================= register ================= */

    @Test
    void shouldRegisterUser() {
        RegisterRequest req = new RegisterRequest();
        req.setLogin("login");
        req.setHaslo("pass");

        when(uzytkownikRepository.findByLogin("login"))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode("pass"))
                .thenReturn("encoded");

        service.register(req);

        verify(uzytkownikRepository).save(any(Uzytkownik.class));
    }

    /* ================= login ================= */

    @Test
    void shouldLoginAndReturnJwt() {
        LoginRequest req = new LoginRequest();
        req.setLogin("login");
        req.setHaslo("pass");

        when(authenticationManager.authenticate(any()))
                .thenReturn(null);
        when(jwtService.generateToken("login"))
                .thenReturn("jwt");

        String token = service.login(req);

        assertThat(token).isEqualTo("jwt");
    }

    /* ================= getCurrentUser ================= */

    @Test
    void shouldReturnCurrentUserDto() {
        Uzytkownik u = new Uzytkownik();
        u.setId(1L);
        u.setLogin("login");

        when(uzytkownikRepository.findByLogin("login"))
                .thenReturn(Optional.of(u));

        UzytkownikDto dto = UzytkownikMapper.toDto( service.getCurrentUser("login"));

        assertThat(dto.getLogin()).isEqualTo("login");
        assertThat(dto.getId()).isEqualTo(1L);
    }

    /* ================= getUserById ================= */

    @Test
    void shouldReturnUserById() {
        Uzytkownik u = new Uzytkownik();
        u.setId(1L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(u));

        assertThat(service.getUserById(1L)).isEqualTo(u);
    }

    @Test
    void shouldThrowUserNotFoundException() {
        when(uzytkownikRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getUserById(99L))
                .isInstanceOf(UserNotFoundException.class);
    }

    /* ================= updateUser ================= */

    @Test
    void shouldUpdateUser() {
        Uzytkownik existing = new Uzytkownik();
        existing.setId(1L);
        existing.setLogin("old");

        Uzytkownik updated = new Uzytkownik();
        updated.setLogin("old");

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(existing));
        when(uzytkownikRepository.save(existing))
                .thenReturn(existing);

        service.updateUser(1L, updated);

        verify(uzytkownikRepository).save(existing);
    }

    @Test
    void shouldThrowDuplicateLoginExceptionOnUpdate() {
        Uzytkownik existing = new Uzytkownik();
        existing.setId(1L);
        existing.setLogin("old");

        Uzytkownik updated = new Uzytkownik();
        updated.setLogin("new");

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(existing));
        when(uzytkownikRepository.findByLogin("new"))
                .thenReturn(Optional.of(new Uzytkownik()));

        assertThatThrownBy(() -> service.updateUser(1L, updated))
                .isInstanceOf(DuplicateLoginException.class);
    }

    /* ================= deleteUser ================= */

    @Test
    void shouldDeleteUser() {
        when(uzytkownikRepository.existsById(1L))
                .thenReturn(true);

        service.deleteUser(1L);

        verify(uzytkownikRepository).deleteById(1L);
    }

    @Test
    void shouldThrowUserNotFoundOnDelete() {
        when(uzytkownikRepository.existsById(99L))
                .thenReturn(false);

        assertThatThrownBy(() -> service.deleteUser(99L))
                .isInstanceOf(UserNotFoundException.class);
    }

    /* ================= changeUserType ================= */

    @Test
    void shouldChangeUserType() {
        Uzytkownik admin = new Uzytkownik();
        admin.setId(1L);
        admin.setTypUzytkownika(TypUzytkownika.DRUZYNOWY);

        Uzytkownik target = new Uzytkownik();
        target.setId(2L);

        Principal principal = () -> "admin";

        when(uzytkownikRepository.findByLogin("admin"))
                .thenReturn(Optional.of(admin));
        when(uzytkownikRepository.findById(2L))
                .thenReturn(Optional.of(target));
        when(uzytkownikRepository.save(target))
                .thenReturn(target);

        service.changeUserType(2L, TypUzytkownika.PRZYBOCZNY, principal);

        assertThat(target.getTypUzytkownika())
                .isEqualTo(TypUzytkownika.PRZYBOCZNY);
    }

    @Test
    void shouldThrowWhenAdminNotDruzynowy() {
        Uzytkownik admin = new Uzytkownik();
        admin.setTypUzytkownika(TypUzytkownika.RODZIC);

        Principal principal = () -> "admin";

        when(uzytkownikRepository.findByLogin("admin"))
                .thenReturn(Optional.of(admin));

        assertThatThrownBy(() ->
                service.changeUserType(2L, TypUzytkownika.ZUCH, principal))
                .isInstanceOf(SecurityException.class);
    }

    /* ================= loginWithGoogle ================= */

    @Test
    void shouldLoginWithGoogleExistingUser() {
        GoogleUserData google = new GoogleUserData("gid", "mail@test.com", "Jan", "Kowalski");

        Uzytkownik u = new Uzytkownik();
        u.setLogin("login");

        when(uzytkownikRepository.findByGoogleId("gid"))
                .thenReturn(Optional.of(u));
        when(jwtService.generateToken("login"))
                .thenReturn("jwt");

        String token = service.loginWithGoogle(google);

        assertThat(token).isEqualTo("jwt");
    }

    @Test
    void shouldAttachGoogleIdToExistingEmailUser() {
        GoogleUserData google = new GoogleUserData("gid", "mail@test.com", "Jan", "Kowalski");

        Uzytkownik existing = new Uzytkownik();
        existing.setLogin("login");

        when(uzytkownikRepository.findByGoogleId("gid"))
                .thenReturn(Optional.empty());
        when(uzytkownikRepository.findByEmail("mail@test.com"))
                .thenReturn(Optional.of(existing));
        when(jwtService.generateToken("login"))
                .thenReturn("jwt");

        String token = service.loginWithGoogle(google);

        assertThat(token).isEqualTo("jwt");
        verify(uzytkownikRepository).save(existing);
    }

    /* ================= getChildren ================= */

    @Test
    void shouldReturnChildren() {
        when(uzytkownikRepository.existsById(1L))
                .thenReturn(true);
        when(uzytkownikRepository.findByRodzic1IdOrRodzic2Id(1L, 1L))
                .thenReturn(List.of(new Uzytkownik()));

        List<Uzytkownik> children = service.getChildren(1L, null);

        assertThat(children).hasSize(1);
    }

    @Test
    void shouldThrowWhenNoParentIdsProvided() {
        assertThatThrownBy(() -> service.getChildren(null, null))
                .isInstanceOf(IllegalArgumentException.class);
    }

    /* ================= getParents ================= */

    @Test
    void shouldReturnParents() {
        Uzytkownik child = new Uzytkownik();
        child.setRodzic1(new Uzytkownik());

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(child));

        List<Uzytkownik> parents = service.getParents(1L);

        assertThat(parents).hasSize(1);
    }

    /* ================= getUsersByType ================= */

    @Test
    void shouldReturnUsersByType() {
        when(uzytkownikRepository.findByTypUzytkownika(TypUzytkownika.DEFAULT))
                .thenReturn(List.of(new Uzytkownik()));

        List<Uzytkownik> users = service.getUsersByType("DEFAULT");

        assertThat(users).isNotEmpty();
    }

    @Test
    void shouldThrowUserTypeNotFoundException() {
        assertThatThrownBy(() -> service.getUsersByType("XYZ"))
                .isInstanceOf(UserTypeNotFoundException.class);
    }

    /* ================= getUsersBySzostka ================= */

    @Test
    void shouldReturnUsersBySzostka() {
        when(uzytkownikRepository.findBySzostkaId(1L))
                .thenReturn(List.of(new Uzytkownik()));

        List<Uzytkownik> users = service.getUsersBySzostka(1L);

        assertThat(users).hasSize(1);
    }

    /* ================= changePassword ================= */

    @Test
    void shouldThrowWhenOldPasswordIncorrect() {
        Uzytkownik u = new Uzytkownik();
        u.setHaslo("encoded");

        when(uzytkownikRepository.findByLogin("login"))
                .thenReturn(Optional.of(u));
        when(passwordEncoder.matches("wrong", "encoded"))
                .thenReturn(false);

        ChangePasswordRequest req =
                new ChangePasswordRequest("wrong", "new");

        assertThatThrownBy(() ->
                service.changePassword("login", req))
                .isInstanceOf(BadCredentialsException.class);
    }
}
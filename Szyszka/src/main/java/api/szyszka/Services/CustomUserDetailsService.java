package api.szyszka.Services;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Repositories.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UzytkownikRepository repo;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Uzytkownik u = repo.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String role = "ROLE_" + u.getTypUzytkownika().name();

        if (u.getHaslo() != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(u.getLogin())
                    .password(u.getHaslo())
                    .authorities(role)
                    .build();
        } else {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(u.getLogin())
                    .password("null")
                    .authorities(role)
                    .build();
        }
    }


}


package api.szyszka.Services;
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

        String role = "ROLE_" + u.getTypUzytkownika().toUpperCase();
    if(u.getHaslo() != null)
        return new org.springframework.security.core.userdetails.User(
                u.getLogin(),
                u.getHaslo(),
                List.of(new SimpleGrantedAuthority(role))
        );
    return new org.springframework.security.core.userdetails.User(
            u.getLogin(),
            "null",
            List.of(new SimpleGrantedAuthority(role)));
    }
}

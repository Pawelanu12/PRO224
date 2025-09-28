package api.szyszka.Security;

import api.szyszka.Repositories.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UzytkownikSecurity {

    private final UzytkownikRepository repo;

    public boolean canUpdateUser(Long userId, Object principal) {
        if (!(principal instanceof User springUser)) {
            return false;
        }

        // logged-in login
        String login = springUser.getUsername();

        return repo.findById(userId)
                .map(u -> u.getLogin().equals(login))
                .orElse(false);
    }
}

package api.szyszka.Repositories;


import api.szyszka.Entities.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long> {
    Optional<Uzytkownik> findByLogin(String login);
    List<Uzytkownik> findBySzostkaId(Long szostkaId);
}

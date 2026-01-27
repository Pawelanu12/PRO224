package api.szyszka.Repositories;

import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Entities.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UczestnictwoRepository extends JpaRepository<Uczestnictwo, Long> {
    List<Uczestnictwo> findByWydarzenieId(Long wydarzenieId);
    List<Uczestnictwo> findByUzytkownikId(Long uzytkownikId);

    Optional<Object> findUczestnictwoByUzytkownik(Uzytkownik uzytkownik);

    Optional<Object> findUczestnictwoByUzytkownikId(Uzytkownik uzytkownik);
}
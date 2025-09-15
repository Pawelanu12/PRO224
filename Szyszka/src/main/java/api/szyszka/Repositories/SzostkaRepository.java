package api.szyszka.Repositories;

import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SzostkaRepository extends JpaRepository<Szostka, Long> {
    Optional<Szostka> findByNazwa(String nazwa);
}
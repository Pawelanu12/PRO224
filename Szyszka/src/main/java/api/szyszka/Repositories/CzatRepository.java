package api.szyszka.Repositories;

import api.szyszka.Entities.Czat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CzatRepository extends JpaRepository<Czat, Long> {
    List<Czat> findByNazwaContainingIgnoreCase(String nazwa);
}

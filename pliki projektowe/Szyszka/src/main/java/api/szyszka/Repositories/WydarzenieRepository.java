package api.szyszka.Repositories;

import api.szyszka.Entities.Wydarzenie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WydarzenieRepository extends JpaRepository<Wydarzenie, Long> {
    List<Wydarzenie> findByOrganizatorId(Long organizatorId);

    Optional<Wydarzenie> findByNazwa(String nazwa);

    Optional<Wydarzenie> findByDataWyjazdu(LocalDateTime dataWyjazdu);

    Optional<Wydarzenie> findByDataZakonczenia(LocalDateTime dataZakonczenia);

    List<Wydarzenie> findByDataWyjazduBetween(LocalDateTime dataWyjazduAfter, LocalDateTime dataWyjazduBefore);

    List<Wydarzenie> findByDataZakonczeniaBetween(LocalDateTime dataZakonczeniaAfter, LocalDateTime dataZakonczeniaBefore);
}
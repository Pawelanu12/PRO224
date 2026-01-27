package api.szyszka.Repositories;

import api.szyszka.Entities.Wiadomosc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WiadomoscRepository extends JpaRepository<Wiadomosc, Long> {
    List<Wiadomosc> findByCzatIdOrderByDataWyslaniaAsc(Long czatId);
    List<Wiadomosc> findByCzatId(Long czatId);
}

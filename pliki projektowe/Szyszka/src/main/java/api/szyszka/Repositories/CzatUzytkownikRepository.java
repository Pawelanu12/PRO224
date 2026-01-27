package api.szyszka.Repositories;

import api.szyszka.Entities.CzatUzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CzatUzytkownikRepository extends JpaRepository<CzatUzytkownik, Long> {
    List<CzatUzytkownik> findByCzatId(Long czatId);
    Optional<CzatUzytkownik> findByCzatIdAndUzytkownikId(Long czatId, Long uzytkownikId);
    List<CzatUzytkownik> findByUzytkownikId(Long uzytkownikId);
    List<CzatUzytkownik> findAllByCzatId(Long czatId);
}

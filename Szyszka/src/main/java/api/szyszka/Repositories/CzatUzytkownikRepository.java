package api.szyszka.Repositories;

import api.szyszka.Entities.CzatUzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CzatUzytkownikRepository extends JpaRepository<CzatUzytkownik, Long> {
    List<CzatUzytkownik> findByCzatId(Long czatId);
    List<CzatUzytkownik> findByUzytkownikId(Long uzytkownikId);
}

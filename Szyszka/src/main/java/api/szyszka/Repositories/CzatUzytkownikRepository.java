package api.szyszka.Repositories;

import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Wiadomosc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CzatUzytkownikRepository extends JpaRepository<CzatUzytkownik, Long> {
    List<CzatUzytkownik> findByCzatId(Long czatId);
    Optional<CzatUzytkownik> findByCzatIdAndUzytkownikId(Long czatId, Long uzytkownikId);
    List<CzatUzytkownik> findByUzytkownikId(Long uzytkownikId);
    List<CzatUzytkownik> findAllByCzatId(Long czatId);

    @Modifying
    @Query("""
UPDATE CzatUzytkownik cu
SET cu.nieprzeczytaneWiadomosci = cu.nieprzeczytaneWiadomosci + 1,
    cu.wiadomosc = :wiadomosc
WHERE cu.id = :id
""")
    void incrementUnread(@Param("id") Long id,
                         @Param("wiadomosc") Wiadomosc wiadomosc);
}

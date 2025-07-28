package api.szyszka.Repositories;

import api.szyszka.Entities.ZdobyteSprawnosci;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ZdobyteSprawnosciRepository extends JpaRepository<ZdobyteSprawnosci, Long> {
    List<ZdobyteSprawnosci> findByUzytkownikId(Long uzytkownikId);
}
package api.szyszka.Repositories;

import api.szyszka.Entities.Zdjecie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ZdjecieRepository extends JpaRepository<Zdjecie, Long> {
    List<Zdjecie> findByPostId(Long postId);
    List<Zdjecie> findByWydarzenieId(Long wydarzenieId);
    List<Zdjecie> findByUzytkownikId(Long uzytkownikId);
}
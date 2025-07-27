package api.szyszka.Repositories;

import api.szyszka.Entities.Uczestnictwo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UczestnictwoRepository extends JpaRepository<Uczestnictwo, Long> {
    List<Uczestnictwo> findByWydarzenieId(Long wydarzenieId);
    List<Uczestnictwo> findByUzytkownikId(Long uzytkownikId);
}
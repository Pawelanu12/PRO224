package org.example.repositories;

import org.example.entities.ZdobyteSprawnosci;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZdobyteSprawnosciRepository extends JpaRepository<ZdobyteSprawnosci, Long> {
    List<ZdobyteSprawnosci> findByUzytkownikId(Long uzytkownikId);
}
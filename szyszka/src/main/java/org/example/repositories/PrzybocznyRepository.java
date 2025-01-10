package org.example.repositories;

import org.example.entities.Przyboczny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrzybocznyRepository extends JpaRepository<Przyboczny, Long> {
}

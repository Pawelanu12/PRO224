package org.example.repositories;

import org.example.entities.Zuch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZuchRepository extends JpaRepository<Zuch, Long> {
}

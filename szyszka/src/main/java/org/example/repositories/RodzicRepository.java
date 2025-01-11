package org.example.repositories;

import org.example.entities.Rodzic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RodzicRepository extends JpaRepository<Rodzic, Long> {
}

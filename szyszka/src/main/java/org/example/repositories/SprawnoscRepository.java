package org.example.repositories;

import org.example.entities.Sprawnosc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SprawnoscRepository extends JpaRepository<Sprawnosc, Long> {
}

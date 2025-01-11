package org.example.repositories;

import org.example.entities.Druzynowy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DruzynowyRepository extends JpaRepository<Druzynowy, Long> {
}

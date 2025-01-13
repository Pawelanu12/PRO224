package org.example.repositories;

import org.example.entities.Zuch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZuchRepository extends JpaRepository<Zuch, Long> {

        @Query("SELECT z FROM Zuch z WHERE z.rodzic1 = :rodzicId OR z.rodzic2 = :rodzicId")
        List<Zuch> findByRodzicId(@Param("rodzicId") Long rodzicId);
    }

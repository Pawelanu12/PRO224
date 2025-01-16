package org.example.controllers;

import org.example.entities.Sprawnosc;
import org.example.services.SprawnoscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprawnosc")
public class SprawnoscController {

    @Autowired
    private SprawnoscService sprawnoscService;



    @GetMapping
    public ResponseEntity<List<Sprawnosc>> getAllSprawnosc() {
        return ResponseEntity.ok(sprawnoscService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sprawnosc> getSprawnoscById(@PathVariable Long id) {
        return sprawnoscService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprawnosc(@PathVariable Long id) {
        sprawnoscService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
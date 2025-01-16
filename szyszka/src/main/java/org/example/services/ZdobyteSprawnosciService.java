package org.example.services;

import org.example.entities.ZdobyteSprawnosci;
import org.example.repositories.ZdobyteSprawnosciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ZdobyteSprawnosciService {

    private final ZdobyteSprawnosciRepository zdobyteSprawnosciRepository;

    @Autowired
    public ZdobyteSprawnosciService(ZdobyteSprawnosciRepository zdobyteSprawnosciRepository) {
        this.zdobyteSprawnosciRepository = zdobyteSprawnosciRepository;
    }

    public List<ZdobyteSprawnosci> findAll() {
        return zdobyteSprawnosciRepository.findAll();
    }

    public Optional<ZdobyteSprawnosci> findById(Long id) {
        return zdobyteSprawnosciRepository.findById(id);
    }

    @Transactional
    public ZdobyteSprawnosci save(ZdobyteSprawnosci zdobyteSprawnosci) {
        return zdobyteSprawnosciRepository.save(zdobyteSprawnosci);
    }

    @Transactional
    public void deleteById(Long id) {
        zdobyteSprawnosciRepository.deleteById(id);
    }
    public List<ZdobyteSprawnosci> findByUzytkownikId(Long uzytkownikId) {
        return zdobyteSprawnosciRepository.findByUzytkownikId(uzytkownikId);
    }
}
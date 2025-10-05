package api.szyszka.Services;

import api.szyszka.DTOs.UczestnictwoDto;
import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Exceptions.DuplicateUserUczestnictwoException;
import api.szyszka.Repositories.UczestnictwoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UczestnictwoService {
    private final UczestnictwoRepository uczestnictwoRepository;

    public UczestnictwoService(UczestnictwoRepository uczestnictwoRepository) {
        this.uczestnictwoRepository = uczestnictwoRepository;
    }

    public Uczestnictwo createUczestnictwo(Uczestnictwo uczestnictwo) {
        if (uczestnictwoRepository.findUczestnictwoByUzytkownikId(uczestnictwo.getUzytkownik()).isPresent()) {
            throw new DuplicateUserUczestnictwoException(uczestnictwo.getUzytkownik());
        }
        return uczestnictwoRepository.save(uczestnictwo);
    }

    public Uczestnictwo getUczestnictwoById(Long id) {return uczestnictwoRepository.findById(id).get();}

    public List<Uczestnictwo> getAllUczestnictwo() {return uczestnictwoRepository.findAll();}

    public void deleteUczestnictwoById(Long id) {uczestnictwoRepository.deleteById(id);}

    public Uczestnictwo modifyUczesnictwoById(Long id, Uczestnictwo updateUczestnictwo) {
        Uczestnictwo oldUczestnictwo = getUczestnictwoById(id);

        oldUczestnictwo.setObecny(updateUczestnictwo.isObecny());
        oldUczestnictwo.setUzytkownik(updateUczestnictwo.getUzytkownik());
        oldUczestnictwo.setWydarzenie(updateUczestnictwo.getWydarzenie());

        return uczestnictwoRepository.save(oldUczestnictwo);
    }
}

package api.szyszka.Services;

import api.szyszka.Entities.Szostka;
import api.szyszka.Repositories.SzostkaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SzostkaService {
    private final SzostkaRepository szostkaRepository;
    public SzostkaService(SzostkaRepository szostkaRepository) {
        this.szostkaRepository = szostkaRepository;
    }

    public Szostka create(Szostka szostka) {return szostkaRepository.save(szostka);}

    public Optional<Szostka> getSzostkaById(Long id) {return szostkaRepository.findById(id);}

    public List<Szostka> getAllSprawnosc() {return szostkaRepository.findAll();}

    public void deleteSzostkaById(Long id) {szostkaRepository.deleteById(id);}

    public void modifySzostkaById(Long id, Szostka szostka) {
        Optional<Szostka> sprawnosc = szostkaRepository.findById(id);

        if (sprawnosc.isPresent()) {

        }
    }
}

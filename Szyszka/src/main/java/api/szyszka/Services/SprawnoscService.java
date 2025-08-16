package api.szyszka.Services;

import api.szyszka.Entities.Post;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Repositories.SprawnoscRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SprawnoscService {
    private final SprawnoscRepository sprawnoscRepository;
    public SprawnoscService( SprawnoscRepository sprawnoscRepository) {
        this.sprawnoscRepository = sprawnoscRepository;
    }

    public Sprawnosc createSprawnosc(Sprawnosc sprawnosc) {return sprawnoscRepository.save(sprawnosc);}

    public Optional<Sprawnosc> getSprawnoscByID(long id) {return sprawnoscRepository.findById(id);}

    public List<Sprawnosc> getAllSprawnosc() {return sprawnoscRepository.findAll();}

    public void deleteSprawnosc(long id) {sprawnoscRepository.deleteById(id);}

    public void modifySprawnoscById(long id, Sprawnosc updateSprawnosc) {
        Optional<Sprawnosc> oldSprawnosc = sprawnoscRepository.findById(id);

        if (oldSprawnosc.isPresent()) {
            Sprawnosc sprawnosc = oldSprawnosc.get();
            sprawnosc.setNazwa(updateSprawnosc.getNazwa());
            sprawnosc.setOpis(updateSprawnosc.getOpis());
            sprawnosc.setIkona(updateSprawnosc.getIkona());
            sprawnosc.setOpisWymagan(updateSprawnosc.getOpisWymagan());
            sprawnoscRepository.save(sprawnosc);

        }
        else {
            throw new NoSuchElementException("Post not found by id: " + id);
        }
    }
}

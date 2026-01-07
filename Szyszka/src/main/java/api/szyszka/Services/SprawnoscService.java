package api.szyszka.Services;

import api.szyszka.Entities.Post;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Exceptions.DuplicateNazwaSprawnosciException;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SprawnoscService {
    private final SprawnoscRepository sprawnoscRepository;
    private final UzytkownikRepository uzytkownikRepository;

    public SprawnoscService(SprawnoscRepository sprawnoscRepository, UzytkownikRepository uzytkownikRepository) {
        this.sprawnoscRepository = sprawnoscRepository;
        this.uzytkownikRepository = uzytkownikRepository;
    }

    public Sprawnosc createSprawnosc(Sprawnosc sprawnosc) {return sprawnoscRepository.save(sprawnosc);}

    public Sprawnosc getSprawnoscById(long id) {return sprawnoscRepository.findById(id).get();}

    public List<Sprawnosc> getAllSprawnosc() {return sprawnoscRepository.findAll();}

    public void deleteSprawnosc(long id) {sprawnoscRepository.deleteById(id);}

    public Sprawnosc modifySprawnoscById(long id, Sprawnosc updateSprawnosc) {
        Sprawnosc oldSprawnosc = getSprawnoscById(id);

        if (!oldSprawnosc.getNazwa().equals(updateSprawnosc.getNazwa())) {
            throw new DuplicateNazwaSprawnosciException(updateSprawnosc.getNazwa());
        }

//        oldSprawnosc.setNazwa(updateSprawnosc.getNazwa());
//        oldSprawnosc.setOpis(updateSprawnosc.getOpis());
//        oldSprawnosc.setOpisWymagan(updateSprawnosc.getOpisWymagan());
//        oldSprawnosc.setIkona(updateSprawnosc.getIkona());

        return sprawnoscRepository.save(oldSprawnosc);
    }
}

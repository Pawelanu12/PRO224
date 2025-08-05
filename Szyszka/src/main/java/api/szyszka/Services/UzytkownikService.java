package api.szyszka.Services;

import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UzytkownikService {

    private final UzytkownikRepository uzytkownikRepository;

    public UzytkownikService(UzytkownikRepository uzytkownikRepository) {
        this.uzytkownikRepository = uzytkownikRepository;
    }

    public Uzytkownik createUser(Uzytkownik uzytkownik) {
        return uzytkownikRepository.save(uzytkownik);
    }

    public Optional<Uzytkownik> getUserById(Long id) {
        return uzytkownikRepository.findById(id);
    }

    public Uzytkownik getUserByLogin(String login) {
        return uzytkownikRepository.findByLogin(login)
                .orElseThrow(() -> new LoginNotFoundException(login));
    }
    public List<Uzytkownik> getAllUsers() {
        return uzytkownikRepository.findAll();
    }
    public Uzytkownik updateUser(Long id, Uzytkownik updatedUser) {
        Uzytkownik existing = uzytkownikRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        existing.setImie(updatedUser.getImie());
        existing.setNazwisko(updatedUser.getNazwisko());
        existing.setEmail(updatedUser.getEmail());
        existing.setHaslo(updatedUser.getHaslo());
        existing.setLogin(updatedUser.getLogin());
        existing.setNrTelefonu(updatedUser.getNrTelefonu());
        existing.setDataUrodzenia(updatedUser.getDataUrodzenia());
        existing.setDataDolaczeniaDoGromady(updatedUser.getDataDolaczeniaDoGromady());
        existing.setTypUzytkownika(updatedUser.getTypUzytkownika());
        existing.setRodzic1(updatedUser.getRodzic1());
        existing.setRodzic2(updatedUser.getRodzic2());
        existing.setSzostka(updatedUser.getSzostka());

        return uzytkownikRepository.save(existing);
    }
    public void deleteUser(Long id) {
        uzytkownikRepository.deleteById(id);
    }
}

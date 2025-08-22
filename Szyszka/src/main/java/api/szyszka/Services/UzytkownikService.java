package api.szyszka.Services;

import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UzytkownikService {

    private final UzytkownikRepository uzytkownikRepository;

    public UzytkownikService(UzytkownikRepository uzytkownikRepository) {
        this.uzytkownikRepository = uzytkownikRepository;
    }

    public Uzytkownik createUser(Uzytkownik uzytkownik) {
        if (uzytkownikRepository.findByLogin(uzytkownik.getLogin()).isPresent()) {
            throw new DuplicateLoginException(uzytkownik.getLogin());
        }
        return uzytkownikRepository.save(uzytkownik);
    }


    public Uzytkownik getUserById(Long id) {
        return uzytkownikRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }



    public Uzytkownik getUserByLogin(String login) {
        return uzytkownikRepository.findByLogin(login)
                .orElseThrow(() -> new LoginNotFoundException(login));
    }

    public List<Uzytkownik> getAllUsers() {
        return uzytkownikRepository.findAll();
    }

    public Uzytkownik updateUser(Long id, Uzytkownik updatedUser) {
        Uzytkownik existing = getUserById(id);

        // protect login uniqueness
        if (!existing.getLogin().equals(updatedUser.getLogin())
                && uzytkownikRepository.findByLogin(updatedUser.getLogin()).isPresent()) {
            throw new DuplicateLoginException(updatedUser.getLogin());
        }

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
        if (!uzytkownikRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        uzytkownikRepository.deleteById(id);
    }

    public Uzytkownik getUserByEmail(String email) {
        return uzytkownikRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException(email));
    }

    public boolean existsByLogin(String login) {
        return uzytkownikRepository.findByLogin(login).isPresent();
    }
}

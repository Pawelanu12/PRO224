package api.szyszka.Services;

import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    public List<Uzytkownik> getChildren(Long parentId1, Long parentId2) {
        if (parentId1 == null && parentId2 == null) {
            throw new IllegalArgumentException("At least one parentId must be provided.");
        }
        if (parentId1 != null && !uzytkownikRepository.existsById(parentId1)) {
            throw new UserNotFoundException(parentId1);
        }
        if (parentId2 != null && !uzytkownikRepository.existsById(parentId2)) {
            throw new UserNotFoundException(parentId2);
        }
        if (parentId1 != null && parentId2 != null) {
            return uzytkownikRepository.findByRodzic1IdOrRodzic2Id(parentId1, parentId2);
        } else if (parentId1 != null) {
            return uzytkownikRepository.findByRodzic1IdOrRodzic2Id(parentId1, parentId1);
        } else {
            return uzytkownikRepository.findByRodzic1IdOrRodzic2Id(parentId2, parentId2);
        }
    }
    public List<Uzytkownik> getParents(Long childId){
        Uzytkownik child = uzytkownikRepository.findById(childId)
                .orElseThrow(() -> new UserNotFoundException(childId));
        List<Uzytkownik> parents = new ArrayList<>();
        if(child.getRodzic1() != null){
            parents.add(child.getRodzic1());
        }
        if (child.getRodzic2() != null){
            parents.add(child.getRodzic2());
        }
        return parents;
    }
    public List<Uzytkownik> getUsersByType(String typUzytkownika) {
        List<Uzytkownik> users = uzytkownikRepository.findByTypUzytkownika(typUzytkownika);
        if (users.isEmpty()) {
            throw new UserTypeNotFoundException(typUzytkownika);
        }
        return users;
    }
    public List<Uzytkownik> getUsersBySzostka(Long szostkaId){
        if (uzytkownikRepository.findBySzostkaId(szostkaId).isEmpty()){
            throw new SzostkaNotFoundException(szostkaId);
        }
        List<Uzytkownik> users = uzytkownikRepository.findBySzostkaId(szostkaId);
        return users;
        }


}

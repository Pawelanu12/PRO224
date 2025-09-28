package api.szyszka.Services;

import api.szyszka.DTOs.Auth.AuthResponse;
import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.UzytkownikDto;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Repositories.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UzytkownikService {

    private final UzytkownikRepository uzytkownikRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UzytkownikService(UzytkownikRepository uzytkownikRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.uzytkownikRepository = uzytkownikRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    public Uzytkownik createUser(Uzytkownik uzytkownik) {
        if (uzytkownikRepository.findByLogin(uzytkownik.getLogin()).isPresent()) {
            throw new DuplicateLoginException(uzytkownik.getLogin());
        }
        return uzytkownikRepository.save(uzytkownik);
    }
    public void register(RegisterRequest req) {
        if (uzytkownikRepository.findByLogin(req.getLogin()).isPresent()) {
            throw new DuplicateLoginException("Login already used");
        }

        Uzytkownik u = new Uzytkownik();
        u.setLogin(req.getLogin());
        u.setHaslo(passwordEncoder.encode(req.getHaslo()));
        u.setImie(req.getImie());
        u.setNazwisko(req.getNazwisko());
        u.setTypUzytkownika(req.getTypUzytkownika() != null ? req.getTypUzytkownika() : "ZUCH");
        u.setEmail(req.getEmail());
        u.setDataUrodzenia(req.getDataUrodzenia());
        u.setDataDolaczeniaDoGromady(LocalDateTime.now());

        uzytkownikRepository.save(u);
    }
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        req.getLogin(),
                        req.getHaslo()
                )
        );
        String token = jwtService.generateToken(req.getLogin());
        return new AuthResponse(token);
    }

    public UzytkownikDto getCurrentUser(String login) {
        Uzytkownik u = uzytkownikRepository.findByLogin(login).orElseThrow();
        UzytkownikDto dto = new UzytkownikDto();
        dto.setLogin(u.getLogin());
        dto.setId(u.getId());
        dto.setImie(u.getImie());
        dto.setNazwisko(u.getNazwisko());
        dto.setTypUzytkownika(u.getTypUzytkownika());
        dto.setEmail(u.getEmail());
        return dto;
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
        return uzytkownikRepository.findBySzostkaId(szostkaId);
        }


}

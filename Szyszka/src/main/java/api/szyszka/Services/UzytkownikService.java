package api.szyszka.Services;

//import api.szyszka.DTOs.Auth.AuthResponse;
//import api.szyszka.DTOs.Auth.LoginRequest;
//import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.Auth.AuthResponse;
import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.GoogleUserData;
import api.szyszka.DTOs.UzytkownikDto;
import api.szyszka.Entities.AuthProvider;
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
    public String login(LoginRequest req) {
        authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        req.getLogin(),
                        req.getHaslo()
                )
        );
       return jwtService.generateToken(req.getLogin());
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

    public String loginWithGoogle(GoogleUserData googleUser) {

        //Czy użytkownik już istnieje po googleId
        var userOpt = uzytkownikRepository.findByGoogleId(googleUser.getGoogleId());
        if (userOpt.isPresent()) {
            return jwtService.generateToken(userOpt.get().getLogin());
        }

        // Czy istnieje konto nie google z tym samym email
        if (googleUser.getEmail() != null) {
            var byEmail = uzytkownikRepository.findByEmail(googleUser.getEmail());
            if (byEmail.isPresent()) {
                Uzytkownik u = byEmail.get();
                u.setGoogleId(googleUser.getGoogleId());
                u.setAuthProvider(AuthProvider.GOOGLE);
                uzytkownikRepository.save(u);

                return jwtService.generateToken(u.getLogin());
//                return new AuthResponse(token);
            }
        }

        // 3. NOWY UŻYTKOWNIK (rejestracja przez Google)
        Uzytkownik u = new Uzytkownik();
        u.setLogin(googleUser.getEmail()); // login = email
        u.setEmail(googleUser.getEmail());
        u.setImie(googleUser.getImie());
        u.setNazwisko(googleUser.getNazwisko());
        u.setGoogleId(googleUser.getGoogleId());
        u.setAuthProvider(AuthProvider.GOOGLE);
        u.setTypUzytkownika("ZUCH");
        u.setDataDolaczeniaDoGromady(LocalDateTime.now());

        uzytkownikRepository.save(u);

        return jwtService.generateToken(u.getLogin());
    }

}

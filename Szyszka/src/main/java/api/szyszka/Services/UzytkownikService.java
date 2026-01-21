package api.szyszka.Services;

//import api.szyszka.DTOs.Auth.AuthResponse;
//import api.szyszka.DTOs.Auth.LoginRequest;
//import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.User.*;
import api.szyszka.Entities.AuthProvider;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Exceptions.*;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
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
//        u.setImie(req.getImie());
//        u.setNazwisko(req.getNazwisko());
        u.setTypUzytkownika(TypUzytkownika.DEFAULT);
        u.setEmail(req.getEmail());
//        u.setDataUrodzenia(req.getDataUrodzenia());
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

    public Uzytkownik getCurrentUser(String login) {
        Uzytkownik u = uzytkownikRepository.findByLogin(login).orElseThrow();

        return u;
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
    public List<Uzytkownik> getUsersByType(String typ) {
        TypUzytkownika enumTyp;
        try {
            enumTyp = TypUzytkownika.valueOf(typ.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new UserTypeNotFoundException(typ);
        }
        List<Uzytkownik> users = uzytkownikRepository.findByTypUzytkownika(enumTyp);
        if (users.isEmpty()) {
            throw new UserTypeNotFoundException(typ);
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
        u.setTypUzytkownika(TypUzytkownika.DEFAULT);
        u.setDataDolaczeniaDoGromady(LocalDateTime.now());

        uzytkownikRepository.save(u);

        return jwtService.generateToken(u.getLogin());
    }
    public Uzytkownik updateMyProfile(String login, UpdateMyProfileRequest req) {
        Uzytkownik u = getUserByLogin(login);

        if(req.getLogin()!=null && !req.getLogin().equals(u.getLogin())) {
            if(uzytkownikRepository.findByLogin(req.getLogin()).isPresent())
                throw new DuplicateLoginException(req.getLogin());
            u.setLogin(req.getLogin());
        }
        if(req.getImie()!=null)
            u.setImie(req.getImie());
        if(req.getNazwisko()!=null)
            u.setNazwisko(req.getNazwisko());
        if(req.getEmail()!=null)
            u.setEmail(req.getEmail());
        if(req.getNrTelefonu()!=null)
            u.setNrTelefonu(req.getNrTelefonu());
        if(req.getDataUrodzenia()!=null)
            u.setDataUrodzenia(req.getDataUrodzenia());
//        u.setZdjecie(req.getZdjecie());
        return uzytkownikRepository.save(u);
    }
    public void changePassword(String login, ChangePasswordRequest req) {
        Uzytkownik u = getUserByLogin(login);

        if(!passwordEncoder.matches(req.getOldPassword(), u.getHaslo()))
            throw new BadCredentialsException("Wrong password");

        u.setHaslo(passwordEncoder.encode(req.getNewPassword()));
        uzytkownikRepository.save(u);
    }
    public Uzytkownik adminUpdateUser(Long id, UpdateUserByAdminRequest req) {
        Uzytkownik u = getUserById(id);

        u.setImie(req.getImie());
        u.setNazwisko(req.getNazwisko());
        u.setEmail(req.getEmail());
        u.setNrTelefonu(req.getNrTelefonu());
//        u.setSzostka(req.get());

        return uzytkownikRepository.save(u);
    }
    public Uzytkownik changeParents(Long zuchId, Long parentId1, Long parentId2) {
        Uzytkownik zuch = getUserById(zuchId);

        if (zuch.getTypUzytkownika() != TypUzytkownika.ZUCH) {
            throw new IllegalArgumentException("User must be ZUCH");
        }

        Uzytkownik parent1 = null;
        Uzytkownik parent2 = null;

        if (parentId1 != null) {
            parent1 = getUserById(parentId1);
            if (parent1.getTypUzytkownika() != TypUzytkownika.RODZIC) {
                throw new IllegalArgumentException("Parent1 must be RODZIC");
            }
        }
        if (parentId2 != null) {
            parent2 = getUserById(parentId2);
            if (parent2.getTypUzytkownika() != TypUzytkownika.RODZIC) {
                throw new IllegalArgumentException("Parent2 must be RODZIC");
            }
        }
        zuch.setRodzic1(parent1);
        zuch.setRodzic2(parent2);

        return uzytkownikRepository.save(zuch);
    }




    public Uzytkownik changeUserType(Long targetUserId, TypUzytkownika newType, Principal principal) {

        Uzytkownik admin = getUserByLogin(principal.getName());

        if (admin.getTypUzytkownika() != TypUzytkownika.DRUZYNOWY) {
            throw new SecurityException("tylko druzynowy moze zmieniac typ uzytkownika");
        }

        Uzytkownik target = getUserById(targetUserId);

        if (admin.getId().equals(target.getId())) {
            throw new IllegalArgumentException("nie mozesz zmienic swojej roli");
        }

        target.setTypUzytkownika(newType);
        return uzytkownikRepository.save(target);
    }





}

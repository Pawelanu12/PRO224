package api.szyszka.Controllers;

import api.szyszka.DTOs.User.*;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.UzytkownikMapper;
import api.szyszka.Services.JwtService;
import api.szyszka.Services.UzytkownikService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uzytkownicy")
public class UzytkownikController {

    private final UzytkownikService uzytkownikService;
    private final JwtService jwtService;


    public UzytkownikController(UzytkownikService uzytkownikService, JwtService jwtService) {
        this.uzytkownikService = uzytkownikService;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH','DEFAULT')")
    public ResponseEntity<UzytkownikDto> me(@AuthenticationPrincipal User user) {
        System.out.println(user.toString());
        return ResponseEntity.ok(UzytkownikMapper.toDto(uzytkownikService.getCurrentUser(user.getUsername())));
    }
    // CREATE
    @PreAuthorize("hasAnyRole('DRUZYNOWY')")
    @PostMapping
    public ResponseEntity<UzytkownikDto> createUser(@RequestBody CreateUzytkownikRequest request) {
        Uzytkownik user = UzytkownikMapper.fromCreateRequest(request);
        Uzytkownik saved = uzytkownikService.createUser(user);

        return ResponseEntity
                .created(URI.create("/api/uzytkownicy/" + saved.getId()))
                .body(UzytkownikMapper.toDto(saved));
    }
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    @GetMapping("/{id}")
    public ResponseEntity<UzytkownikDto> getUserById(@PathVariable Long id) {
        Uzytkownik user = uzytkownikService.getUserById(id);
        return ResponseEntity.ok(UzytkownikMapper.toDto(user));
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getAllUsers() {
        List<UzytkownikDto> users = uzytkownikService.getAllUsers()
                .stream()
                .map(UzytkownikMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }
    @GetMapping("/children")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getChildren(
            @RequestParam(required = false) Long parentId1,
            @RequestParam(required = false) Long parentId2) {

        List<UzytkownikDto> children = uzytkownikService.getChildren(parentId1, parentId2)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();

        return ResponseEntity.ok(children);
    }
    @GetMapping("/parents/{id}")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getParents(@PathVariable Long id) {
        List<UzytkownikDto> parents = uzytkownikService.getParents(id)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();

        return ResponseEntity.ok(parents);
    }
    @GetMapping("/typ/{typ}")
    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getUsersByTyp(@PathVariable String typ) {
        List<UzytkownikDto> users = uzytkownikService.getUsersByType(typ)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/szostka/{szostkaId}")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<List<UzytkownikDto>> getUsersBySzostka(@PathVariable Long szostkaId){
        List<UzytkownikDto> users = uzytkownikService.getUsersBySzostka(szostkaId)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('DRUZYNOWY')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        uzytkownikService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UzytkownikDto> updateMe(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateMyProfileRequest req,
            HttpServletResponse response) {

        Uzytkownik updated = uzytkownikService.updateMyProfile(user.getUsername(), req);
        if (!user.getUsername().equals(updated.getLogin())) {
            String token = jwtService.generateToken(updated.getLogin());
            ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("None")
                    .maxAge(Duration.ofMinutes(60))
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }
        return ResponseEntity.ok(UzytkownikMapper.toDto(updated));
    }
    @PutMapping("/me/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @RequestBody ChangePasswordRequest req) {

        uzytkownikService.changePassword(user.getUsername(), req);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<UzytkownikDto> adminUpdateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserByAdminRequest req) {

        Uzytkownik u = uzytkownikService.adminUpdateUser(id, req);
        return ResponseEntity.ok(UzytkownikMapper.toDto(u));
    }
    @PutMapping("/{id}/type")
    @PreAuthorize("hasRole('DRUZYNOWY')")
    public ResponseEntity<UzytkownikDto> changeUserType(
            @PathVariable Long id,
            @RequestParam TypUzytkownika newType,
            Principal principal) {

        Uzytkownik updated = uzytkownikService.changeUserType(id, newType, principal);
        return ResponseEntity.ok(UzytkownikMapper.toDto(updated));
    }
    @PutMapping("/{id}/parents")
    @PreAuthorize("hasRole('DRUZYNOWY')")
    public ResponseEntity<UzytkownikDto> changeParents(
            @PathVariable Long id,
            @RequestBody ChangeParentsRequest req) {

        Uzytkownik updated = uzytkownikService.changeParents(id, req.getParentId1(), req.getParentId2());
        return ResponseEntity.ok(UzytkownikMapper.toDto(updated));
    }










}

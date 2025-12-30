package api.szyszka.Controllers;

import api.szyszka.DTOs.Auth.AuthResponse;
import api.szyszka.DTOs.Auth.GoogleAuthRequest;
import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.GoogleUserData;
import api.szyszka.Security.GoogleTokenVerifier;
import api.szyszka.Services.UzytkownikService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UzytkownikService userService;
    private final GoogleTokenVerifier googleTokenVerifier;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        userService.register(req);
        return ResponseEntity.ok().body("{\"message\":\"User registered successfully\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(userService.login(req));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {

        GoogleUserData googleUser = googleTokenVerifier.verify(request.getIdToken());
        AuthResponse response = userService.loginWithGoogle(googleUser);

        return ResponseEntity.ok(response);
    }
}


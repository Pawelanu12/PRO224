package api.szyszka.Controllers;

import api.szyszka.DTOs.Auth.AuthResponse;
import api.szyszka.DTOs.Auth.GoogleAuthRequest;
import api.szyszka.DTOs.Auth.LoginRequest;
import api.szyszka.DTOs.Auth.RegisterRequest;
import api.szyszka.DTOs.GoogleUserData;
import api.szyszka.Security.GoogleTokenVerifier;
import api.szyszka.Services.UzytkownikService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest req,
            HttpServletResponse response
    ) {
        String token = userService.login(req);

        ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(Duration.ofMinutes(60))
                .build();
        System.out.println(cookie);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/google")
    public ResponseEntity<?>  googleLogin(@RequestBody GoogleAuthRequest request, HttpServletResponse response) {
        GoogleUserData googleUser = googleTokenVerifier.verify(request.getIdToken());
        String token = userService.loginWithGoogle(googleUser);
//        System.out.println(token);

        Cookie servletCookie = new Cookie("accessToken", token);
        servletCookie.setHttpOnly(true);
        servletCookie.setSecure(false); // dev
        servletCookie.setPath("/");
        servletCookie.setMaxAge(60 * 60); // 1 godzina
        response.addCookie(servletCookie);

        return ResponseEntity.ok().build();
    }
}


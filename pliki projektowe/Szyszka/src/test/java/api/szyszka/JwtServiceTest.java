package api.szyszka;

import api.szyszka.Services.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setup() {
        jwtService = new JwtService();

        // 256-bit base64 secret
        ReflectionTestUtils.setField(
                jwtService,
                "secretBase64",
                "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY="
        );
        ReflectionTestUtils.setField(
                jwtService,
                "expirationMs",
                60_000L
        );
    }

    @Test
    void shouldGenerateToken() {
        String token = jwtService.generateToken("login");

        assertThat(token).isNotBlank();
    }

    @Test
    void shouldExtractUsernameFromToken() {
        String token = jwtService.generateToken("login");

        String username = jwtService.extractUsername(token);

        assertThat(username).isEqualTo("login");
    }

    @Test
    void shouldValidateCorrectToken() {
        String token = jwtService.generateToken("login");

        boolean valid = jwtService.isTokenValid(token);

        assertThat(valid).isTrue();
    }

    @Test
    void shouldRejectInvalidToken() {
        boolean valid = jwtService.isTokenValid("invalid.token.value");

        assertThat(valid).isFalse();
    }
}
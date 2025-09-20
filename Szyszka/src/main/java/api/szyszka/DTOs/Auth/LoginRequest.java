package api.szyszka.DTOs.Auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String login;
    private String haslo;
}
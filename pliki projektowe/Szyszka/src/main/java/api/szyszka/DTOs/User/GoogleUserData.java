package api.szyszka.DTOs.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GoogleUserData {
    private String googleId;
    private String email;
    private String imie;
    private String nazwisko;
}

package api.szyszka.DTOs.Sprawnosci;

import api.szyszka.Entities.TypSprawnosci;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSprawnoscRequest {
    private String nazwa;
    private String opis;
    private String opisWymagan;
    private String ikona;
    private TypSprawnosci typ;
}

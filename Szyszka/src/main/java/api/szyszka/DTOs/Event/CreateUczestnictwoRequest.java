package api.szyszka.DTOs.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUczestnictwoRequest {
    private boolean uczestnictwo;
    private Long uzytkownikId;
    private Long wydarzenieId;
}

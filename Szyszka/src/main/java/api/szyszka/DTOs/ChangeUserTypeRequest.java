package api.szyszka.DTOs;

import api.szyszka.Entities.TypUzytkownika;
import lombok.Data;

@Data
public class ChangeUserTypeRequest {
    private TypUzytkownika nowaRola;
}

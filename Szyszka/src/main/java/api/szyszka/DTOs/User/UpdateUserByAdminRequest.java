package api.szyszka.DTOs.User;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserByAdminRequest {
    private String imie;
    private String nazwisko;
    private String email;
    private String nrTelefonu;
    private Long squadId;
    private Long rodzicId1;
    private Long rodzicId2;
}

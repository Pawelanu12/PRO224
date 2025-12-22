package api.szyszka.DTOs;

import lombok.Data;

@Data
public class ParticipantAddRemoveDto {
    private Long czatId;
    private Long uzytkownikId;
    private String type; // ADD / REMOVE
}


package api.szyszka.DTOs;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SprawnoscDto {
    private long id;
    private String nazwa;
    private String opis;
    private String opisWymagan;
    private String ikona;
    private String ikonaUrl;
}

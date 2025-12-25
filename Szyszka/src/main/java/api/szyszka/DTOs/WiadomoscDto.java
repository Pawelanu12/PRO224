package api.szyszka.DTOs;

import lombok.*;

import java.time.LocalDateTime;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WiadomoscDto {
    private Long id;
    private Long czatId;
    private String nadawca;
    private String tresc;
    private LocalDateTime dataWyslania;
}

package api.szyszka.DTOs.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class    UpdateWydarzenieRequest {
    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;
    private String opis;
    private List<MultipartFile> noweZdjecia;
    private List<String> zdjeciaDoUsuniecia;//po nazwie
}

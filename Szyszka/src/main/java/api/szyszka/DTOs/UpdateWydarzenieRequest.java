package api.szyszka.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class UpdateWydarzenieRequest {
    private String nazwa;
    private LocalDate dataWyjazdu;
    private LocalDate dataZakonczenia;
    private String opis;
    private List<MultipartFile> noweZdjecia;
    private List<Long> zdjeciaDoUsuniecia;
}

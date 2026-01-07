package api.szyszka.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSprawnoscRequest {
    private String nazwa;
    private String opis;
    private String opisWymagan;
    private MultipartFile ikona;
}

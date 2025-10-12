package api.szyszka.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CreateKomentarzRequest {
    private LocalDateTime dataStwprzenia;
    private String tresc;
    private Long postId;
    private Long autorId;
}

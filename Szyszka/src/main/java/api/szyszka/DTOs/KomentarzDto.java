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
public class KomentarzDto {
    private Long id;
    private LocalDateTime dataStworzenia;
    private String tresc;
    private Long postId;
    private Long autorId;
}

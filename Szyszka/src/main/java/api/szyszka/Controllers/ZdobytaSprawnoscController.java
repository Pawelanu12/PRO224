package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateZdobytaSprawnoscRequest;
import api.szyszka.DTOs.ZdobytaSprawnoscDto;
import api.szyszka.Entities.ZdobytaSprawnosc;
import api.szyszka.Mappers.ZdobytaSprawnoscMapper;
import api.szyszka.Services.ZdobytaSprawnoscService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/zdobytaSprawnosc")
public class ZdobytaSprawnoscController {
    private ZdobytaSprawnoscService zdobytaSprawnoscService;

    public ZdobytaSprawnoscController(ZdobytaSprawnoscService zdobytaSprawnoscServiceservice) {
        this.zdobytaSprawnoscService = zdobytaSprawnoscService;
    }

    @PostMapping
    public ResponseEntity<ZdobytaSprawnoscDto> createWydarzenie(@RequestBody CreateZdobytaSprawnoscRequest request) {
        ZdobytaSprawnosc saved = zdobytaSprawnoscService.createZdobytaSprawnosc(request);

        return ResponseEntity
                .created(URI.create("/api/zdobytaSprawnosc/" + saved.getId()))
                .body(ZdobytaSprawnoscMapper.toDto(saved));
    }
}

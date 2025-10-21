package api.szyszka.Services;

import api.szyszka.DTOs.CreateZdobytaSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.ZdobytaSprawnosc;
import api.szyszka.Mappers.ZdobytaSprawnoscMapper;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import api.szyszka.Repositories.ZdobytaSprawnoscRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ZdobytaSprawnoscService {
    private final ZdobytaSprawnoscRepository zdobytaSprawnoscRepository;
    private final UzytkownikRepository uzytkownikRepository;
    private final SprawnoscRepository sprawnoscRepository;
    private final WydarzenieRepository wydarzenieRepository;

    public ZdobytaSprawnoscService(ZdobytaSprawnoscRepository zdobytaSprawnoscRepository,
                                   UzytkownikRepository uzytkownikRepository, SprawnoscRepository sprawnoscRepository, WydarzenieRepository wydarzenieRepository) {
        this.zdobytaSprawnoscRepository = zdobytaSprawnoscRepository;
        this.uzytkownikRepository = uzytkownikRepository;
        this.sprawnoscRepository = sprawnoscRepository;
        this.wydarzenieRepository = wydarzenieRepository;
    }

    public ZdobytaSprawnosc createZdobytaSprawnosc(CreateZdobytaSprawnoscRequest request) {
        ZdobytaSprawnosc zdobytaSprawnosc = ZdobytaSprawnoscMapper.fromCreateRequest(request);

        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
                .orElseThrow(() -> new NoSuchElementException("uzytkownik nie znaleziony"));
        zdobytaSprawnosc.setUzytkownik(uzytkownik);
        Sprawnosc sprawnosc = sprawnoscRepository.findById(request.getSprawnoscId())
                .orElseThrow(() -> new NoSuchElementException("sprawnosc nie znaleziona"));
        zdobytaSprawnosc.setSprawnosc(sprawnosc);

        return zdobytaSprawnoscRepository.save(zdobytaSprawnosc);
    }

    public List<ZdobytaSprawnosc> getAllZdobytaSprawnosc() {return zdobytaSprawnoscRepository.findAll();}

    public List<ZdobytaSprawnosc> getAllZdobytaSprawnoscBySprawnoscId(Long sprawnoscId) {
        return zdobytaSprawnoscRepository.findBySprawnoscId(sprawnoscId);
    }

    public List<ZdobytaSprawnosc> getAllZdobytaSprawnoscByUzytkownikId(Long uzytkownikId) {
        return zdobytaSprawnoscRepository.findByUzytkownikId(uzytkownikId);
    }

    public ZdobytaSprawnosc getZdobytaSprawnoscById(Long id) {return zdobytaSprawnoscRepository.findById(id).get();}

    public void deleteZdobytaSprawnoscById(Long id) {zdobytaSprawnoscRepository.deleteById(id);}

    public ZdobytaSprawnosc modifyZdobytaSprawnosc(Long id, ZdobytaSprawnosc updateZdobytaSprawnosc) {
        ZdobytaSprawnosc oldZdobytaSprawnosc = getZdobytaSprawnoscById(id);

        if (oldZdobytaSprawnosc == null) {
            throw new NoSuchElementException("ZdobytaSprawnosc nie znaleziona");
        }

        oldZdobytaSprawnosc.setDataZdobyciaSprawnosci(updateZdobytaSprawnosc.getDataZdobyciaSprawnosci());

        oldZdobytaSprawnosc.setUzytkownik(updateZdobytaSprawnosc.getUzytkownik());

        oldZdobytaSprawnosc.setSprawnosc(updateZdobytaSprawnosc.getSprawnosc());



        return zdobytaSprawnoscRepository.save(oldZdobytaSprawnosc);
    }
}

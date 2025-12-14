package api.szyszka.Services;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Entities.WydarzenieZdjecie;
import api.szyszka.Mappers.WydarzenieMapper;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class WydarzenieService {

    private final WydarzenieRepository wydarzenieRepository;
    private final UzytkownikRepository uzytkownikRepository;

    public WydarzenieService(WydarzenieRepository wydarzenieRepository,
                             UzytkownikRepository uzytkownikRepository) {
        this.wydarzenieRepository = wydarzenieRepository;
        this.uzytkownikRepository = uzytkownikRepository;
    }


    private WydarzenieZdjecie saveFileForEvent(MultipartFile file, Wydarzenie wydarzenie) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            WydarzenieZdjecie zdj = new WydarzenieZdjecie();
            zdj.setSciezka(fileName);
            zdj.setWydarzenie(wydarzenie);

            return zdj;

        } catch (Exception e) {
            throw new RuntimeException("Nie udało się zapisać pliku: " + e.getMessage(), e);
        }
    }

    public Wydarzenie createWydarzenieWithPhotos(CreateWydarzenieRequest request,
                                                 List<MultipartFile> files) {

        Wydarzenie wydarzenie = WydarzenieMapper.fromCreateRequest(request);

        Uzytkownik organizator = uzytkownikRepository.findById(request.getOrganizatorId())
                .orElseThrow(() -> new NoSuchElementException("Organizator nie znaleziony"));

        wydarzenie.setOrganizator(organizator);
        wydarzenie.setZdjecia(new ArrayList<>());

//        wydarzenieRepository.save(wydarzenie);

        if (files != null && !files.isEmpty()) {

//            List<WydarzenieZdjecie> zdjecia = new ArrayList<>();

            for (MultipartFile file : files) {
                WydarzenieZdjecie zdj = saveFileForEvent(file, wydarzenie);
                wydarzenie.getZdjecia().add(zdj);
            }

//            wydarzenie.setZdjecia(zdjecia);
        }

        return wydarzenieRepository.save(wydarzenie);
    }

    public Wydarzenie addZdjecieToEvent(Long wydarzenieId, MultipartFile file) {
        Wydarzenie wydarzenie = wydarzenieRepository.findById(wydarzenieId)
                .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione"));

        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            WydarzenieZdjecie zdj = new WydarzenieZdjecie();
            zdj.setSciezka(fileName);
            zdj.setWydarzenie(wydarzenie);

            if (wydarzenie.getZdjecia() == null) {
                wydarzenie.setZdjecia(new ArrayList<>());
            }
            wydarzenie.getZdjecia().add(zdj);

            return wydarzenieRepository.save(wydarzenie);

        } catch (IOException e) {
            throw new RuntimeException("Nie udało się zapisać pliku: " + e.getMessage(), e);
        }
    }


    public List<Wydarzenie> getAllWydarzenia() {
        return wydarzenieRepository.findAll();
    }

    public Wydarzenie getWydarzenieById(long id) {
        return wydarzenieRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione"));
    }


    public void deleteWydarzenie(long id) {
        wydarzenieRepository.deleteById(id);
    }

    @Transactional
    public Wydarzenie modifyWydarzenie(Long id, UpdateWydarzenieRequest request) {

        Wydarzenie wydarzenie = getWydarzenieById(id);

// EDYCJA TREŚCI
        wydarzenie.setNazwa(request.getNazwa());

        if (request.getDataWyjazdu() != null) {
            wydarzenie.setDataWyjazdu(
                    request.getDataWyjazdu().atStartOfDay()
            );
        }
        if (request.getDataZakonczenia() != null) {
            wydarzenie.setDataZakonczenia(
                    request.getDataZakonczenia().atTime(LocalTime.MAX)
            );
        }
        wydarzenie.setOpis(request.getOpis());

        //ZABEZPIECZENIE LISTY ZDJĘĆ
        if (wydarzenie.getZdjecia() == null) {
            wydarzenie.setZdjecia(new ArrayList<>());
        }

        //USUWANIE ZDJĘĆ
        if (request.getZdjeciaDoUsuniecia() != null) {
            wydarzenie.getZdjecia().removeIf(zdjecie -> {
                if (request.getZdjeciaDoUsuniecia().contains(zdjecie.getId())) {
                    usunPlikZDisku(zdjecie.getSciezka());
                    return true;
                }
                return false;
            });
        }

        //DODAWANIE NOWYCH ZDJĘĆ
        if (request.getNoweZdjecia() != null) {
            for (MultipartFile file : request.getNoweZdjecia()) {
                WydarzenieZdjecie zdjecie = saveFileForEvent(file, wydarzenie);
                wydarzenie.getZdjecia().add(zdjecie);
            }
        }

        return wydarzenieRepository.save(wydarzenie);
    }


    public Wydarzenie getWydarzenieByNazwa(String nazwa) {
        return wydarzenieRepository.findByNazwa(nazwa)
                .orElseThrow(() -> new NoSuchElementException("Wydarzenie nie znalezione o nazwie: " + nazwa));
    }
    private void usunPlikZDisku(String sciezka) {
        try {
            Files.deleteIfExists(Paths.get("uploads", sciezka));
        } catch (IOException e) {
            throw new RuntimeException("Nie udało się usunąć pliku: " + sciezka, e);
        }
    }



}

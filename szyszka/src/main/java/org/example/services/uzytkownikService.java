package org.example.services;
//import ...
import org.springframework.stereotype.Service;

@Service
public class uzytkownikService {

    private UzytkownikRepository uzytkownikRepository;

    public uzytkownikService(UzytkonikRepository uzytkownikRepository)
    {
        this.UztkownikRepository = uzytkownikRepository;
    }

    public Uzytkownik findUzytkownikByName(String name) {
        
    }


}

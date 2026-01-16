package api.szyszka;

import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Exceptions.DuplicateNazwaSprawnosciException;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.SprawnoscService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import api.szyszka.Entities.TypSprawnosci;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SprawnoscServiceTest {

    @Mock
    private SprawnoscRepository sprawnoscRepository;

    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @InjectMocks
    private SprawnoscService sprawnoscService;

    // ========= createSprawnosc =========
    @Test
    void shouldCreateSprawnosc() {
        Sprawnosc sprawnosc = new Sprawnosc();
        sprawnosc.setNazwa("Test");
        sprawnosc.setTyp(TypSprawnosci.CZERWONE);

        when(sprawnoscRepository.save(sprawnosc))
                .thenReturn(sprawnosc);

        Sprawnosc result = sprawnoscService.createSprawnosc(sprawnosc);

        assertThat(result).isNotNull();
        assertThat(result.getTyp()).isEqualTo(TypSprawnosci.CZERWONE);
        verify(sprawnoscRepository).save(sprawnosc);
    }


    // ========= getSprawnoscById =========
    @Test
    void shouldReturnSprawnoscById() {
        Sprawnosc sprawnosc = new Sprawnosc();
        sprawnosc.setId(1L);

        when(sprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(sprawnosc));

        Sprawnosc result = sprawnoscService.getSprawnoscById(1L);

        assertThat(result).isEqualTo(sprawnosc);
    }

    // ========= getAllSprawnosc =========
    @Test
    void shouldReturnAllSprawnosci() {
        when(sprawnoscRepository.findAll())
                .thenReturn(List.of(new Sprawnosc(), new Sprawnosc()));

        List<Sprawnosc> result = sprawnoscService.getAllSprawnosc();

        assertThat(result).hasSize(2);
    }

    // ========= deleteSprawnosc =========
    @Test
    void shouldDeleteSprawnosc() {
        sprawnoscService.deleteSprawnosc(1L);

        verify(sprawnoscRepository).deleteById(1L);
    }

    // ========= modifySprawnoscById =========
    @Test
    void shouldModifySprawnoscWhenNameSame() {
        Sprawnosc oldSprawnosc = new Sprawnosc();
        oldSprawnosc.setId(1L);
        oldSprawnosc.setNazwa("Test");
        oldSprawnosc.setTyp(TypSprawnosci.ZOLTE); // dodaj typ

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("Test");
        update.setTyp(TypSprawnosci.ZOLTE); // też typ

        when(sprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(oldSprawnosc));
        when(sprawnoscRepository.save(oldSprawnosc))
                .thenReturn(oldSprawnosc);

        Sprawnosc result = sprawnoscService.modifySprawnoscById(1L, update);

        assertThat(result).isNotNull();
        assertThat(result.getTyp()).isEqualTo(TypSprawnosci.ZOLTE); // sprawdzenie typu
        verify(sprawnoscRepository).save(oldSprawnosc);
    }


    @Test
    void shouldThrowDuplicateNazwaSprawnosciException() {
        Sprawnosc oldSprawnosc = new Sprawnosc();
        oldSprawnosc.setId(1L);
        oldSprawnosc.setNazwa("OLD");

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("NEW");

        // mockowanie findById i existsByNazwa
        when(sprawnoscRepository.findById(1L)).thenReturn(Optional.of(oldSprawnosc));
        when(sprawnoscRepository.existsByNazwa("NEW")).thenReturn(true);

        assertThatThrownBy(() ->
                sprawnoscService.modifySprawnoscById(1L, update)
        ).isInstanceOf(DuplicateNazwaSprawnosciException.class);
    }

}

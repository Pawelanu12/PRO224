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

        when(sprawnoscRepository.save(sprawnosc))
                .thenReturn(sprawnosc);

        Sprawnosc result = sprawnoscService.createSprawnosc(sprawnosc);

        assertThat(result).isNotNull();
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

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("Test");

        when(sprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(oldSprawnosc));
        when(sprawnoscRepository.save(oldSprawnosc))
                .thenReturn(oldSprawnosc);

        Sprawnosc result = sprawnoscService.modifySprawnoscById(1L, update);

        assertThat(result).isNotNull();
        verify(sprawnoscRepository).save(oldSprawnosc);
    }

    @Test
    void shouldThrowDuplicateNazwaSprawnosciException() {
        Sprawnosc oldSprawnosc = new Sprawnosc();
        oldSprawnosc.setId(1L);
        oldSprawnosc.setNazwa("OLD");

        Sprawnosc update = new Sprawnosc();
        update.setNazwa("NEW");

        when(sprawnoscRepository.findById(1L))
                .thenReturn(Optional.of(oldSprawnosc));

        assertThatThrownBy(() ->
                sprawnoscService.modifySprawnoscById(1L, update)
        ).isInstanceOf(DuplicateNazwaSprawnosciException.class);
    }
}

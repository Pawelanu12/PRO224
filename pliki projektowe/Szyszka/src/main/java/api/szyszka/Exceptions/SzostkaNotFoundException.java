package api.szyszka.Exceptions;

public class SzostkaNotFoundException extends RuntimeException {
    public SzostkaNotFoundException(Long szostkaId) {super("Szostka with id '" + szostkaId + "'not found");
    }
}

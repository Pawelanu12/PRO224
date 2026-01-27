package api.szyszka.Exceptions;

public class DuplicateSzostkaException extends RuntimeException {
    public DuplicateSzostkaException(String nazwa) {
        super("Szostka name '" + nazwa + "' is already taken.");
    }
}

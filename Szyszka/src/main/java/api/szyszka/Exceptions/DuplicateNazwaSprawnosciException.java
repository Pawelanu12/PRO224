package api.szyszka.Exceptions;

public class DuplicateNazwaSprawnosciException extends RuntimeException {
    public DuplicateNazwaSprawnosciException(String nazwa) {
      super("Sprawnosc name'" + nazwa + "' is already taken");
    }
}

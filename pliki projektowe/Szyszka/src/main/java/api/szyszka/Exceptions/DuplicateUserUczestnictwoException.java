package api.szyszka.Exceptions;

import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Entities.Uzytkownik;

public class DuplicateUserUczestnictwoException extends RuntimeException {
  public DuplicateUserUczestnictwoException(Uzytkownik uzytkownik) {
    super("Uczestnictwo for user '" + uzytkownik.getId() + "' is already taken.");
  }
}

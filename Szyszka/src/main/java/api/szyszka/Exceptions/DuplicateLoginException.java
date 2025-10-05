package api.szyszka.Exceptions;

public class DuplicateLoginException extends RuntimeException {
    public DuplicateLoginException(String login) {
        super("Login '" + login + "' is already taken.");
    }
}

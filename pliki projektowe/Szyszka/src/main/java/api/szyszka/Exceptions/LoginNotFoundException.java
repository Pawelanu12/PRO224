package api.szyszka.Exceptions;

public class LoginNotFoundException extends RuntimeException {
    public LoginNotFoundException(String login) {
        super("User with login '" + login + "' not found.");
    }
}

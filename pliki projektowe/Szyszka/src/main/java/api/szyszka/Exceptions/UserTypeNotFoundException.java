package api.szyszka.Exceptions;

public class UserTypeNotFoundException extends RuntimeException {
    public UserTypeNotFoundException(String typ) {
        super("No users found with type: " + typ);
    }
}

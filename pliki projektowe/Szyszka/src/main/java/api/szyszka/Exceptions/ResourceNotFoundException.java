package api.szyszka.Exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(Long id) {
        super(id + "' not found.");
    }
}


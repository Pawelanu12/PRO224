package org.example.exceptions;

public class WydarzenieNotFoundException extends RuntimeException {

    public WydarzenieNotFoundException(String message) {
        super(message);
    }

    public WydarzenieNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

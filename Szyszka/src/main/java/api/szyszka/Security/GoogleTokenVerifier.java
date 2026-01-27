package api.szyszka.Security;

import api.szyszka.DTOs.User.GoogleUserData;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class GoogleTokenVerifier {

    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier(
            @Value("${google.client-id}") String clientId
    ) throws Exception {

        this.verifier = new GoogleIdTokenVerifier.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public GoogleUserData verify(String idTokenString) {

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken == null) {
                throw new IllegalArgumentException("Invalid Google ID Token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();

            return new GoogleUserData(
                    payload.getSubject(),                 // googleId
                    payload.getEmail(),
                    (String) payload.get("given_name"),
                    (String) payload.get("family_name")
            );

        } catch (Exception e) {
            throw new IllegalArgumentException("Google token verification failed", e);
        }
    }
}

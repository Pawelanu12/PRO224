// components/GoogleLoginButton.js
import { useEffect } from "react";

export default function GoogleLoginButton() {
    useEffect(() => {
        if (!window.google) return;

        // 1️⃣ Inicjalizacja Google Identity Services
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        // 2️⃣ Render przycisku
        window.google.accounts.id.renderButton(
            document.getElementById("google-login"),
            { theme: "outline", size: "large" }
        );

        // 3️⃣ Opcjonalnie: auto prompt
        window.google.accounts.id.prompt();
    }, []);

    // 4️⃣ Callback po loginie
    const handleCredentialResponse = async (response) => {
        const idToken = response.credential; // ID Token od Google

        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ⭐ cookie HttpOnly
                body: JSON.stringify({ idToken }),
            });

            // fetch user info po ustawieniu cookie
            console.log("cat")
            // onLogin();
        } catch (err) {
            console.error("Google login failed", err);
        }
    };

    return <div id="google-login">sfafsa</div>;
}

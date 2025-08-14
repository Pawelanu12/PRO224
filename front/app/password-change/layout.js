import "../globals.css";
import SprawnoscProvider from "@/app/providers/SprawnoscProvider";
import PasswordChangeProvider from "@/app/providers/PasswordChangeProvider";
export default function RootLayout({ children }) {
    return (

        <PasswordChangeProvider>
            {children}
        </PasswordChangeProvider>

    );
}
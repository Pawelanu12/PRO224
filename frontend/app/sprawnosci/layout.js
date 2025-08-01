import "../globals.css";
import SprawnoscProvider from "@/app/providers/SprawnoscProvider";
export default function RootLayout({ children }) {
    return (

        <SprawnoscProvider>
            {children}
        </SprawnoscProvider>

    );
}
import "../globals.css";
import CzatProvider from "@/app/providers/CzatProvider";
export default function RootLayout({ children }) {
    return (

        <CzatProvider>
            {children}
        </CzatProvider>

    );
}
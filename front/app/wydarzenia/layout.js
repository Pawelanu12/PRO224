import "../globals.css";
// import "../wydarzenia.css";
import WydarzeniaProvider from "@/app/providers/WydarzeniaProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
export default function RootLayout({ children }) {
    return (

        <WydarzeniaProvider>
            {children}
        </WydarzeniaProvider>

    );
}
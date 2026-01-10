import "../globals.css";
// import "../wydarzenia.css";
import EventProvider from "@/app/providers/EventProvider";
import NavbarNiezarejestrowana from "@/app/navbar/NavbarNiezarejestrowana";
export default function RootLayout({ children }) {
    return (

        <EventProvider>
            {children}
        </EventProvider>

    );
}
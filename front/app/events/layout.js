import './event.css'
import EventProvider from "@/app/providers/EventProvider";
export default function RootLayout({ children }) {
    return (

        <EventProvider>
            {children}
        </EventProvider>

    );
}
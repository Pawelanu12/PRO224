import "../globals.css";
import "../sprawnosci/sprawnosci.css"
import AdminProvider from "@/app/providers/AdminProvider";
export default function RootLayout({ children }) {
    return (

        <AdminProvider>
            {children}
        </AdminProvider>

    );
}
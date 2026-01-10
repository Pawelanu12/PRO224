import "../globals.css";
import "@/app/achievements/sprawnosci.css"
import AdminProvider from "@/app/providers/AdminProvider";
export default function RootLayout({ children }) {
    return (

        <AdminProvider>
            {children}
        </AdminProvider>

    );
}
import "../globals.css";
import WydarzeniaProvider from "@/app/providers/WydarzeniaProvider";
export default function RootLayout({ children }) {
    return (

        <WydarzeniaProvider>
            {children}
        </WydarzeniaProvider>

    );
}
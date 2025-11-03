import "../globals.css";
import ForumProvider from "@/app/providers/ForumProvider";
import SprawnoscProvider from "@/app/providers/SprawnoscProvider";
export default function RootLayout({ children }) {
    return (

        <ForumProvider>
            <SprawnoscProvider>
                {children}
            </SprawnoscProvider>
        </ForumProvider>

    );
}
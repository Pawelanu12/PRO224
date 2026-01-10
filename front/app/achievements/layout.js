import "../globals.css";
import "./sprawnosci.css"
import AchievementProvider from "@/app/providers/AchievementProvider";
export default function RootLayout({ children }) {
    return (

        <AchievementProvider>
            {children}
        </AchievementProvider>

    );
}
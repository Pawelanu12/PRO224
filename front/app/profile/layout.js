import "../globals.css";
import "./profil.css";
import ForumProvider from "@/app/providers/ForumProvider";
import AchievementProvider from "@/app/providers/AchievementProvider";
export default function RootLayout({ children }) {
    return (

        <ForumProvider>
            <AchievementProvider>
                {children}
            </AchievementProvider>
        </ForumProvider>

    );
}
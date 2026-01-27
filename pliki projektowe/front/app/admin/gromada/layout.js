import AchievementProvider from "@/app/providers/AchievementProvider";
export default function RootLayout({ children }) {
    return (

        <AchievementProvider>
            {children}
        </AchievementProvider>

    );
}
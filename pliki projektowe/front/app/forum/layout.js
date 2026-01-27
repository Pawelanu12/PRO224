import ForumProvider from "@/app/providers/ForumProvider";
export default function RootLayout({ children }) {
    return (

        <ForumProvider>
            {children}
        </ForumProvider>

    );
}
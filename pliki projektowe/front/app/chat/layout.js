import ChatProvider from "@/app/providers/ChatProvider";
export default function RootLayout({ children }) {
    return (

        <ChatProvider>
            {children}
        </ChatProvider>

    );
}
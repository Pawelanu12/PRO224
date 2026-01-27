import PasswordChangeProvider from "@/app/providers/PasswordChangeProvider";
export default function RootLayout({ children }) {
    return (

        <PasswordChangeProvider>
            {children}
        </PasswordChangeProvider>

    );
}
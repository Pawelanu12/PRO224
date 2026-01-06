'use client'

import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navigation() {
    const { pushClick } = useContext(GlobalContext);
    const [menuOpen, setMenuOpen] = useState(false);


    const [isMobile, setIsMobile] = useState(false);

    // Sprawdzanie szerokości okna
    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 768);
        checkWidth(); // initial check
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);
    const buttons = [
        { label: "Moje posty", path: "/forum/moje-posty" },
        { label: "Strona główna", path: "/forum" },
        { label: "Obserwowani", path: "/forum/obserwowani" },
    ];

    // Widok mobilny - hamburger menu
    if (isMobile) {
        return (
            <div className="fixed top-[50px] left-0 w-full bg-[#3A4F39] z-10 px-4 py-2 flex justify-between items-center">
                <h2 className="text-white font-bold">Forum</h2>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
                </button>

                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#3A4F39] flex flex-col p-2 space-y-2">
                        {buttons.map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    pushClick(e, btn.path);
                                    setMenuOpen(false); // zamykamy menu po kliknięciu
                                }}
                                className="bg-[#405E3F] text-white px-3 py-2 rounded shadow"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Widok desktopowy
    return (
        <div className="forum-navigation flex flex-col md:flex-row md:space-x-2 fixed top-0 left-0 w-[250px] bg-[#3A4F39] h-full p-2">
            {buttons.map((btn, idx) => (
                <button
                    key={idx}
                    onClick={(e) => pushClick(e, btn.path)}
                    className="forum-navigation-redirection mb-2 bg-[#405E3F] text-white px-3 py-2 rounded shadow"
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}

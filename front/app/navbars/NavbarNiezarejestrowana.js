'use client'

import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import {FaSignOutAlt, FaBars, FaTimes, FaAddressCard, FaSignInAlt} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function NavbarZarejestrowana() {
    const { pushClick, logOut } = useContext(GlobalContext);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const buttons = [
        { label: "sprawnosci", img: "/images/navbar/sprawnosci_logo.png", path: "/sprawnosci" },
        { label: "wydarzenia", img: "/images/navbar/wydarzenia_logo.png", path: "/wydarzenia" },
        { label: "kontakt", img: "/images/navbar/kontakt_logo.png", path: "/kontakt" },
    ];

    const rightButtons = [
        { label: "log in",icon: <FaSignInAlt />, path: "/login" },
    ];

    // Widok przy małej wysokości
        return (
            <div>
                <nav className="fixed flex sm:hidden top-0 w-full bg-[#3A4F39] h-[50px] z-50 justify-between items-center px-5">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes className="text-white text-2xl"/> :
                            <FaBars className="text-white text-2xl"/>}
                    </button>
                    <button onClick={(e) => pushClick(e, "/")}>
                        <img src="/images/navbar/logo.png" className="h-8 w-8" alt=""/>
                    </button>
                    {/* Lista rozwijana */}
                    {menuOpen && (
                        <div
                            className="absolute top-[50px] left-0 w-full bg-[#3A4F39] flex flex-col space-y-2 p-2 z-40">
                            {buttons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                        pushClick(e, btn.path)
                                    }}
                                    className="flex items-center space-x-2 bg-[#405E3F] shadow-md px-2 py-1 w-full"
                                >
                                    {btn.img && <img src={btn.img} className="h-8 w-8" alt=""/>}
                                    {btn.icon &&
                                        <span className="h-8 w-8 flex items-center justify-center">{btn.icon}</span>}
                                    <span className="text-white">{btn.label}</span>
                                </button>
                            ))}
                            {rightButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                        btn.action ? btn.action() : pushClick(e, btn.path)
                                    }}
                                    className="flex items-center space-x-2 bg-[#405E3F] shadow-md px-2 py-1 w-full"
                                >
                                    {btn.icon &&
                                        <span className="h-8 w-8 flex items-center justify-center">{btn.icon}</span>}
                                    <span className="text-white">{btn.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </nav>

                {/*// Widok standardowy*/}
                <nav
                    className="hidden fixed top-0 w-full bg-[#3A4F39] h-[50px] z-50 sm:flex justify-between items-center overflow-x-auto overflow-y-hidden whitespace-nowrap px-5">
                    <div className="flex items-center space-x-2">
                        <button onClick={(e) => pushClick(e, "/")}>
                            <img src="/images/navbar/logo.png" className="h-8 w-12 flex-shrink-0" alt=""/>
                        </button>

                        {buttons.map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => pushClick(e, btn.path)}
                                className="flex items-center bg-[#405E3F] shadow-md px-2 py-1"
                            >
                                {btn.img && <img src={btn.img} className="h-8 w-12" alt=""/>}
                                {btn.icon &&
                                    <span className="h-8 w-8 flex items-center justify-center">{btn.icon}</span>}
                                <span className="ml-1 hidden lg:inline">{btn.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2">
                        {rightButtons.map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => btn.action ? btn.action() : pushClick(e, btn.path)}
                                className="flex items-center justify-center bg-[#405E3F] shadow-md px-2 py-1"
                            >
                                {btn.icon &&
                                    <span className="h-8 w-8 flex items-center justify-center">{btn.icon}</span>}
                                <span className="hidden lg:inline">{btn.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

            </div>)
}

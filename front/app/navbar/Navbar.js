'use client'

import { useContext, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import {FaSignOutAlt, FaBars, FaTimes, FaAddressCard, FaSignInAlt} from "react-icons/fa";
import {FaMessage, FaPerson} from "react-icons/fa6";

export default function Navbar() {
    const { pushClick, logOut,user } = useContext(GlobalContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const buttons = [
        { label: "sprawności", img: "/images/navbar/sprawnosci_logo.png", path: "/achievements" },
        { label: "wydarzenia", img: "/images/navbar/wydarzenia_logo.png", path: "/events" },
        { label: "kontakt", img: "/images/navbar/kontakt_logo.png", path: "/kontakt" },


    ];
    if(user &&user.login){
        buttons.push({ label: "forum", img: "/images/navbar/forum_logo.png", path: "/forum" })
        buttons.push({ label: "czat", icon: <FaMessage />, path: "/chat" })
    }

    const rightButtons =user&&user.login? [
        { label: "log out", icon: <FaSignOutAlt />, action: logOut },
        { label: "mój profil",icon: <FaAddressCard />, path: "/profile" },
    ]:[ { label: "log in",icon: <FaSignInAlt />, path: "/login" }];

    if(user&&(user.typUzytkownika==="DRUZYNOWY"||user.typUzytkownika==="Przyboczny"))
        buttons.push({ label: "gromada", icon: <FaPerson />, path: "/admin/gromada" })
    // Widok przy małej wysokości
    return (
        <div>
            <nav className="sm:hidden fixed top-0 w-full bg-[#3A4F39] h-[50px] z-50 flex justify-between items-center px-5">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes className="text-white text-2xl"/> : <FaBars className="text-white text-2xl"/>}
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
            <nav className="hidden fixed top-0 w-full bg-[#3A4F39] h-[50px] z-50 sm:flex justify-between items-center overflow-x-auto overflow-y-hidden whitespace-nowrap px-2">
                <div className="flex items-center space-x-2">
                    <button onClick={(e) => pushClick(e, "/")}>
                        <img src="/images/navbar/logo.png" className="h-8 w-10 flex-shrink-0" alt="" />
                    </button>

                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => pushClick(e, btn.path)}
                            className="flex items-center bg-[#405E3F] shadow-md px-[6px] py-1"
                        >
                            {btn.img && <img src={btn.img} className="h-8 w-10" alt="" />}
                            {btn.icon && <span className="h-8 w-8 flex items-center justify-center">{btn.icon}</span>}
                            <span className="ml-1 hidden lg:inline">{btn.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-1">
                    {rightButtons.map((btn, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => btn.action ? btn.action(e) : pushClick(e, btn.path)}
                            className="flex items-center justify-center bg-[#405E3F] shadow-md px-2 py-1"
                        >
                            {btn.icon && <span className="h-8 w-10 flex items-center justify-center">{btn.icon}</span>}
                            <span className="hidden lg:inline">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}

'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";

export default function NavbarZarejestrowana() {
    const {replaceClick,logOut} = useContext(GlobalContext)


    return <div className={"navbar"}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} >
            <button onClick={(e) => replaceClick(e, "/gromada")}>
                <img src={"/images/navbar/logo.png"} style={{height: "30px"}} alt={""}/>
            </button>
            <button onClick={(e) => replaceClick(e, "/sprawnosci")}>
                <p>
                    <img src={"/images/navbar/sprawnosci_logo.png"} alt={""}/>
                    sprawnosci</p></button>
            <button onClick={(e) => replaceClick(e, "/wydarzenia")}>
                <p>
                    <img src={"/images/navbar/wydarzenia_logo.png"} alt={""}/>
                    wydarzenia</p></button>
            <button onClick={(e) => replaceClick(e, "/kontakt")}>
                <p>
                    <img src={"/images/navbar/kontakt_logo.png"} alt={""}/>
                    kontakt</p></button>

            <button onClick={(e) => replaceClick(e, "/forum")}>
                <p>
                    <img src={"/images/navbar/forum_logo.png"} alt={""}/>
                    forum</p></button>
            <button onClick={(e) => replaceClick(e, "/czat")}>
                <p>
                    <FaMessage style={{marginRight: "10px",marginTop:"5px"}}/>
                    czat</p></button>
        </div>
        <div style={{display: "flex", justifyContent: "end"}}>
            <button onClick={(e) => logOut()} style={{
                display: "flex",
                alignItems: "center",
            }}>
                <p>

                    <FaSignOutAlt style={{marginRight: "10px",marginTop:"5px"}}/>
                    log out</p></button>

            <button onClick={(e) => replaceClick(e, "/profil")}
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p>

                    mój profil</p></button>
        </div>
    </div>
}
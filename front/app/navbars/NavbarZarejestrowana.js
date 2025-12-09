'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function NavbarZarejestrowana() {
    const {replaceClick,logOut} = useContext(GlobalContext)


    return <div className={"navbar"}>
        <div>
            <button onClick={(e) => replaceClick(e, "/gromada")} style={{marginTop: "-50px"}}>
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
                    <img src={"/images/navbar/czat_logo.png"} alt={""}/>
                    czat</p></button>
        </div>
        <div>
            <button onClick={(e) => logOut()}>
                <p>wyloguj</p></button>
            <button onClick={(e) => replaceClick(e, "/profil")}>
            <p>moj profil</p></button>
    </div>
</div>
}
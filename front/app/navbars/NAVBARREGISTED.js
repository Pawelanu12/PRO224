'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function NAVBARREGISTED() {
    const {replaceClick,logOut} = useContext(GlobalContext)


    return <div className={"navbar"}>
        <div>
            <button onClick={(e) => replaceClick(e, "/sprawnosci")}>sprawnosci</button>
            <button onClick={(e) => replaceClick(e, "/wydarzenia")}>wydarzenia</button>
            <button onClick={(e) => replaceClick(e, "/kontakt")}>kontakt</button>
            <button onClick={(e) => replaceClick(e, "/gromada")}>gromada</button>
            <button onClick={(e) => replaceClick(e, "/forum")}>forum</button>
            <button onClick={(e) => replaceClick(e, "/czat")}>czat</button>
        </div>
        <div>
            <button onClick={(e) => logOut()}>wyloguj</button>
            <button onClick={(e) => replaceClick(e, "/profil")}>moj profil</button>
        </div>
    </div>
}
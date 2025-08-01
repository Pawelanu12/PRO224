'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function NAVBARUNREGISTED() {
    const {replaceClick} = useContext(GlobalContext)


    return <div className={"navbar"}>
        <div>
            <button onClick={(e)=>replaceClick(e,"/sprawnosci")}>sprawnosci</button>
            <button onClick={(e)=>replaceClick(e,"/wydarzenia")}>wydarzenia</button>
            <button onClick={(e)=>replaceClick(e,"/kontakt")}>kontakt</button>
            <button onClick={(e)=>replaceClick(e,"/gromada")}>gromada</button>
        </div>
        <div>
            <button onClick={(e)=>replaceClick(e,"/login")}>login</button>
        </div>
    </div>
}
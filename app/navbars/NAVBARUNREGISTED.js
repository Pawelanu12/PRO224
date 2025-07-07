'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function NAVBARUNREGISTED() {
    const {router,pushClick} = useContext(GlobalContext)

    // const pushClick=(e,href)=>{
    //     e.preventDefault()
    //     router.replace(href)
    // }
    return <div className={"navbar"}>
        <div>
            <button onClick={(e)=>pushClick(e,"sprawnosci")}>sprawnosci</button>
            <button onClick={(e)=>pushClick(e,"wydarzenia")}>wydarzenia</button>
            <button onClick={(e)=>pushClick(e,"kontakt")}>kontakt</button>
            <button onClick={(e)=>pushClick(e,"/gromada")}>gromada</button>
        </div>
        <div>
            <button onClick={(e)=>pushClick(e,"/login")}>login</button>
        </div>
    </div>
}
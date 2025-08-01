'use client'

import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import WYSYLANIEKODU from "@/app/passwordChange/WYSYLANIEKODU";
import POTWERDZENIEKODU from "@/app/passwordChange/POTWERDZENIEKODU";
import ZMIANAHASLA from "@/app/passwordChange/ZMIANAHASLA";

export default function PASSWORDCHANGE() {
    const {etap,setEtap} = useContext(GlobalContext);

    useEffect(() => {
        setEtap("email");
    },[])

    return <div>
        <NAVBARUNREGISTED/>
        <div className={'forma'}>
            {etap==='email'&& <WYSYLANIEKODU/>}
            {etap==='kod'&& <POTWERDZENIEKODU/>}
            {etap==='haslo'&& <ZMIANAHASLA/>}
        </div>

    </div>
}
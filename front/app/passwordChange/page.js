'use client'

import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import {useContext, useEffect, useState} from "react";
import WYSYLANIEKODU from "@/app/passwordChange/WYSYLANIEKODU";
import POTWERDZENIEKODU from "@/app/passwordChange/POTWERDZENIEKODU";
import ZMIANAHASLA from "@/app/passwordChange/ZMIANAHASLA";
import {PasswordChangeContext} from "@/app/providers/PasswordChangeProvider";

export default function PASSWORDCHANGE() {
    const {etap,setEtap,setEmail,setKod} = useContext(PasswordChangeContext);

    useEffect(() => {
        setEtap("email");
        setEmail('');
        setKod("");
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
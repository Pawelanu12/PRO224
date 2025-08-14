'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {useContext, useEffect, useState} from "react";
import WysylanieKodu from "@/app/password-change/WysylanieKodu";
import PotwierdzenieKodu from "@/app/password-change/PotwierdzenieKodu";
import ZmianaHasla from "@/app/password-change/ZmianaHasla";
import {PasswordChangeContext} from "@/app/providers/PasswordChangeProvider";

export default function PasswordChange() {
    const {etap,setEtap,setEmail,setKod} = useContext(PasswordChangeContext);

    useEffect(() => {
        setEtap("email");
        setEmail('');
        setKod("");
    },[])

    return <div>
        <NavbarZarejestrowana/>
        <div className={'forma'}>
            {etap==='email'&& <WysylanieKodu/>}
            {etap==='kod'&& <PotwierdzenieKodu/>}
            {etap==='haslo'&& <ZmianaHasla/>}
        </div>

    </div>
}
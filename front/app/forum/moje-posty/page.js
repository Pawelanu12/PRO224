'use client'

import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import Navigation from "@/app/forum/Navigation";
import Posty from "@/app/forum/Posty";

export default function MOJEPOSTY()
{
    return(
        <div>
            <NavbarNiezarejestrowana/>
            <Navigation/>
            <Posty wszystkie={false}/>

        </div>

    )
}
'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import Navigation from "@/app/forum/Navigation";
import Posty from "@/app/forum/Posty";

export default function MOJEPOSTY()
{
    return(
        <div>
            <NavbarZarejestrowana/>
            <Navigation/>
            <Posty wszystkie={false}/>

        </div>

    )
}
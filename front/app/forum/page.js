'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import Navigation from "@/app/forum/Navigation";
import Posty from "@/app/forum/Posty";

export default function Forum(){

    return(
        <div>
            <NavbarZarejestrowana/>
<Navigation/>
            <Posty/>
        </div>

    )
}
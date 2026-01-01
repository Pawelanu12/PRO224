'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import Navigation from "@/app/forum/Navigation";
import Posty from "@/app/forum/Posty";
import {useEffect, useState} from "react";

export default function Forum(){

    return(
        <div>
            <Navigation  />
            <Posty/>
        </div>

    )
}
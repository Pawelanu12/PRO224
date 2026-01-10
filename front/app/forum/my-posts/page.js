'use client'

import NavbarZarejestrowana from "@/app/navbar/NavbarZarejestrowana";
import Navigation from "@/app/forum/Navigation";
import Posts from "@/app/forum/Posts";

export default function MOJEPOSTY()
{
    return(
        <div>
            <Navigation/>
            <Posts wszystkie={false}/>

        </div>

    )
}
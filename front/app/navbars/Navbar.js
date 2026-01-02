'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function  Navbar() {
    const {user}=useContext(GlobalContext)

    return user&&user.login?<NavbarZarejestrowana/>:<NavbarNiezarejestrowana/>

}
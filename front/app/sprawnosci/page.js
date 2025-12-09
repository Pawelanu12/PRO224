'use client'

import {useContext, useEffect} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import Sprawnosc from "@/app/sprawnosci/Sprawnosc";
import Filter from "@/app/sprawnosci/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import WyswetlSprawnosci from "@/app/sprawnosci/WyswetlSprawnosci";

export default function Sprawnosci(){

    const {replaceClick}=useContext(GlobalContext)


        return(

            <div  className={"sprawnosci-page"}>
                <Filter/>
                <button
                        onClick={(e)=>replaceClick
                        (e,"/admin/add/sprawnosc")}>Dodaj nowa sprawnosc</button>
           <WyswetlSprawnosci/>
            </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",


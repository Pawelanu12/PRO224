'use client'

import {useContext, useEffect} from "react";
import Filter from "@/app/sprawnosci/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import WyswetlSprawnosci from "@/app/sprawnosci/WyswetlSprawnosci";

export default function Sprawnosci(){

    const {pushClick}=useContext(GlobalContext)


        return(

            <div  className={" border-[2px] border-solid border-white;"}>
                <Filter/>
                <button
                        onClick={(e)=>pushClick
                        (e,"/admin/add/sprawnosc")}>Dodaj nowa sprawnosc</button>
           <WyswetlSprawnosci/>
            </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",


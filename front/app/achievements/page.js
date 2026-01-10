'use client'

import {useContext, useEffect} from "react";
import Filter from "@/app/achievements/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import ShowAchievements from "@/app/achievements/ShowAchievements";

export default function Sprawnosci(){

    const {pushClick}=useContext(GlobalContext)


        return(

            <div  className={" border-[2px] border-solid border-white;"}>
                <Filter/>
                <button
                        onClick={(e)=>pushClick
                        (e,"/admin/add/achievement")}>Dodaj nowa sprawnosc</button>
           <ShowAchievements/>
            </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",


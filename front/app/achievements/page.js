'use client'

import {useContext} from "react";
import Filter from "@/app/achievements/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import ShowAchievements from "@/app/achievements/ShowAchievements";

export default function Sprawnosci(){

    const {pushClick,user}=useContext(GlobalContext)


        return(

            <div  className={" border-[2px] border-solid border-white;"}>
                <Filter/>
                {user?.typUzytkownika==="DRUZYNOWY"&&<button
                    className={"mt-2 mx-4 rounded-md border border-white py-2 text-white hover:bg-white hover:text-black transition"}
                    onClick={(e) => pushClick
                    (e, "/admin/add/achievement")}>Dodaj nowa sprawnosc</button>}
           <ShowAchievements/>
            </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",


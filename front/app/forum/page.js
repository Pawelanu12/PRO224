'use client'

import NAVBARREGISTED from "@/app/navbars/NAVBARREGISTED";
import NAVIGATION from "@/app/forum/NAVIGATION";
import WSZYSTKIEPOSTY from "@/app/forum/WSZYSTKIEPOSTY";

export default function FORUM(){

    return(
        <div>
            <NAVBARREGISTED/>
<NAVIGATION/>
            <WSZYSTKIEPOSTY/>
        </div>

    )
}
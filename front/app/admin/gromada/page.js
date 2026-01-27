'use client'


import Gromada from "@/app/admin/gromada/Gromada";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function GromadaPage() {
    const {pushClick}=useContext(GlobalContext);
    return <div>
        <button onClick={()=>pushClick("","/admin/gromada/szostki")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full p-1 my-1"
        >Przejdż do szóstek</button>
        <Gromada/>
    </div>
}
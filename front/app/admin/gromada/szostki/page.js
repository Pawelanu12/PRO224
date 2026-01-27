'use client'

import AddModal from "@/app/admin/gromada/szostki/AddModal";
import Szostka from "@/app/admin/gromada/szostki/Szostka";
import {useContext, useEffect, useState} from "react";
import {AdminContext} from "@/app/providers/AdminProvider";

export default function Szostki(){
    const {getSzostki,addSzostka,szostki}=useContext(AdminContext)
    const [show, setShow] =useState(false);
    useEffect(()=>{
        getSzostki()
    },[])
    return(
        <div>
            <AddModal funkcjaDoDodania={addSzostka}/>
            <div className={"flex flex-row flex-wrap"}>
            {szostki?.length>0&&szostki.map((szostka,i)=>
                        <Szostka key={i}
                            szostka={szostka}
                        />)
                }
            </div>

        </div>

    )
}
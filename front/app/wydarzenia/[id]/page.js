'use client'

import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";

export default function WYDARZENIE(){
    const {wydarzenia} = useContext(WydarzeniaContext);
    const [wydarzenie, setWydarzenie] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(!wydarzenie.id)
    // console.log(wydarzenia)
    useEffect(() => {
        const index=window.document.URL.lastIndexOf("/");
        const id=window.document.URL.slice(index+1);
        console.log(id);
        if(wydarzenia.filter(x=>x.id==id).length>0){
            setWydarzenie(wydarzenia.filter(x=>x.id==id)[0]);
        }
        setLoading(false)
    }, []);
    return(
        <div>
                <NAVBARUNREGISTED/>
            {loading&&<div>Loading...</div>}
            {!loading&&!wydarzenie.id &&<div>Takie wydarzenie nie znalażone</div>}
            {!loading&&wydarzenie.id &&
                <div className={"flexRow"} style={{paddingTop: "50px",textAlign:"center"}}>
                    <div style={{flex:30 }}>
                        <p style={{marginTop:"15px"}}>{wydarzenie.nazwa}</p>
                        <p style={{marginTop:"15px"}}>{wydarzenie.typ}</p>
                        <p style={{marginTop:"15px"}}>{wydarzenie.startDate}-{wydarzenie.endDate}</p>
                        <div style={{marginTop:"15px",wordBreak:"break-word",backgroundColor:"wheat",color:"black"   }}>{wydarzenie.opis}</div>

                    </div>
                    <div style={{flex:70}}>Galerja zdjęć</div>
                </div>}
        </div>
    )
}
'use client'



import {useContext} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";

export default function CZATY(){
    const {czaty,setPokazywanyCzatId}=useContext(CzatContext)
    return(
        <div style={{    marginTop: "50px",
            position: "fixed",
            width: "40vw",
            overflow: "auto",
            height:"calc(100vh - 50px)"
        }}>
            {czaty.map((c,id)=><div style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}} key={id}>
                <img className={"ikona"} src={c.obraz} alt={"ikona"}/>
                <div onClick={()=>setPokazywanyCzatId(c.id)} style={{backgroundColor:"#405E3F",margin:"20px",width:"100%"}}>
                    <p style={{textAlign:"center"}}>{c.nazwa}</p>
                </div>
            </div>)}
        </div>
    )
}
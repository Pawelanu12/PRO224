'use client'



import {useContext} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";

export default function CZATY(){
    const {czaty}=useContext(CzatContext)
    return(
        <div style={{    marginTop: "50px",
            position: "fixed",
            width: "40vw",
            overflow: "auto",
            height:"calc(100vh - 50px)"
        }}>
            {czaty.map((c,id)=><div style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}} key={id}>
                <img style={{width:"20%",marginLeft:"40px",marginTop:"20px",marginBottom:"20px"}} src={c.obraz} alt={"ikona"}/>
                <div style={{backgroundColor:"#405E3F",margin:"20px",width:"100%"}}>
                    <p style={{textAlign:"center"}}>{c.nazwa}</p>
                </div>
            </div>)}
        </div>
    )
}
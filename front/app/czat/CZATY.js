'use client'



import {useContext} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import NowyCzatDialog from "@/app/czat/NowyCzatDialog";
//pokazuje wszystkich uzytkowników i gruppy
// do których pisales wczestniej lub jestes zarejestrowany
export default function Czaty(){
    const {czaty,setPokazywanyCzatId}=useContext(CzatContext)
    return(
        <div style={{    paddingTop: "50px",
            position: "fixed",
            width: "40vw",
            overflow: "auto",
            height:"100vh"
        }}>
            <div style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}}>
                <NowyCzatDialog/></div>
            {czaty.map((c,id)=><div style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}} key={id}>
                <img className={"ikona"} src={c.obraz} alt={"ikona"}/>
                <div onClick={()=>setPokazywanyCzatId(c.id)} style={{backgroundColor:"#405E3F",margin:"20px",width:"100%"}}>
                    <p style={{textAlign:"center"}}>{c.nazwa}</p>
                </div>
            </div>)}
        </div>
    )
}
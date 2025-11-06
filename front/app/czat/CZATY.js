'use client'



import {useContext, useEffect} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import NowyCzatDialog from "@/app/czat/NowyCzatDialog";
//pokazuje wszystkich uzytkowników i gruppy
// do których pisales wczestniej lub jestes zarejestrowany
export default function Czaty(){
    const {czaty,getCzaty}=useContext(CzatContext)

    useEffect(() => {
        getCzaty()
    }, [getCzaty]);
    console.log(czaty)
    if(!czaty)return <div>nie ma czatow</div>
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
                <div  style={{backgroundColor:"#405E3F",margin:"20px",width:"100%"}}>
                    <p style={{textAlign:"center"}}>{c.nazwa}</p>
                </div>
            </div>)}
        </div>
    )
}
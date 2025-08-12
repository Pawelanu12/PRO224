'use client'
import FaCevronRight, {FaChevronRight} from "react-icons/fa";
import {useEffect, useRef} from "react";

export default function NAPISZWIADOMOSC() {
    const wiadomosc=useRef(null)

    const wyslij=()=>{
        if(wiadomosc.current.value.length>0) {
            console.log(wiadomosc.current.value)
            wiadomosc.current.value = ""
        }
    }
    useEffect(() => {

    })
    return(<div className={"flexRow"} style={{margin:"50px",justifyContent:"center"}}>
        <label><input
            onKeyPress={(e)=> {
                if (e.code === "Enter") wyslij()
            }
        } style={{backgroundColor:"#405E3F",color:"white"}} ref={wiadomosc} placeholder={"napisz text"}/></label>
        <button  style={{paddingLeft:"10px"}} onClick={()=>wyslij()}><FaChevronRight/></button>

    </div>)
}
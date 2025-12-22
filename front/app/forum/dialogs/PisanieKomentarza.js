'use client'

import {useContext, useRef} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaMessage} from "react-icons/fa6";

export default function PisanieKomentarza(){
    const {user}=useContext(GlobalContext);
    const input=useRef(null);

    const komment=useRef(null);


    return(
        <div style={{display:'flex',position:'fixed',bottom:"20vh",backgroundColor:"white"}} >
            <img style={{width:"5vw",maxHeight:"5vw"}} src={"images/ikona.png"} alt={"logo"}/>
            <textarea

                placeholder={"treść posta"}
                style={{width: "50vw",
                    resize: "none",
                    overflow: "auto" }}
                rows={3} ref={komment}
                // onChange={(e) => onChange(e)}
            />
            <button style={{width:"5vw"}}><FaMessage fontSize={20}/></button>
        </div>
    )
}
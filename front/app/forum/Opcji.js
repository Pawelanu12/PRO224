'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
//menu opcji ktory uzytkownik moze robic z postem
export default function Opcji({autor}){
    const {user}=useContext(GlobalContext);
    return (
        <div
            style={{position: "absolute", translate: "-230px",width:"230px",
                backgroundColor:"white",color:"black",paddingLeft:"5px"}}
        >
            {user.login!==autor&&<button>zgloś post</button>}
            {user.login!==autor&&<button>ukryj posty tego użytkownika</button>}
            {user.login===autor&&<button>edytuj post</button>}
        </div>
    )
}
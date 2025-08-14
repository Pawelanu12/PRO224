'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Navigation(){
    const {replaceClick}=useContext(GlobalContext);
    return (<div className={"fiksacjaWLewejCzesciEkrana"}
                 style={{justifyContent:"center",backgroundColor:"#4D644C"}}>
        <button
            style={{backgroundColor:"#405E3F",width:"100%",paddingTop:"5px",paddingBottom:"5px"}}
            onClick={(e)=>replaceClick(e,"/forum/moje-posty")}
        >
            Moje posty</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum")}
            style={{backgroundColor:"#405E3F",width:"100%",
                marginTop:"5px",paddingTop:"5px",paddingBottom:"5px"}}>

        strona glówna</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum/obserwowani")}
            style={{backgroundColor:"#405E3F",width:"100%",
                marginTop:"5px",paddingTop:"5px",paddingBottom:"5px"}}>

        Obserwowani</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum/dodaj-post")}
            style={{backgroundColor:"#405E3F",width:"100%",
                marginTop:"5px",paddingTop:"5px",paddingBottom:"5px"}}>
            dodaj post</button>
    </div>)
}
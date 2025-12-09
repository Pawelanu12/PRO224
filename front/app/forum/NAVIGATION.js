'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
//linki do podstron w lewej czesci ekranu
export default function Navigation(){
    const {replaceClick}=useContext(GlobalContext);
    return (<div className={"forum-navigation"}>
        <button className={"forum-navigation-redirection"}
            onClick={(e)=>replaceClick(e,"/forum/moje-posty")}
        >
            Moje posty</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum")}
            className={"forum-navigation-redirection"}>

        strona glówna</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum/obserwowani")}
            className={"forum-navigation-redirection"}>

        Obserwowani</button>
        <button
            onClick={(e)=>replaceClick(e,"/forum/dodaj-post")}
            className={"forum-navigation-redirection"}>
            dodaj post</button>
    </div>)
}
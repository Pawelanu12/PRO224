'use client'

import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import LoginForm from "@/app/login/LoginForm";

export default function NavbarNiezarejestrowana() {
    const {replaceClick} = useContext(GlobalContext)


    return <div className={"navbar"}>
        <div style={{display:"flex", flexDirection:"row"}}>
            <button onClick={(e) => replaceClick(e, "/gromada")} >
                <img src={"/images/navbar/logo.png"} style={{height: "30px",width:"30px"}} alt={""}/>
            </button>
            <button onClick={(e) => replaceClick(e, "/sprawnosci")}>
                <p>
                    <img src={"/images/navbar/sprawnosci_logo.png"} alt={""}/>
                    sprawnosci</p></button>
            <button onClick={(e) => replaceClick(e, "/wydarzenia")}>
                <p>
                    <img src={"/images/navbar/wydarzenia_logo.png"} alt={""}/>
                    wydarzenia</p></button>
            <button onClick={(e) => replaceClick(e, "/kontakt")}>
                <p>
                    <img src={"/images/navbar/kontakt_logo.png"} alt={""}/>
                    kontakt</p></button>

        </div>
        <div>
            {/*<LoginForm />*/}
            <button  onClick={(e) => replaceClick(e, "/login")}><p>login</p></button>
        </div>
    </div>
}
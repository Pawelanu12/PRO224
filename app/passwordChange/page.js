'use client'

import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function PASSWORDCHANGE() {
    const {replaceClick}=useContext(GlobalContext);
    const [etap,setEtap] = useState('email');

    const linkDoEmailu=()=>{
        setEtap('kod');
    }
    const przyjecieKodu=()=>{
        setEtap('haslo');
    }
    const zmianaHasla=(e)=>{
       alert("zmiana udana")
        replaceClick(e,"/login")
    }
    return <div>
        <NAVBARUNREGISTED/>
        <div className={'forma'}>
            {etap==='email'&& <div>

                <label><input style={{width: "230px"}} placeholder={"email"} type={'text'}/></label>
                <br/>
                <button onClick={()=>linkDoEmailu()}> wyslij link zmiany hasla</button>
            </div>}
            {etap==='kod'&& <div>

                <label><input style={{width: "230px"}} placeholder={"podaj kod"} type={'text'}/></label>
                <br/>
                <button onClick={()=>przyjecieKodu()}> zatwerdz kod</button>
            </div>}
            {etap==='haslo'&&    <div>

                <label><input style={{width: "230px"}} placeholder={"nowe haslo"} type={'password'}/></label>
                <br/>
                <label><input style={{width: "230px"}} placeholder={"powtórz haslo"} type={'password'}/></label>
                <br/>
                <button onClick={(e)=>zmianaHasla(e)}> Zmień haslo</button>
            </div>}
        </div>

    </div>
}
'use state'

import {useContext, useEffect, useRef, useState} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";

export default function NowyCzatDialog() {
    const {dodajCzat}=useContext(CzatContext)
    const dialog=useRef(null);
    const [inputUzytkownikow,setInputUzytkownikow]=useState("");
    const [nazwa,setNazwa]=useState("");
    const zamknijDialog=()=>{
        setNazwa ("");
        setInputUzytkownikow("");
        dialog.current.close();
    }
    return(
        <div>
            <button style={{width:"100%", border:"1px solid black",textAlign:"center",margin:"10px"}}
                    onClick={()=>{dialog.current.showModal();
               }}>stworz nowy czat</button>
            <dialog style={{position: "fixed", left: "30vw", top: "30vh", height: "300px"}} ref={dialog}>
                <label><input type={"text"}
                              onChange={(e)=>setInputUzytkownikow(e.target.value)}
                              placeholder={"napisz login lub loginy użytkowników prez spacje"} value={inputUzytkownikow}></input></label><br/>
                {inputUzytkownikow&&inputUzytkownikow.trim().split(" ").length>1&&
                    <label><input type={"text"}
                                  onChange={(e)=>setNazwa(e.target.value)}
                              placeholder={"napisz nazwe czatu"}></input></label>}
                <div id="div" style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                    <button onClick={() => {
                        dodajCzat({uzytkownicy:inputUzytkownikow.trim(),nazwa:nazwa.trim(),
                            czyGrupowy:inputUzytkownikow&&inputUzytkownikow.trim().split(" ").length>1})
                        zamknijDialog()
                    }}>dodaj
                    </button>
                    <button onClick={() => {
                        zamknijDialog()
                    }}>cofnij</button>
                </div>
            </dialog>

        </div>
    )
}
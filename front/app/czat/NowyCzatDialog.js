'use state'

import {useContext, useEffect, useRef, useState} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function NowyCzatDialog() {
    const {dodajCzatPrywatny}=useContext(CzatContext)
    const {user}=useContext(GlobalContext)
    const dialog=useRef(null);
    const [inputUzytkownikow,setInputUzytkownikow]=useState("");
    const [nazwa,setNazwa]=useState("");
    const zamknijDialog=()=>{
        setNazwa ("");
        setInputUzytkownikow("");
        dialog.current.close();
    }
    const createCzat=()=>{
        // dodajCzat({participantLogin:inputUzytkownikow.trim(),
        //                             participantLogins:inputUzytkownikow&&inputUzytkownikow.trim().split(" "),
        //                             nazwa:nazwa.trim()||user.login+" "+inputUzytkownikow.trim(),
        //                             czyGrupowy:inputUzytkownikow&&inputUzytkownikow.trim().split(" ").length>1})
        dodajCzatPrywatny({user1Id:Number(inputUzytkownikow),user2Id:user.id})
    }
    return(
        <div>
            <button style={{width:"100%", border:"1px solid black",textAlign:"center",margin:"10px"}}
                    onClick={()=>{dialog.current.showModal();
               }}>stworz nowy czat</button>
            <dialog style={{position: "fixed", left: "30vw", top: "30vh", height: "300px"}} ref={dialog}>
                <label><input type={"number"}
                              onChange={(e)=>setInputUzytkownikow(e.target.value)}
                              placeholder={"napisz id uzytkownika"} value={inputUzytkownikow}></input></label><br/>
                {/*{inputUzytkownikow&&inputUzytkownikow.trim().split(" ").length>1&&*/}
                {/*    <label><input type={"text"}*/}
                {/*                  onChange={(e)=>setNazwa(e.target.value)}*/}
                {/*              placeholder={"napisz nazwe czatu"}></input></label>}*/}
                <div id="div" style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                    <button onClick={() => {
                        createCzat();
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
'use client'

import Filter from "@/app/wydarzenia/Filter";
import {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {dateToString} from "@/app/wydarzenia/dateToString";
import Wydarzenie from "@/app/wydarzenia/[id]/page";
import WydarzenieMale from "@/app/wydarzenia/WydarzenieMale";
import Navbar from "@/app/navbars/Navbar";



export default function Wydarzenia(){
    const {wydarzenia,nazwa,typ,data,getWydarzenia}=useContext(WydarzeniaContext)
    // const {router,user}=useContext(GlobalContext)
    const [elementWidth, setElementWidth] = useState(320);
    const[wydarzeniaSortowane,setWydarzeniaSortowane]=useState(wydarzenia);
    console.log(elementWidth)
    useEffect(  ()=>{
        getWydarzenia()
    },[])

    useEffect( ()=>{
        const sort= ()=>{
            setWydarzeniaSortowane(wydarzenia.filter(w=>
                w.nazwa.includes(nazwa)&&
                (w.typ===typ||typ==="Typ wydarzenia")&&
                (data===''||new Date(w.dataWyjazdu).getTime()>new Date(data).getTime())
            ))
        }
         sort()
    },[wydarzenia, nazwa, typ, data])

    useEffect(() => {
        const handleResize = () => {
            setElementWidth((window.innerWidth-280)/Math.floor((window.innerWidth-280)/320))
        };
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div>
            <button className={"dodaj-wydarzenie-button"}
                    onClick={(e) => replaceClick(e, "/admin/add/wydarzenie")}>Dodaj
                nowe wydarzenie
            </button>
            <div className={"wydarzenia"}>
                <Filter/>
                {/*<div  className={"wydarzenia-vertical-line"} ></div>*/}
                <div className={"wydarzenia-row"}>
                    {wydarzeniaSortowane.map((wydarzenie, i) => (
                        <WydarzenieMale wydarzenie={wydarzenie} key={i} width={elementWidth - 20}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
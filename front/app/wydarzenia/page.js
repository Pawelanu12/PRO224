'use client'

import Filter from "@/app/wydarzenia/Filter";
import {useContext, useEffect, useRef, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {dateToString} from "@/app/wydarzenia/dateToString";
import Wydarzenie from "@/app/wydarzenia/[id]/page";
import WydarzenieMale from "@/app/wydarzenia/WydarzenieMale";
import Navbar from "@/app/navbars/Navbar";
import Pagination from "@/app/functions/Pagination";



export default function Wydarzenia(){
    const {wydarzenia,nazwa,typ,data,getWydarzenia}=useContext(WydarzeniaContext)
    const {replaceClick}=useContext(GlobalContext)
    const [elementWidth, setElementWidth] = useState(320);
    const[wydarzeniaSortowane,setWydarzeniaSortowane]=useState(wydarzenia);
    const [page,setPage]=useState(1)
    const wydarzeniaPerPage=12;
    const liczbaStron=Math.ceil(wydarzeniaSortowane.length/wydarzeniaPerPage)
    const inputRef=useRef(null);
    console.log(page)
    useEffect(  ()=>{
        getWydarzenia()
        // const urlParams = new URLSearchParams(window.location.search);
        // setPage(parseInt(urlParams.get("page"))||1)

    },[])

    useEffect( ()=>{
        const sort= ()=>{
            setWydarzeniaSortowane(wydarzenia.filter(w=>
                w.nazwa.includes(nazwa)&&
                (w.typ===typ||typ==="Typ wydarzenia")&&
                (data===''||new Date(w.dataWyjazdu).getTime()>new Date(data).getTime())
            ))
            setPage(1)
            if(inputRef.current)
                inputRef.current.value=1
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
    if(liczbaStron>=1&&page>liczbaStron)
        setPage(liczbaStron);

    const wydarzeniaNaStronie=wydarzeniaSortowane.slice(page*wydarzeniaPerPage-wydarzeniaPerPage,page*wydarzeniaPerPage)
    return (
        <div>

            <div className={"flex flex-row"}>
                <Filter/>
                {/*<div  className={"wydarzenia-vertical-line"} ></div>*/}
                <div className={"flex flex-row flex-wrap"}>
                    {wydarzeniaNaStronie.map((wydarzenie, i) => (
                        <WydarzenieMale wydarzenie={wydarzenie} key={i} width={elementWidth - 20}/>
                    ))}
                    <Pagination liczbaStron={liczbaStron} page={page} setPage={setPage} inputRef={inputRef} />
                </div>

            </div>
        </div>
    )
}
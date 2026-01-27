'use client'

import Filter from "@/app/events/Filter";
import {useContext, useEffect, useRef, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/EventProvider";
import SmallEvent from "@/app/events/SmallEvent";
import Pagination from "@/app/functions/Pagination";



export default function Wydarzenia(){
    const {wydarzenia,nazwa,typ,data,getWydarzenia}=useContext(WydarzeniaContext)

    const [elementWidth, setElementWidth] = useState(320);
    const[wydarzeniaSortowane,setWydarzeniaSortowane]=useState(wydarzenia);
    const [page,setPage]=useState(1)
    const wydarzeniaPerPage=12;
    const liczbaStron=Math.ceil(wydarzeniaSortowane.length/wydarzeniaPerPage)
    const inputRef=useRef(null);
    useEffect(  ()=>{
        getWydarzenia()
        // const urlParams = new URLSearchParams(window.location.search);
        // setPage(parseInt(urlParams.get("page"))||1)

    },[])

    useEffect( ()=>{
        const sort= ()=>{
            const newWydarzenia=
            (wydarzenia.filter(w=>
                w.nazwa.includes(nazwa)&&
                (w.typWydarzenia===typ||typ==="Typ wydarzenia")&&
                (data===''||new Date(w.dataWyjazdu).getTime()>new Date(data).getTime())
            ))
            if(data!=="")
                newWydarzenia.sort((a,b)=>new Date(a.dataWyjazdu).getTime()-new Date(b.dataWyjazdu).getTime())
            setPage(1)
            if(inputRef.current)
                inputRef.current.value=1
            setWydarzeniaSortowane(newWydarzenia)
        }
         sort()
    },[wydarzenia, nazwa, typ, data])

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth>640)
                setElementWidth((window.innerWidth-280)/Math.floor((window.innerWidth-280)/320))
            else setElementWidth(window.innerWidth-40)
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
                        <SmallEvent wydarzenie={wydarzenie} key={i} width={elementWidth - 20}/>
                    ))}
                    <Pagination liczbaStron={liczbaStron} page={page} setPage={setPage} inputRef={inputRef} />
                </div>

            </div>
        </div>
    )
}
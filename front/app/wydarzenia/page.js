'use client'

import Filter from "@/app/wydarzenia/Filter";
import {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";




export default function Wydarzenia(){
    const {wydarzenia,nazwa,typ,data,getWydarzenia}=useContext(WydarzeniaContext)
    const {router,user}=useContext(GlobalContext)
    const[wydarzeniaSortowane,setWydarzeniaSortowane]=useState(wydarzenia);
    // console.log(wydarzenia)
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

    const dateToString=(data)=>{
        return data.getHours()+':'+data.getMinutes()+' '+data.getDate()+'/'+ (data.getMonth()+1)+'/'+data.getFullYear()
    }

    return (
        <div>
            {user.login?<NavbarZarejestrowana/>:<NavbarNiezarejestrowana/>}


            <div style={{paddingTop:"50px"}}>
            <Filter/>
            <div style={{position:"fixed",left:"250px",width:"30px",borderRight:"solid green 1px",height:"100%"}}></div>
            <div style={{paddingLeft:"280px"}}  className={"flexRow"}>
                {wydarzeniaSortowane.map((wydarzenie,i) => (
                    <div className={"wydarzenie"} key={i}
                         onClick={() => router.replace("/wydarzenia/" + wydarzenie.id)}>
                        <p>{wydarzenie.nazwa}</p>
                        <img style={{display: "block", margin: "0 auto"}} src="/images/event.png" loading="lazy"
                             alt="cat"/>


                        <p>{dateToString(new Date(wydarzenie.dataWyjazdu))}</p>
                        <p>{dateToString(new Date(wydarzenie.dataZakonczenia))}</p>
                    </div>))}
                <div>

                </div>
            </div>
        </div>
        </div>
            )
}
'use client'

import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import React, {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export default function Wydarzenie({params}){
    const {user,router}=useContext(GlobalContext)
    const [wydarzenie, setWydarzenie] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} =  React.use(params);

    useEffect(() => {
        console.log(id)
        // const index=window.document.URL.lastIndexOf("/");
        // const id=window.document.URL.slice(index+1);
        const getWydarzenie = (id) => {
            const get=async (id)=>{
                setLoading(true)
                console.log(id)
                await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                    method:"GET",
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"}
                })
                    .then(res=>res.json())
                    .then(res=> {
                        console.log(res)
                        if(!res.error)
                            setWydarzenie(res)
                    })
                    .catch(err=>console.log(err))
                    .finally(()=>{setLoading(false)})
            }
            get(id)
            // console.log("cat")
        }
        getWydarzenie(id)
    }, []);
    return(
        <div>
            {user.login?<NavbarZarejestrowana/>:<NavbarNiezarejestrowana/>}


            {loading&&<div>Loading...</div>}
            {!loading&&!wydarzenie.id &&<div>Takie wydarzenie nie znalażone</div>}
            {!loading&&wydarzenie.id &&
                <div className={"flexRow"} style={{paddingTop: "50px",textAlign:"center"}}>
                    <div style={{flex:30 }}>
                        <p style={{marginTop:"15px"}}>{wydarzenie.nazwa}</p>
                        <p style={{marginTop:"15px"}}>{wydarzenie.typ}</p>
                        <p style={{marginTop:"15px"}}>data Wyjazdu:</p><p>{wydarzenie.dataWyjazdu}</p>
                        <p>data Zakonczenia:</p>
                        <p>{wydarzenie.dataZakonczenia}</p>
                        <div style={{marginTop:"15px",wordBreak:"break-word",backgroundColor:"wheat",color:"black"   }}>{wydarzenie.opis}</div>

                    </div>
                    <div style={{flex:70}}>Galerja zdjęć</div>
                </div>}
        </div>
    )
}
'use client'

import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import React, {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export default function Wydarzenie({params}){
    const {user,replaceClick,setEdit}=useContext(GlobalContext)
    const {dodajUczestnictwo}=useContext(WydarzeniaContext)
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
                <div className={"pt-12 text-center flex flex-row flex-wrap"} >
                    <div className={"flex-30"}>

                        <p className={"mt-4"}>{wydarzenie.nazwa}</p>
                        <p className={"mt-4"}>{wydarzenie.typ}</p>
                        <p className={"mt-4"}>data Wyjazdu:</p>
                        <p >{wydarzenie.dataWyjazdu}</p>
                        <p >data Zakonczenia:</p>
                        <p >{wydarzenie.dataZakonczenia}</p>
                        <div className={"mt-4 bg-wheat text-black break-normal"}>{wydarzenie.opis}</div>
                        <button className={"border border-solid border-white mt-2"}
                                onClick={()=>dodajUczestnictwo(id,user.id)}>
                            Uczęstniczaj w wydarzeniu
                        </button>
                        <br/>
                        <button className={"border border-solid border-white mt-12"}
                                         onClick={e => {
                                    setEdit(wydarzenie)
                                    replaceClick(e, "/admin/edit/wydarzenie")
                                }}>
                            Edit wydarzenie
                        </button>
                    </div>
                    <div className={"flex-70"}>Galerja zdjęć
                        <div className={"flex flex-row flex-wrap"}>
                            {wydarzenie.zdjecia.length > 0 && wydarzenie.zdjecia.map((z, i) => (
                                <div key={i}>
                                    <img className={"rounding-2 p-4 max-w-72"}
                                         src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/wydarzenia/${z}`} loading="lazy"
                                         alt={z}

                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
'use client'

import React, { useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import WydarzenieEditable from "@/app/events/[id]/WydarzenieEditable";

export default function Wydarzenie({params}){
    const [wydarzenie, setWydarzenie] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} =  React.use(params);

    useEffect(() => {
        const getWydarzenie = (id) => {
            const get=async (id)=>{
                setLoading(true)
                await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                    method:"GET",
                    headers: {"Content-Type": "application/json"},
                    credentials:"include"
                })
                    .then(res=>res.json())
                    .then(res=> {
                        if(!res.error)
                            setWydarzenie(res)
                    })
                    .catch(err=>console.log(err))
                    .finally(()=>{setLoading(false)})
            }
            get(id)
        }
        getWydarzenie(id)
    }, []);
    return(
        <div>

            {loading&&<div>Loading...</div>}
            {!loading&&!wydarzenie.id &&<div>Takie wydarzenie nie znalażone</div>}
            {!loading&&wydarzenie.id &&
                <WydarzenieEditable wydarzenie={wydarzenie}/>}
        </div>
    )
}
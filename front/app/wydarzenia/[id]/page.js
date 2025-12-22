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
                <div className={"wydarzenie-duze"} >
                    <div className={"wydarzenie-duze-flex-lewy"}>

                        <p className={"wydarzenie-duze-nazwa"}>{wydarzenie.nazwa}</p>
                        <p className={"wydarzenie-duze-typ"}>{wydarzenie.typ}</p>
                        <p className={"wydarzenie-duze-data-napis1"}>data Wyjazdu:</p>
                        <p className={"wydarzenie-duze-data-wyjazdu"}>{wydarzenie.dataWyjazdu}</p>
                        <p className={"wydarzenie-duze-data-napis2"}>data Zakonczenia:</p>
                        <p className={"wydarzenie-duze-data-zakoncznia"}>{wydarzenie.dataZakonczenia}</p>
                        <div className={"wydarzenie-duze-opis"}>{wydarzenie.opis}</div>
                        <button style={{border:"solid 1px white",marginTop:"10px"}}
                                onClick={()=>dodajUczestnictwo(id,user.id)}>
                            Uczęstniczaj w wydarzeniu
                        </button>
                        <br/>
                        <button style={{border:"solid 1px white",marginTop: "50px"}}
                                onClick={e => {
                                    setEdit(wydarzenie)
                                    replaceClick(e, "/admin/edit/wydarzenie")
                                }}>
                            Edit wydarzenie
                        </button>
                    </div>
                    <div className={"wydarzenie-duze-flex-prawy"}>Galerja zdjęć
                        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                            {wydarzenie.zdjecia.length > 0 && wydarzenie.zdjecia.map((z, i) => (
                                <div key={i}>
                                    <img className={"wydarzenie-male-img"}
                                         src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/wydarzenia/${z}`} loading="lazy"
                                         alt={z}
                                        style={{"width":"300px",padding:"20px"}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
'use client'

import {use, useContext, useEffect, useState} from "react";
import Information from "@/app/profile/Information";
import MainInformation from "@/app/profile/MainInformation";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Posts from "@/app/forum/Posts";

export default function ProfilUzytkownika({params}){
    const [item,setItem]=useState("Posty")
    const [loading,setLoading ] = useState(true)
    const {fetchWithAuth} = useContext(GlobalContext);
    const {id}=use(params)
    const [uzytkownik,setUzytkownik]=useState({})

    useEffect(() => {
        if(!id)return
            const getUsers=async (id)=>{
                await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}`,
                    {
                        method:"GET",
                        credentials: "include",
                    })
                    .then(res=>res.json())
                    .then(r=>{
                        console.log(r)
                        if(r&&r.login)
                            setUzytkownik(r);
                    })
                    .finally(()=>setLoading(false))
            }
        getUsers(id)
    }, []);
    if (loading) return <div>loading</div>;

    if (!uzytkownik?.login) return <div>użytkownik nie znaleziony</div>;

    return(
        <div className={"p-5 h-[calc(100vh-50px)]"}>
            <MainInformation item={item} setItem={setItem} uzytkownik={uzytkownik}/>
            {item==="Informacje"&&<Information uzytkownik={uzytkownik}/>}
            {item==="Posty"&&<Posts classname={"ml-10"} wszystkie={false} id={uzytkownik.id}/>}
            {/*{item==="Zdjecia"&&<p/>}*/}
        </div>)
}
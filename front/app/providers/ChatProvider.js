'use client'


import {createContext, useContext, useState} from "react";

import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const CzatContext = createContext();

export default function ChatProvider({ children }) {
    const [czaty, setCzaty] = useState([]);
    const [czat, setCzat] = useState({});
    const {user}=useContext(GlobalContext);
    const [czatId, setCzatId] = useState( null);
    const [loading,setLoading] = useState(false);
    const getCzaty=()=>{
        if(!user||!user.id)return
        const pobierz=async ()=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/my-czaty?userId=${user.id}`,{
                headers: {
                    "Content-Type": "application/json"},
                credentials: "include",

            })
                .then(res=>res.json())
                .then(res=> {
                    if(Array.isArray(res)) {
                        setCzaty(res)
                        if(res.length>0&&!czatId){
                            setCzatId(res[0].id)
                        }
                    }
                })
                .catch(err=>console.log(err))
        }
            pobierz()
    }

    const getCzat=(id)=>{
        const pobierz=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${id}`,{
                headers: {"Content-Type": "application/json"},
                credentials: "include",

            })
                .then(res=>res.json())
                .then(res=> {
                        setCzat(res)
                })
                .catch(err=>console.log(err))
        }
            pobierz(id)
    }


    const dodajCzat=(values,isGrupowy)=>{
        const add=async (values,isGrupowy)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty${isGrupowy}`,{
                method:"Post",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body:JSON.stringify({...values})
            })
                .then(()=>getCzaty())
                .catch(err=>alert("wystąpił błąd podzas tworzenia czatu"))
        }
        add(values,isGrupowy)
    }
    const removeFromCzat=(czatId,userId)=>{
        const removeFromCzat=async (czatId,userId)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${czatId}/participants/${userId}`,{
                method:"DELETE",
                credentials: "include",
            })
                .then(()=>getCzaty())
                .catch(err=>console.log(err))
        }
        removeFromCzat(czatId,userId)
    }

    const addUserToCzat=(czatId,userId)=>{
        const removeFromCzat=async (czatId,userId)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${czatId}/participants/${userId}`,{
                method:"POST",
                credentials: "include",
            })
                .then(()=>getCzaty())
                .catch(err=>console.log(err))
        }
        removeFromCzat(czatId,userId)
    }

    const editWiadomosc=(id,tekst)=>{
        const editW=async (id,tekst)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wiadomosc/${id}`,{
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({tresc:tekst}),
                credentials: "include",
            })
                .catch(err=>"wystąpił błąd podzas editowania wiadomości")
        }
        editW(id,tekst)
    }
    const deleteWiadomosc=(id)=>{
        const deleteW=async(id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wiadomosc/${id}`,{
                method:"Delete",
                credentials: "include",
            })
                .catch(err=>"wystąpił błąd podzas usuwania wiadomości")
            }
        deleteW(id)

        }


    return (
        <CzatContext.Provider value={{setCzat,setCzaty,getCzat,addUserToCzat,
            czaty,getCzaty,czat,loading,dodajCzat,czatId,setCzatId,editWiadomosc,deleteWiadomosc,
            removeFromCzat
        }}>{children}</CzatContext.Provider>
    )
};
'use client'


import {createContext, useContext, useState} from "react";

import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const CzatContext = createContext();

export default function CzatProvider({ children }) {
    const [czaty, setCzaty] = useState([]);
    const [czat, setCzat] = useState({});
    const {user}=useContext(GlobalContext);
    const [czatId, setCzatId] = useState( null);
    const [loading,setLoading] = useState(false);
    const getCzaty=()=>{
        if(!user||!user.id)return
        console.log()
        const pobierz=async ()=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/my-czaty?userId=${user.id}`,{
                headers: {
                    "Content-Type": "application/json"},
                credentials: "include",

            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    if(Array.isArray(res)) {
                        setCzaty(res)
                        if(res.length>0){
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
                    console.log(res)

                        setCzat(res)

                })
                .catch(err=>console.log(err))
        }
            pobierz(id)
    }

    // const dodajCzat = (values) => {
    //     const add=async (values)=>{
    //
    //         // if(!values.nazwa&&values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
    //         // else if(!values.nazwa&&!values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
    //         console.log(JSON.stringify({...values}))
    //         const uri=values.czyGrupowy?
    //             `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/group?participantLogins=${values.participantLogins}&&nazwa=${values.nazwa}`:
    //             `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/private?participantLogin=${values.participantLogin}`
    //         await fetch( `${uri}`,{
    //             method:"POST",
    //             headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 // "Content-Type": "application/json"
    //             },
    //             // body:JSON.stringify({...values})
    //         })
    //             .then(res=> res.json())
    //             .then(res=> {
    //                 console.log(values)
    //                 console.log(res)
    //                 // pushClick("","/wydarzenia")
    //             })
    //             .catch(err=>console.log(err))
    //     }
    //     add(values)
    // }

    const dodajCzat=(values,isGrupowy)=>{
    console.log(values)
        console.log(isGrupowy)
        const add=async (values,isGrupowy)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty${isGrupowy}`,{
                method:"Post",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body:JSON.stringify({...values})
            })
                .then(res=>res.json())
                .then(res=> {

                    console.log(res)
                })
                .then(()=>getCzaty())
                .catch(err=>console.log(err))
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

    }
    const deleteWiadomosc=(id)=>{

    }


    return (
        <CzatContext.Provider value={{setCzat,setCzaty,getCzat,addUserToCzat,
            czaty,getCzaty,czat,loading,dodajCzat,czatId,setCzatId,editWiadomosc,deleteWiadomosc,
            removeFromCzat
        }}>{children}</CzatContext.Provider>
    )
};
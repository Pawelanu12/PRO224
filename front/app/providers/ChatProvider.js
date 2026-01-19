'use client'


import {createContext, useContext, useState} from "react";

import {GlobalContext} from "@/app/providers/GlobalProvider";
export const CzatContext = createContext();

export default function ChatProvider({ children }) {
    const [czaty, setCzaty] = useState([]);
    const [czat, setCzat] = useState({});
    const {user,fetchWithAuth}=useContext(GlobalContext);
    const [czatId, setCzatId] = useState( null);
    const [loading,setLoading] = useState(false);
    const getCzaty=()=>{

        if(!user||!user.id)return
        const pobierz=async ()=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/my-czaty?userId=${user.id}`,{
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
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${id}`,{
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
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty${isGrupowy}`,{
                method:"Post",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body:JSON.stringify({...values})
            })
                .then(res=> res.json())
                .then(res=> {getCzaty();return res})
                .then(res=> {setCzatId(res.id)})
                .catch(err=>alert("wystąpił błąd podzas tworzenia czatu"))
        }
        add(values,isGrupowy)
    }
    const removeFromCzat=(czatId,userId)=>{
        const removeFromCzat=async (czatId,userId)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${czatId}/participants/${userId}`,{
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
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${czatId}/participants/${userId}`,{
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
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wiadomosc/${id}`,{
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
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wiadomosc/${id}`,{
                method:"Delete",
                credentials: "include",
            })
                .catch(err=>"wystąpił błąd podzas usuwania wiadomości")
            }
        deleteW(id)

        }

        const wyzerujNieprzeczytane=(czatId)=>{
            const f=async(czatId)=>{
                await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/${czatId}/to-zero/${user.id}`,{
                    method:"PUT",
                    credentials: "include",
                })
                    .then(()=>setCzaty(prev=>prev.map(c=>c.id!==czatId?c:{...c,nieprzeczytaneWiadomosci:0})))
                    // .catch(err=>"wystąpił błąd podzas zerowania wiadomości")
            }
            f(czatId)
        }


    const openCzat=(userLogin)=>{
    console.log(userLogin)

        const czatyWithUser=czaty.filter(f=>f.uczestnicyLogins.length===2&&f.uczestnicyLogins.includes(userLogin))
        console.log(czatyWithUser)
        if(czatyWithUser?.length>0){
            setCzatId(czatyWithUser[0].id)
        }
        else {
            dodajCzat({
                user1Login: userLogin,
                user2Login: user.login,
            },"");
        }


    }

    return (
        <CzatContext.Provider value={{setCzat,
            setCzaty,
            getCzat,
            addUserToCzat,
            czaty,
            getCzaty,
            czat,
            loading,
            dodajCzat,
            czatId,
            setCzatId,
            editWiadomosc,
            deleteWiadomosc,
            removeFromCzat,
            wyzerujNieprzeczytane,
            openCzat
        }}>{children}</CzatContext.Provider>
    )
};
'use client'


import {createContext, useContext, useState} from "react";

import czats from  "@/app/data/czaty.json"
import c from "@/app/data/czat1.json"
import c2 from "@/app/data/czat2.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const CzatContext = createContext();

export default function CzatProvider({ children }) {
    const [czaty, setCzaty] = useState([]);
    const [czat, setCzat] = useState({});
    const {user}=useContext(GlobalContext);
    const [loading,setLoading] = useState(false);
    const getCzaty=(values)=>{
        console.log(values)
        const pobierz=async (values)=>{
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
                        // if(!czat&&czaty.length>0){
                            setCzat(res[0])
                        // }
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
    //                 // replaceClick("","/wydarzenia")
    //             })
    //             .catch(err=>console.log(err))
    //     }
    //     add(values)
    // }

    const dodajCzatPrywatny=(values)=>{
    console.log(values)
        const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty`,{
                method:"Post",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body:JSON.stringify({...values})
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }
    return (
        <CzatContext.Provider value={{setCzat,setCzaty,getCzat,
            czaty,getCzaty,czat,loading,dodajCzatPrywatny
        }}>{children}</CzatContext.Provider>
    )
};
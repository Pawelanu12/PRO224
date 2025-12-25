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
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"},
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
        if(user && user.id)
            pobierz()
    }
    // const getCzat= async()=>{
    //     setLoading(true)
    //     // console.log(loading)
    //     const nazwa=czaty.filter(item => item.id === pokazywanyCzatId)[0].nazwa
    //     const ikona=czaty.filter(item => item.id === pokazywanyCzatId)[0].obraz
    //     let messages
    //     if(pokazywanyCzatId!==1) {
    //          messages=c;
    //     }
    //     else {
    //         messages=c2;
    //     }
    //     setCzat({nazwa:nazwa,ikona:ikona,messages:messages})
    //     // await fetch(`http://localhost:8080/getCzat/${pokazywanyCzatId}`,{
    //     //     method:"GET",
    //     //
    //     // })
    //     setTimeout(()=>setLoading(false),1000);
    // }
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
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"},
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
        <CzatContext.Provider value={{setCzat,setCzaty,
            czaty,getCzaty,czat,loading,dodajCzatPrywatny
        }}>{children}</CzatContext.Provider>
    )
};
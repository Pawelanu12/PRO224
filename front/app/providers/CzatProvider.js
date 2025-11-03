'use client'


import {createContext, useContext, useState} from "react";

import czats from  "@/app/data/czaty.json"
import c from "@/app/data/czat1.json"
import c2 from "@/app/data/czat2.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const CzatContext = createContext();

export default function CzatProvider({ children }) {
    const [czaty, setCzaty] = useState(czats);
    const [czat, setCzat] = useState({});
    const {user}=useContext(GlobalContext);
    const [loading,setLoading] = useState(true);
    const [pokazywanyCzatId,setPokazywanyCzatId] = useState(czaty[0].id);
    const getCzaty = async () => {
        await fetch("http://localhost:8080/getCzaty")
            .then(res=>res.json())
            .then(res=>setCzaty(res));
    }
    const getCzat= async()=>{
        setLoading(true)
        // console.log(loading)
        const nazwa=czaty.filter(item => item.id === pokazywanyCzatId)[0].nazwa
        const ikona=czaty.filter(item => item.id === pokazywanyCzatId)[0].obraz
        let messages
        if(pokazywanyCzatId!==1) {
             messages=c;
        }
        else {
            messages=c2;
        }
        setCzat({nazwa:nazwa,ikona:ikona,messages:messages})
        // await fetch(`http://localhost:8080/getCzat/${pokazywanyCzatId}`,{
        //     method:"GET",
        //
        // })
        setTimeout(()=>setLoading(false),1000);
    }
    const dodajCzat = (values) => {
        const add=async (values)=>{

            if(!values.nazwa&&values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
            else if(!values.nazwa&&!values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
            console.log(values)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty`,{
                method:"POST",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },

                body:JSON.stringify({...values})
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(values)
                    console.log(res)
                    // replaceClick("","/wydarzenia")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }

    return (
        <CzatContext.Provider value={{
            czaty,getCzaty,czat,loading,getCzat,pokazywanyCzatId,setPokazywanyCzatId,dodajCzat
        }}>{children}</CzatContext.Provider>
    )
};
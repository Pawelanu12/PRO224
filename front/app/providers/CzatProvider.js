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
    const getCzaty = async () => {
        await fetch("http://localhost:8080/api/czaty/my-czaty",
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>res.json())
            .then(res=> {
                console.log(res)
                if (res.status === 200) {
                    setCzaty(res)
                }
            });
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

            // if(!values.nazwa&&values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
            // else if(!values.nazwa&&!values.czyGrupowy)values.nazwa=values.uzytkownicy+" "+user.login;
            console.log(JSON.stringify({...values}))
            const uri=values.czyGrupowy?
                `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/group?participantLogins=${values.participantLogins}&&nazwa=${values.nazwa}`:
                `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/czaty/private?participantLogin=${values.participantLogin}`
            await fetch( `${uri}`,{
                method:"POST",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // "Content-Type": "application/json"
                },
                // body:JSON.stringify({...values})
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
            czaty,getCzaty,czat,loading,getCzat,dodajCzat
        }}>{children}</CzatContext.Provider>
    )
};
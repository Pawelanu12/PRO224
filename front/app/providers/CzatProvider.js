'use client'


import {createContext, useState} from "react";

import czats from  "@/app/data/czaty.json"
import c from "@/app/data/czat.json"
export const CzatContext = createContext();

export default function CzatProvider({ children }) {
    const [czaty, setCzaty] = useState(czats);
    const [czat, setCzat] = useState(c);
    const [loading,setLoading] = useState(true);
    const getCzaty = async () => {
        await fetch("http://localhost:8080/getCzaty")
            .then(res=>res.json())
            .then(res=>setCzaty(res));
    }
    const getCzat= async(id)=>{
        // await fetch(`http://localhost:8080/getCzat/${id}`,{
        //     method:"GET",
        //
        // })
        setLoading(false);
    }
    return (
        <CzatContext.Provider value={{
            czaty,getCzaty,czat,loading,getCzat
        }}>{children}</CzatContext.Provider>
    )
};
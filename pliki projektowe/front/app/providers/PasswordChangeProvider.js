'use client'


import {createContext, useState} from "react";

export const PasswordChangeContext = createContext();

export default function PasswordChangeProvider({ children }) {
    const [email,setEmail]=useState('')
    const [kod,setKod]=useState('')
    const [etap,setEtap]=useState("email")

    return (
        <PasswordChangeContext.Provider value={{email,setEmail,kod,setKod,etap,setEtap}}>{children}</PasswordChangeContext.Provider>
    )
};
'use client'


import {useContext} from "react";
import GlobalInfo from "@/app/pokazywanie/GlobalInfo";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import User from "@/app/classes/User";

export default function PokazywanieUsera(){
    const {pokazywanie}=useContext(GlobalContext)
    if(pokazywanie!=="User")return<div></div>
    return(
        <div>
            <User ></User>
        </div>
    )
}
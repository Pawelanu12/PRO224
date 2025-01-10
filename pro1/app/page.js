'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Components from "./pokazywanie/Components"

import Dodawania from "@/app/pokazywanie/Dodawania";


export default function Home() {

   const {setListUsers}=useContext(GlobalContext)
    useEffect(()=>{
        const getList=async () => {
            await fetch("http://localhost:8081/api/uzytkownicy/all")
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    setListUsers(res)
                })
                .catch(err=>console.log(err))
        }
        getList().catch(err=>console.log(err));
    },[])
   // console.log(pokazywanieUsera)

  return (
      <div>
          {/*{user&&(user.typUzytkownika==="Admin"||user.typUzytkownika==="Druzunowy")&&<div>*/}
          {/*<button onClick={() => {setComponentsDodawania(1);setPokazywanie("Events")}} type="button">Pokaz komponenty</button>*/}
          {/*<br/>*/}
          {/*<button onClick={() => {setComponentsDodawania(2);setPokazywanie("AddGlobalInformation")}} type="button">Pokaz dodawania</button>*/}
          {/*    <br/></div>}*/}
         <Components></Components>
          {/*{componentsDodawania === 2 && (<Dodawania></Dodawania>)}*/}
      </div>
  )
}
'use client'


import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Components from "./pokazywanie/Components"

import Dodawania from "@/app/pokazywanie/Dodawania";


export default function Home() {

   const {user,setComponentsDodawania,setPokazywanie}=useContext(GlobalContext)
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
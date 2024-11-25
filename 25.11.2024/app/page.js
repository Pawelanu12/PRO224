'use client'

import forGlobalInfo from "./data/forGlobalInfo.json"
import forEvent from "./data/forEvent.json"
import AddGlobalInformation from "./add/AddGlobalInformation";
import Event from "@/app/classes/Event";
import {useState} from "react";
import Events from "@/app/pokazywanie/Events";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Components from "./pokazywanie/Components"
import GlobalInfo from "@/app/pokazywanie/GlobalInfo";
import WyberzJakieComponentyPokazywacz from "@/app/pokazywanie/WyberzJakieComponentyPokazywacz";
import PokazywanieUsera from "@/app/pokazywanie/PokazywanieUsera";
import Dodawania from "@/app/pokazywanie/Dodawania";


export default function Home() {

   const {componentsDodawania,setComponentsDodawania,setPokazywanie}=useContext(GlobalContext)

  return (
      <div>
          <input type={'datetime-local'}/>
          <button onClick={() => {setComponentsDodawania(1);setPokazywanie("Events")}} type="button">Pokaz komponenty</button>
          <br/>
          <button onClick={() => {setComponentsDodawania(2);setPokazywanie("AddGlobalInformation")}} type="button">Pokaz dodawania</button>
          <br/>
          {componentsDodawania === 1 && (<Components></Components>)}
          {componentsDodawania === 2 && (<Dodawania></Dodawania>)}
      </div>
  )
}
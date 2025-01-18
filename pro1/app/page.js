'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Components from "./pokazywanie/Components"




export default function Home() {
    return (
      <div>
         <Components></Components>
      </div>
  )
}
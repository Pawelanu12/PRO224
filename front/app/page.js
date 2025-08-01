'use client'
<<<<<<< HEAD
import Image from "next/image";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Home() {
  const {router}=useContext(GlobalContext)
  useEffect(()=>{
      router.push("/gromada")
  },[])

    return(<div></div>)

}
=======


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
>>>>>>> 61f82326b5d5157790318d24f16b57e55aeb24b1

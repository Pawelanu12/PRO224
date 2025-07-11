'use client'
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

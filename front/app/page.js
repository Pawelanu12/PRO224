'use client'
import Image from "next/image";
import {useContext, useEffect, useRef} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useSession} from "next-auth/react";

export default function Home() {
  const {router}=useContext(GlobalContext)
  useEffect(()=>{
      router.push("/gromada")
  },[])

    return(<div></div>)

}

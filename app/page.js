'use client'
import Image from "next/image";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/GlobalProvider";
import {useRouter} from "next/navigation";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function Home() {
  const {router}=useContext(GlobalContext)
  useEffect(()=>{
      router.push("/gromada")
  },[])

    return(<div></div>)

}

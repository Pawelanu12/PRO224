'use client'

import forGlobalInfo from "./data/forGlobalInfo.json"
import forEvent from "./data/forEvent.json"
import GlobalInformation from "@/app/classes/GlobalInformation";
import Event from "@/app/classes/Event";
import {useState} from "react";
import Events from "@/app/pokazywanie/Events";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import GlobalInfo from "@/app/pokazywanie/GlobalInfo";
import WyberzCoPokazywacz from "@/app/pokazywanie/WyberzCoPokazywacz";
import PokazywanieUsera from "@/app/pokazywanie/PokazywanieUsera";


export default function Home() {

   const {pokazywanie,events,globalInfo}=useContext(GlobalContext)

  return (

      <div>
        <p>new</p>
          <WyberzCoPokazywacz></WyberzCoPokazywacz>
          {pokazywanie==="GlobalInfo" &&<GlobalInfo globalInfo={globalInfo}></GlobalInfo>}
          {pokazywanie==="Events" && <Events events={events}></Events>}
          <PokazywanieUsera></PokazywanieUsera>

          <p>end</p>
      </div>
  );
}
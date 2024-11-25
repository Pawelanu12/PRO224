'use client'
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import AddGlobalInformation from "@/app/add/AddGlobalInformation";
import WyberzJakieComponentyPokazywacz from "@/app/pokazywanie/WyberzJakieComponentyPokazywacz";
import GlobalInfo from "@/app/pokazywanie/GlobalInfo";
import Events from "@/app/pokazywanie/Events";
import PokazywanieUsera from "@/app/pokazywanie/PokazywanieUsera";


export default function Components() {

    const {pokazywanie,events,globalInfo}=useContext(GlobalContext)

    return (

        <div>

            <WyberzJakieComponentyPokazywacz></WyberzJakieComponentyPokazywacz>
            {pokazywanie==="GlobalInfo" &&<GlobalInfo globalInfo={globalInfo}></GlobalInfo>}
            {pokazywanie==="Events" && <Events events={events}></Events>}
            <PokazywanieUsera></PokazywanieUsera>


        </div>
    );
}
'use client'
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import WyberzJakieComponentyPokazywacz from "@/app/pokazywanie/WyberzJakieComponentyPokazywacz";
import GlobalInfo from "@/app/weluElemntowJednejKlasy/GlobalInfo";
import Events from "@/app/weluElemntowJednejKlasy/Events";
import Kwoty from "../weluElemntowJednejKlasy/Kwoty"
import Users from "@/app/weluElemntowJednejKlasy/Users";
import LogIn from "@/app/pokazywanie/LogIn";
import Sprawnosci from "@/app/weluElemntowJednejKlasy/Sprawnosci";
import AddUser from "@/app/add/AddUser";
import AddKwota from "@/app/add/AddKwota";
import User from "@/app/classes/User";
import AddGlobalInformation from "@/app/add/AddGlobalInformation";
import AddEvent from "@/app/add/AddEvent";
import AddSprawnosc from "@/app/add/AddSprawnosc";
import EditHaslo from "@/app/edit/EditHaslo";
import EditEvent from "@/app/edit/EditEvent";


export default function Components() {

    const {pokazywanie,events,globalInfo,pokazywanieUsera}=useContext(GlobalContext)

    return (

        <div>

            <WyberzJakieComponentyPokazywacz></WyberzJakieComponentyPokazywacz>
            {pokazywanie==="GlobalInfo" &&<GlobalInfo globalInfo={globalInfo}></GlobalInfo>}
            {pokazywanie==="Events" && <Events events={events}></Events>}
            {pokazywanie==="Kwoty" && <Kwoty id={pokazywanieUsera}></Kwoty>}
            {pokazywanie==="Users" && <Users ></Users>}
            {pokazywanie==="LogIn" && <LogIn ></LogIn>}
            {pokazywanie==="Sprawnosci" && <Sprawnosci ></Sprawnosci>}
            {pokazywanie==="AddUser" &&<AddUser></AddUser>}
            {pokazywanie==="AddKwota" &&<AddKwota></AddKwota>}
            {pokazywanie==="User" &&<User></User>}
            {pokazywanie==="AddGlobalInformation" &&<AddGlobalInformation></AddGlobalInformation>}
            {pokazywanie==="AddEvent" &&<AddEvent></AddEvent>}
            {pokazywanie==="AddSprawnosc" &&<AddSprawnosc></AddSprawnosc>}
            {/*{pokazywanie==="EditHaslo" &&<EditHaslo></EditHaslo>}*/}
            {/*{pokazywanie==="EditEvent" &&<EditEvent></EditEvent>}*/}






        </div>
    );
}
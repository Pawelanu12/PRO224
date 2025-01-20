
'use client'
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import WyberzJakieComponentyPokazywacz from "@/app/pokazywanie/WyberzJakieComponentyPokazywacz";
import GlobalInfo from "@/app/weluElemntowJednejKlasy/GlobalInfo";
import Events from "@/app/weluElemntowJednejKlasy/Events";
import MyEvents from "@/app/weluElemntowJednejKlasy/MyEvents";
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
import EditGlobalInformation from "@/app/edit/EditGlobalInformation";
import EditSprawnosc from "@/app/edit/EditSprawnosc";
import AddUserAchivement from "@/app/add/AddUserAchivement";
import MySprawnosci from "@/app/weluElemntowJednejKlasy/MySprawnosci";
import EditKwota from "@/app/edit/EditKwota";
import WplatyUsera from "@/app/weluElemntowJednejKlasy/WplatyUsera";
import EditUserInformation from "@/app/edit/EditUserInformation";
import EditProfileByAdmin from "@/app/edit/EditProfileByAdmin";
import PageUsera from "@/app/weluElemntowJednejKlasy/PageUsera";


export default function Components() {

    const {pokazywanie,events,globalInfo,pokazywanieUsera,edit}=useContext(GlobalContext)

    return (

        <div>

            <WyberzJakieComponentyPokazywacz></WyberzJakieComponentyPokazywacz>
            {pokazywanie==="GlobalInfo" &&(!edit &&<GlobalInfo globalInfo={globalInfo}></GlobalInfo>||
                edit&&<EditGlobalInformation></EditGlobalInformation>)}
            {pokazywanie==="Events" &&(!edit &&<Events></Events>||edit&&<EditEvent></EditEvent>)}
            {pokazywanie==="Kwoty" &&(!edit && <Kwoty ></Kwoty>||edit&&<EditKwota></EditKwota>)}
            {pokazywanie==="Users" && (!edit &&<Users></Users>||edit&&<EditUserInformation></EditUserInformation>)}
            {pokazywanie==="LogIn" && <LogIn ></LogIn>}
            {pokazywanie==="Sprawnosci" &&(!edit && <Sprawnosci ></Sprawnosci>||edit&&<EditSprawnosc></EditSprawnosc>)}
            {pokazywanie==="AddUser" &&<AddUser></AddUser>}
            {pokazywanie==="AddKwota" &&<AddKwota></AddKwota>}
            {pokazywanie==="User" &&(!edit &&<PageUsera></PageUsera>||edit&&<EditUserInformation></EditUserInformation>)}
            {pokazywanie==="AddGlobalInformation" &&<AddGlobalInformation></AddGlobalInformation>}
            {pokazywanie==="AddEvent" &&<AddEvent></AddEvent>}
            {pokazywanie==="AddSprawnosc" &&<AddSprawnosc></AddSprawnosc>}
            {pokazywanie==="MyEvents" &&<MyEvents></MyEvents>}
            {pokazywanie==="UserAchivement" &&<AddUserAchivement></AddUserAchivement>}
            {pokazywanie==="MySprawnosci" &&<MySprawnosci></MySprawnosci>}
            {pokazywanie==="NotMySprawnosci" &&<MySprawnosci></MySprawnosci>}
            {pokazywanie==="Wplaty usera" &&<WplatyUsera></WplatyUsera>}
            {pokazywanie==="EditProfileByAdmin" &&<EditProfileByAdmin></EditProfileByAdmin>}

            {/*{pokazywanie==="EditHaslo" &&<EditHaslo></EditHaslo>}*/}
            {/*{pokazywanie==="EditEvent" &&<EditEvent></EditEvent>}*/}





        </div>
    );
}

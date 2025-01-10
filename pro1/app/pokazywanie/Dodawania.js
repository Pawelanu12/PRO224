import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import AddGlobalInformation from "@/app/add/AddGlobalInformation";
import WyberzJakieDodawaniePokazywacz from "./WyberzJakieDodawaniePokazywac"
import AddEvent from "@/app/add/AddEvent";
import AddSprawnosc from "@/app/add/AddSprawnosc";
import AddKwota from "@/app/add/AddKwota";
import AddUser from "@/app/add/AddUser";



export default function Dodawania() {

    const {pokazywanie,events,globalInfo}=useContext(GlobalContext)

    return (

        <div>

            <WyberzJakieDodawaniePokazywacz></WyberzJakieDodawaniePokazywacz>





        </div>
    );
}
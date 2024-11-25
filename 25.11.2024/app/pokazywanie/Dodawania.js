import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import AddGlobalInformation from "@/app/add/AddGlobalInformation";
import WyberzJakieDodawaniePokazywacz from "./WyberzJakieDodawaniePokazywac"
import AddEvent from "@/app/add/addEvent";



export default function Dodawania() {

    const {pokazywanie,events,globalInfo}=useContext(GlobalContext)

    return (

        <div>

            <WyberzJakieDodawaniePokazywacz></WyberzJakieDodawaniePokazywacz>
            {pokazywanie==="AddGlobalInformation" &&<AddGlobalInformation></AddGlobalInformation>}
            {pokazywanie==="AddEvent" &&<AddEvent></AddEvent>}




        </div>
    );
}
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function WyberzJakieDodawaniePokazywacz(){
    const {pokazywanie,onPokazywanieChange}=useContext(GlobalContext)
    return (
        <div style={{float:"right"}}>
            Sortowanie
            <select id={'cat'} onChange={onPokazywanieChange}
                    style={{color: 'red', border: '1px solid black', margin: '2px'}}>
                <option value="AddGlobalInformation">Add new global info</option>
                <option value="AddEvent">Add new event</option>
                <option value="AddUser">Add new user</option>

            </select>
        </div>
    )
}
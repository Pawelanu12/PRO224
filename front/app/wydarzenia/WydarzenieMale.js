import {dateToString} from "@/app/wydarzenia/dateToString";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


export default function WydarzenieMale({wydarzenie}){
    const {replaceClick}=useContext(GlobalContext);
    return(
        <div className={"wydarzenie-male"}
             onClick={() => replaceClick("","/wydarzenia/" + wydarzenie.id)}>
            <p className={"wydarzenie-male-nazwa"}>{wydarzenie.nazwa}</p>
            <img className={"wydarzenie-male-img"}  src="/images/event.png" loading="lazy"
                 alt="cat"/>


            <p className={"wydarzenie-male-start-data"}>{dateToString(new Date(wydarzenie.dataWyjazdu))}</p>
            <p className={"wydarzenie-male-end-data"}>{dateToString(new Date(wydarzenie.dataZakonczenia))}</p>
        </div>
    )

}
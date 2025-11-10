import {dateToString} from "@/app/wydarzenia/dateToString";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

const month=["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paż","Lis","Gru"]
const stringToDate=(str)=>{
    const date = new Date(str);
    return month[date.getMonth()]+"  "+date.getDate()
}

export default function WydarzenieMale({wydarzenie,width}){
    const {replaceClick}=useContext(GlobalContext);

    return(
        <div className={"wydarzenie-male"} style={{width:width+"px"}}
             onClick={() => replaceClick("","/wydarzenia/" + wydarzenie.id)}>
            {/*<div className={"wydarzenie-male-img"}></div>*/}
            {/*<p className={"wydarzenie-male-nazwa"}>{wydarzenie.nazwa}</p>*/}
            <img className={"wydarzenie-male-img"}  src="/images/event.png" loading="lazy"
                 alt="cat" style={{height:width/2.1+"px"}}/>

            <div className={"wydarzenie-male-data-div"}>
                <div className={"wydarzenie-male-data"}>{stringToDate(wydarzenie.dataWyjazdu)}</div>
                <div className={"wydarzenie-male-data"}>{stringToDate(wydarzenie.dataZakonczenia)}</div>
            </div>
            <p className={"wydarzenie-male-nazwa"}>{wydarzenie.nazwa}</p>

        </div>
    )

}
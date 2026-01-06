import {dateToString} from "@/app/wydarzenia/dateToString";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const month=["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paż","Lis","Gru"]
const stringToDate=(str)=>{
    const date = new Date(str);
    return month[date.getMonth()]+"  "+date.getDate()
}

export default function WydarzenieMale({wydarzenie,width}){
    const {pushClick}=useContext(GlobalContext);
    return(
        <div className={"bg-[#222522] m-2.5 min-w-75 text-center text-black rounded-2.5"} style={{width:width+"px"}}
             onClick={() => pushClick("","/wydarzenia/" + wydarzenie.id)}>
            {wydarzenie.zdjecia.length===0&&<img className={"rounded-2.5] w-full"} src="/images/event.png" loading="lazy"
                                                 alt="cat" style={{height:width/2.1+"px"}}/>}

            {wydarzenie.zdjecia.length>0&&
                <img className={"rounded-2.5 w-full"}
                     src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/wydarzenia/${wydarzenie.zdjecia[0]}`} loading="lazy"
                     alt="cat" style={{height:width/1.5+"px"}}/>}

            <div className={"flex flex-row"}>
                <div className={"ml-5 mr-2.5 w-7.5 -mt-8.25 " +
                    "bg-white rounded-2 shadow-grey-10"}>{stringToDate(wydarzenie.dataWyjazdu)}</div>
                <div className={"ml-5 mr-2.5 w-7.5 -mt-8.25 " +
                    "                    bg-white rounded-2 shadow-grey-10"}>{stringToDate(wydarzenie.dataZakonczenia)}</div>
            </div>
            <p className={"h-20 p-1.25 text-white text-center"}>{wydarzenie.nazwa}</p>

        </div>
    )

}
'use client'
import Image from "next/image";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useRouter} from "next/navigation";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function Home() {
  const {cat,setCat,router}=useContext(GlobalContext)
  // const router = useRouter()
    const text= [
        {"linia": "1. Gdyńska Gromada Zuchów „Rycerze z Kamiennej Góry” jest jednostką organizacyjną Zwiazku Harcerstwa Rzeczypospolitej."},
        {"linia": ' Gromada działa od 11 października 2008 r. Należy do Gdyńskiego Hufca Harcerzy „Pasieka”.'},
        {"linia": "Do gromady należą zuchy w wieku od 7 do 11 lat."},
        {"linia": "Każdego roku na przełomie września i października przyjmujemy kilku nowych kandydatów na zuchów."},
        {"linia": "Z kolei najstarszym i najdzielniejszym proponujemy wstąpienie do drużyny harcerzy. "},
        {"linia": "Nasze zuchy najczęściej wstępują do 36. Gdyńskiej Drużyny Harcerzy"},
        {"linia": "Naszym zuchowym sąsiadem jest 3. Gdyńska Gromada Zuchów „Witomici”.\n" +
                "                  uaktualniono 2025-02-28"},

    ]


    return (
        <div>
            <NAVBARUNREGISTED/>
            <div className={"gromada"} style={{paddingTop:"50px"}}>
                <div style={{height:"200px"}}>

                </div>
          <div className={"centrowanyText"} >

          <p style={{fontSize:30,backgroundColor: "#1A1919"}}>O gromadzie</p>
              {text &&text.map((l,i)=>(<p key={i}>{l.linia}</p>))}
          </div>
          </div>
      </div>
  );
}

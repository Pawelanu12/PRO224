'use client'
import Image from "next/image";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/GlobalProvider";
import {useRouter} from "next/navigation";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function Home() {
  const {cat,setCat,router}=useContext(GlobalContext)
  // const router = useRouter()



  return (
      <div>
          <NAVBARUNREGISTED/>
          <div className={"gromada"}>
          <div style={{flex: 50}}></div>
          <div className={"centrowanyText"} style={{flex: 50}}>

          <p style={{fontSize:30}}>O gromadzie</p>
              <p >1. Gdyńska Gromada Zuchów „Rycerze z Kamiennej Góry” jest jednostką organizacyjną Zwiazku Harcerstwa Rzeczypospolitej.

              </p>
              <p> Gromada działa od 11 października 2008 r. Należy do Gdyńskiego Hufca Harcerzy „Pasieka”. </p>
              <p>Do gromady należą zuchy w wieku od 7 do 11 lat.
                  </p>
              <p>Każdego roku na przełomie września i października przyjmujemy kilku nowych kandydatów na zuchów.
                  </p>
              <p>Z kolei najstarszym i najdzielniejszym proponujemy wstąpienie do drużyny harcerzy. </p>
              <p>Nasze zuchy najczęściej wstępują do 36. Gdyńskiej Drużyny Harcerzy</p>
              <p>Naszym zuchowym sąsiadem jest 3. Gdyńska Gromada Zuchów „Witomici”.
                  uaktualniono 2025-02-28</p>
          </div>
          </div>
      </div>
  );
}

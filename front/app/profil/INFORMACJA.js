'use client'

import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";

export default function Informacja() {
        const {user,replaceClick}=useContext(GlobalContext)
    const {zdobyteSprawnosci,getZdobyteSprawnosci}=useContext(SprawnoscContext)

    useEffect(() => {
        console.log(user)
        getZdobyteSprawnosci(user.id||1)
    }, []);
    return(
        <div className={"flexRow"} style={{backgroundColor: "#3A4F39",margin:"20px"}}>
            <div style={{margin: "10px", borderRight: "solid 1px black", color: "black",flex:1}}>
                <p>Informacje</p>
                <div style={{backgroundColor: "#D9D9D9", marginRight: "10px"}}>
                    <p>data urodzenia: {user.dataUrodzenia}</p>
                    <p>nazwa gromady: {user.gromada}</p>
                    <p>data dolączenia do gromady: {user.dataDolaczeniaDoGromady}</p>
                </div>
            </div>
            <div style={{
                margin: "10px",
                paddingRight: 10,
                marginLeft: 0,
                borderRight: "solid 1px black",
                color: "black",
                flex: 1
            }}>
                <div className={"flexRow"} style={{backgroundColor: "#D9D9D9", width: "100%",justifyContent:"space-between"}}>
                    <p>Zdobyte sprawnosci</p>
                    <button onClick={(e)=>replaceClick(e,'/sprawnosci/zdobyte')} style={{backgroundColor: "#555353", width: "50px", height: "25px", margin: "10px"}}>Węcej
                    </button>
                </div>
                {zdobyteSprawnosci&&zdobyteSprawnosci.length&&<div className={"flexRow"} style={{backgroundColor: "#D9D9D9"}}>
                    {zdobyteSprawnosci.map((s, i) => <div key={i} style={{paddingLeft: "5px", paddingTop: "5px"}}>
                        <img src={s.obraz} alt={"obraz"} style={{width: "100px", height: "100px"}}/>
                        <p style={{textAlign: "center"}}>{s.nazwa}</p>
                    </div>)}

                </div>}

            </div>
            <div style={{margin: "10px", marginRight: 0, color: "black", flex: 1}}>
                <p>Obserwowani</p>
                <div style={{backgroundColor: "#262020", marginRight: "10px"}}>
                    <p>data urodzenia: {user.data_urodzenia}</p>
                    <p>nazwa gromady: {user.gromada}</p>
                    <p>data dolączenia do gromady: {user.data_dolaczenia_do_gromady}</p>
                </div>
            </div>
        </div>
    )
}
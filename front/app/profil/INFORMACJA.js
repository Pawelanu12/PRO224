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
        <div className={"profil-informacja"} >
            <div className={"lewy"}>
                <p>Informacje</p>
                <div >
                    <p>data urodzenia: {user.dataUrodzenia}</p>
                    <p>nazwa gromady: {user.gromada}</p>
                    <p>data dolączenia do gromady: {user.dataDolaczeniaDoGromady}</p>
                </div>
            </div>
            <div className={"centralny"} style={{
                // margin: "10px",
                // paddingRight: 10,
                // marginLeft: 0,
                // borderRight: "solid 1px black",
                // color: "black",
                // flex: 1
            }}>
                <div className={"div1"}
                >
                    <p>Zdobyte sprawnosci</p>
                    <button onClick={(e)=>replaceClick(e,'/sprawnosci/zdobyte')}
                          >Węcej
                    </button>
                </div>
                {zdobyteSprawnosci&&zdobyteSprawnosci.length&&<div className={"flexRow"} style={{backgroundColor: "#D9D9D9"}}>
                    {zdobyteSprawnosci.map((s, i) => <div key={i} style={{paddingLeft: "5px", paddingTop: "5px"}}>
                        <img src={s.obraz} alt={"obraz"} style={{width: "100px", height: "100px"}}/>
                        <p style={{textAlign: "center"}}>{s.nazwa}</p>
                    </div>)}

                </div>}

            </div>
            <div className={"prawy"} >
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
'use client'


import {Field} from "formik";
import {useContext, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Filter() {
    const [hidden, setHidden] = useState(true);
    const {setTyp,setNazwa,setData}=useContext(WydarzeniaContext)
    const {replaceClick}=useContext(GlobalContext)
    const changeNazwa=(e)=>{
        console.log(e.target.value);
        if(!e.target.value||e.target.value.length<1){
            setHidden(true);
        }
        else {
            setHidden(false);
        }
        setNazwa(e.target.value)

    }
    const changeTyp=(e)=>{
        console.log(e.target.value);
        setTyp(e.target.value)


    }
    const changeData=(e)=>{
        console.log(e.target.value);
        setData(e.target.value)
    }
    return (
        <div className={"fiksacjaWLewejCzesciEkrana"}>
            <button style={{border: "2px solid white"}}
                    onClick={(e) => replaceClick(e, "/admin/add/wydarzenie")}>Dodaj
                nowe wydarzenie
            </button>
            <label style={{margin: "30px"}}>
                <p style={{fontSize: 12, color: "#1A1919"}} hidden={!hidden}>nazwa wydarzenia</p>
                <p style={{fontSize: 12}} hidden={hidden}>nazwa wydarzenia</p>
                <input style={{
                    borderBottom: "solid green 1px",
                    backgroundColor: "#1A1919",
                    color: "white",
                }} type={"text"} onChange={(e) => changeNazwa(e)} placeholder={"nazwa wydarzenia..."}/></label>
            <label>
                <select onChange={(e) => changeTyp(e)}
                        style={{backgroundColor: "#3A4F39", width: "183px", color: "black",}}>
                    <option id={"Typ wydarzenia"}>Typ wydarzenia</option>
                    <option id={"wycieczka"}>wycieczka</option>
                    <option id={"podroz"}>podroz</option>
                </select></label>
            <label>
                <p style={{paddingTop: "30px"}}>Wydarzenia od takiej daty</p>
                <input onChange={(e) => changeData(e)} style={{backgroundColor: "#3A4F39"}} type="date"/></label>
        </div>
    )
}
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
        <div>
            <div className={"wydarzenia-filter-div"}>

                <label className={"wydarzenia-filter-label1"}>
                    <p className={"wydarzenia-filter-hidden-p"} hidden={!hidden}>nazwa wydarzenia</p>
                    <p className={"wydarzenia-filter-nazwa-p"} hidden={hidden}>nazwa wydarzenia</p>
                    <input className={"wydarzenia-filter-nazwa-input"}
                           type={"text"}
                           onChange={(e) => changeNazwa(e)}
                           placeholder={"nazwa wydarzenia..."}/></label>

                <label className={"wydarzenia-filter-label2"}>
                    <select onChange={(e) => changeTyp(e)}
                            className={"wydarzenia-filter-select"}
                            style={{backgroundColor: "#3A4F39", width: "183px", color: "black",}}>
                        <option className={"wydarzenia-filter-option"} id={"Typ wydarzenia"}>Typ wydarzenia</option>
                        <option className={"wydarzenia-filter-option"} id={"wycieczka"}>wycieczka</option>
                        <option className={"wydarzenia-filter-option"} id={"podroz"}>podroz</option>
                    </select></label>

                <label className={"wydarzenia-filter-label3"}>
                    <p className={"wydarzenia-filter-data-p"}>Wydarzenia od takiej daty</p>
                    <input className={"wydarzenia-filter-data-inpt"}
                           onChange={(e) => changeData(e)}
                           type="date"/></label>


            </div>
            <div className={"dodaj-wydarzenie-div"}>
                <button className={"dodaj-wydarzenie-button"}
                        onClick={(e) => replaceClick(e, "/admin/add/wydarzenie")}>Dodaj
                    nowe wydarzenie
                </button>
            </div>
        </div>
            )
            }
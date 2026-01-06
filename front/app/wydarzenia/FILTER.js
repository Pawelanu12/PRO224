'use client'

import "../globals.css";
import {useContext, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Filter() {
    const [hidden, setHidden] = useState(true);
    const {setTyp,setNazwa,setData}=useContext(WydarzeniaContext)
    const {pushClick}=useContext(GlobalContext)
    const [show,setShow]=useState(false)
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
        <div >
            <div className={"hidden w-48 sm:flex flex-col bg-[#1d201d] shadow-lg h-72 rounded-xl m-8"}>

                <label className={"w-full mt-1"}>
                    <p className={"text-[#1d201d] text-[16px]"} hidden={!hidden}>nazwa wydarzenia</p>
                    <p className={"text-[16px]"} hidden={hidden}>nazwa wydarzenia</p>
                    <input className={"text-white bg-[#1A1919] appearance-none"}
                           type={"text"}
                           onChange={(e) => changeNazwa(e)}
                           placeholder={"nazwa wydarzenia..."}/></label>

                <label className={"flex flex-col mt-6"}>
                    <select onChange={(e) => changeTyp(e)}
                            className={"bg-[#3A4F39] w-44 text-black mt-6"}
                            // style={{backgroundColor: "#3A4F39", width: "183px", color: "black",}}
                    >
                        <option  id={"Typ wydarzenia"}>Typ wydarzenia</option>
                        <option  id={"wycieczka"}>wycieczka</option>
                        <option  id={"podroz"}>podroz</option>
                    </select></label>

                <label className={"mt-4"}>
                    <p>Wydarzenia od takiej daty</p>
                    <input
                           onChange={(e) => changeData(e)}
                           type="date"/></label>


            </div>
            <div className={"hidden sm:block mt-12 flex flex-col justify-center"}>
                <button className={"border-[2px] border-solid border-black"}
                        onClick={(e) => pushClick(e, "/admin/add/wydarzenie")}>Dodaj
                    nowe wydarzenie
                </button>
            </div>
            <div className={"sm:hidden w-full fixed top-[5opx] h-full flex flex-col "}>
                <button className={"bg-[#000000] w-full"}
                onClick={()=>setShow(!show)}>
                    {show?"Zamknij filtry":"Pokaz filtry"}
                </button>
                {show && <div className={"sm:hidden fixed w-full flex flex-col bg-[#1d201d] shadow-lg rounded-xl mt-8"}>

                    <label className={"w-full mt-1"}>
                        <p className={"text-[#1d201d] text-[16px]"} hidden={!hidden}>nazwa wydarzenia</p>
                        <p className={"text-[16px]"} hidden={hidden}>nazwa wydarzenia</p>
                        <input className={"text-white bg-[#1A1919] appearance-none"}
                               type={"text"}
                               onChange={(e) => changeNazwa(e)}
                               placeholder={"nazwa wydarzenia..."}/></label>

                    <label className={"flex flex-col mt-6"}>
                        <select onChange={(e) => changeTyp(e)}
                                className={"bg-[#3A4F39] w-44 text-black mt-6"}
                            // style={{backgroundColor: "#3A4F39", width: "183px", color: "black",}}
                        >
                            <option id={"Typ wydarzenia"}>Typ wydarzenia</option>
                            <option id={"wycieczka"}>wycieczka</option>
                            <option id={"podroz"}>podroz</option>
                        </select></label>

                    <label className={"mt-4"}>
                        <p>Wydarzenia od takiej daty</p>
                        <input
                            onChange={(e) => changeData(e)}
                            type="date"/></label>


                </div>

                }


            </div>
        </div>
    )
}
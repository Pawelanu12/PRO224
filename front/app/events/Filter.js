'use client'

import {useContext, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/EventProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Filter() {
    const [hidden, setHidden] = useState(true);
    const {setTyp,setNazwa,setData}=useContext(WydarzeniaContext)
    const {pushClick,user}=useContext(GlobalContext)
    const [show,setShow]=useState(false)
    const changeNazwa=(e)=>{
        if(!e.target.value||e.target.value.length<1){
            setHidden(true);
        }
        else {
            setHidden(false);
        }
        setNazwa(e.target.value)

    }
    const changeTyp=(e)=>{
        setTyp(e.target.value)


    }
    const changeData=(e)=>{
        setData(e.target.value)
    }
    return (
        <div >
            <div className={"hidden w-50 sm:flex flex-col bg-[#1d201d] shadow-lg h-72 rounded-xl m-8"}>

                <label className={"w-full mt-1 ml-2"}>
                    <p className={"text-[#1d201d] text-[16px]"} hidden={!hidden}>nazwa wydarzenia</p>
                    <p className={"text-[16px]"} hidden={hidden}>nazwa wydarzenia</p>
                    <input className={"bg-[#1A1919] appearance-none"}
                           type={"text"}
                           onChange={(e) => changeNazwa(e)}
                           placeholder={"nazwa wydarzenia..."}/></label>

                <label className={"flex flex-col mt-6 ml-2"}>
                    <select onChange={(e) => changeTyp(e)}
                            className={" w-44 bg-[#1A1919] mt-6"}
                            // style={{backgroundColor: "#3A4F39", width: "183px", color: "black",}}
                    >
                        <option  id={"Typ wydarzenia"}>Typ wydarzenia</option>
                        <option  id={"wycieczka"}>wycieczka</option>
                        <option  id={"podroz"}>podroz</option>
                    </select></label>

                <label className={"mt-4 ml-2 "}>
                    <p>Wydarzenia od takiej daty</p>
                    <input className={" bg-[#1A1919] text-white border border-white accent-white"}
                           onChange={(e) => changeData(e)}
                           type="date"/></label>


            </div>
            {user&&(user.typUzytkownika==="DRUZYNOWY"||user.typUzytkownika==="PRZYBOCZNY")&&<div className={"hidden sm:flex mt-12 sm:flex-col justify-center"}>
                <button className={"mt-2 mx-4 rounded-md border border-white py-2 text-white\n" +
                    "                             hover:bg-white hover:text-black transition"}
                        onClick={(e) => pushClick(e, "/admin/add/event")}>Dodaj
                    nowe wydarzenie
                </button>
            </div>}
            <div className={"sm:hidden w-full fixed top-[5opx] h-full flex flex-col "}>
                <button className={"bg-[#000000] w-full"}
                        onClick={() => setShow(!show)}>
                    {show ? "Zamknij filtry" : "Pokaz filtry"}
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
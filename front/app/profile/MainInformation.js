import {useContext, useState} from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import {FaPencil} from "react-icons/fa6";

export default function MainInformation({ item, setItem,uzytkownik }) {
    const {editUser,pushClick,user}= useContext(GlobalContext);
    const [form,setForm] = useState({
        login:uzytkownik.login,
        imie:uzytkownik.imie,
        nazwisko:uzytkownik.nazwisko,
    })
    const [file, setFile] = useState();
    const [edit,setEdit] = useState(false)

   const onSend=()=>{
        console.log(form)
       editUser(uzytkownik.id,form)
        setEdit(false)
    }
    return (
        <div className="bg-[#3A4F39] p-5">

            {/* GÓRA */}
            <div className={"flex flex-wrap items-end flex-row"}>
                <img
                    src={uzytkownik.ikona || "/images/user_logo.png"}
                    alt="ikona"
                    className="w-16 h-16 m-2.5 rounded-full object-cover"
                />
                {!edit&&<p className="pb-2">
                    <span>{uzytkownik.login}</span>
                    <span>({uzytkownik.imie}</span>
                    <span> {uzytkownik.nazwisko})</span>
                </p>}
                {edit&&user.id===uzytkownik.id&& <div className="pl-2 flex flex-col">
                    <label>Login:<input
                            onChange={(e)=>setForm({...form,login:e.target.value})}
                                        className={"bg-white text-black m-1"} defaultValue={uzytkownik.login}/> </label>
                    <label>Imię: <input
                        onChange={(e)=>setForm({...form,imie:e.target.value})}
                                        className={"bg-white text-black m-1"} defaultValue={uzytkownik.imie}/></label>
                    <label>Nazwisko: <input
                        onChange={(e)=>setForm({...form,nazwisko:e.target.value})}
                                            className={"bg-white text-black m-1"} defaultValue={uzytkownik.nazwisko}/></label>
                    <div>
                        <button onClick={() => setEdit(!edit)}
                                className=" bg-red-800 py-2 mr-2 px-1 rounded disabled:opacity-50 hover:bg-red-600">
                            anuluj zmiany
                        </button>
                        <button
                            onClick={onSend}
                            className="bg-green-800 py-2 px-1 rounded disabled:opacity-50 hover:bg-green-600">
                            potwerdż zmiany
                        </button>
                    </div>
                </div>}
                {!edit&&user.id===uzytkownik.id && <button onClick={() => setEdit(!edit)}
                                  className={"mb-6 ml-2"}><FaPencil/></button>}
            </div>

            <div className="border-t border-black my-2"/>

            {/* MENU */}
            <div className="flex justify-between items-center flex-wrap">

                <div className="flex gap-2 flex-col sm:flex-row">
                    {((user?.typUzytkownika==="RODZIC"&&user.id===uzytkownik.id)?["Posty", "Informacje", "Dzieci"]:["Posty", "Informacje"])
                        .map((name) => (
                        <button
                            key={name}
                            onClick={() => setItem(name)}
                            className={`px-3 py-1 rounded 
                                ${item === name
                                ? "bg-black text-white"
                                : "bg-[#354545] text-white hover:bg-black"
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {user.id===uzytkownik.id&&<div className="bg-[#354545] mt-2 px-3 py-1 rounded">
                    <button className="text-white" onClick={() => pushClick("", "/profile/change-password")}>Zmień
                        hasło
                    </button>
                </div>}
            </div>
        </div>
    );
}

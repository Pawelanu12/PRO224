import {useContext, useState} from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import {FaPencil} from "react-icons/fa6";

export default function MainInformation({ item, setItem,user }) {
    const {editUser}= useContext(GlobalContext);
    const [form,setForm] = useState({
        login:user.login,
        imie:user.imie,
        nazwisko:user.nazwisko,
    })
    const [file, setFile] = useState();
    const [edit,setEdit] = useState(false)

   const onSend=()=>{
        console.log(form)
       editUser(user.id,form)
        setEdit(false)
    }
    return (
        <div className="bg-[#3A4F39] p-5">

            {/* GÓRA */}
            <div className={"flex flex-wrap items-end flex-row"}>
                <img
                    src={user.ikona || "/images/ikona.png"}
                    alt="ikona"
                    className="w-16 h-16 m-2.5 rounded-full object-cover"
                />
                {!edit&&<p className="pb-2">
                    <span>{user.login}</span>
                    <span>({user.imie}</span>
                    <span> {user.nazwisko})</span>
                </p>}
                {edit&& <div className="pl-2 flex flex-col">
                    <label>Login:<input
                            onChange={(e)=>setForm({...form,login:e.target.value})}
                                        className={"bg-white text-black m-1"} defaultValue={user.login}/> </label>
                    <label>Imię: <input
                        onChange={(e)=>setForm({...form,imie:e.target.value})}
                                        className={"bg-white text-black m-1"} defaultValue={user.imie}/></label>
                    <label>Nazwisko: <input
                        onChange={(e)=>setForm({...form,nazwisko:e.target.value})}
                                            className={"bg-white text-black m-1"} defaultValue={user.nazwisko}/></label>
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
                {!edit && <button onClick={() => setEdit(!edit)}
                                  className={"mb-6 ml-2"}><FaPencil/></button>}
            </div>

            <div className="border-t border-black my-2"/>

            {/* MENU */}
            <div className="flex justify-between items-center flex-wrap">

                <div className="flex gap-2 flex-col sm:flex-row">
                    {["Posty", "Informacje", "Zdjecia"].map((name) => (
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

                <div className="bg-[#354545] mt-2 px-3 py-1 rounded">
                    <button className="text-white">Zmień hasło</button>
                </div>
            </div>
        </div>
    );
}

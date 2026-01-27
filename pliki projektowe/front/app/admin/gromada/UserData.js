'use client'

import { FaTrash } from "react-icons/fa";
import {useContext, useRef} from "react";
import {AdminContext} from "@/app/providers/AdminProvider";
import TableField from "@/app/admin/gromada/TableField";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function UserData({ user,id}) {
    const {setUsers,updateTyp,setOpen,setId,setAction,changeParrents}=useContext(AdminContext);
    const {pushClick}=useContext(GlobalContext)

    const inputRef = useRef(null)
    const handleChange = (e) => {
            setUsers(prev => prev.map(u => u.id === user.id ? {...user, typUzytkownika: e.target.value} : u))
            updateTyp(user.id, e.target.value)
    };

    return (

        <tr className="hover:bg-gray-50 transition">
            <td className="w-[100px] px-4 py-3 text-gray-800 cursor-pointer hover:underline"
                onClick={(e)=>pushClick(e,`/profile/user/${user.id}`)}>{user.id}</td>

            <TableField data={user.login}/>


            <TableField data={user.imie}/>
            <TableField data={user.nazwisko}/>
            <TableField data={user.email}/>


            <td className="w-[100px] px-4 py-3 text-gray-800">
                {user.nrTelefonu}
            </td>

            <td className="w-[150px] px-4 py-3 text-gray-800">
                <select
                    // unselectable={(user.typUzytkownika!=="DRUZYNOWY").toString()}
                    disabled={user.id===id}
                    value={user.typUzytkownika}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                >
                    <option value="ZUCH">Zuch</option>
                    <option value="DRUZYNOWY">Drużynowy</option>
                    <option value="PRZYBOCZNY">Przyboczny</option>
                    <option value="RODZIC">Rodzic</option>
                    <option value="DEFAULT">Default</option>

                </select>

            </td>
            {user.typUzytkownika==="ZUCH"?<td> <div className="w-[200px] px-4 py-3 text-gray-800">

                    <input ref={inputRef}
                           placeholder={"id1,id2"}
                        defaultValue={
                        (user.rodzicId1&&user.rodzicId2)?(user?.rodzicId1 +","+ user?.rodzicId2)
                            :user.rodzicId1?user.rodzicId1:(user?.rodzicId2|| "") }
                        className="
                            w-[100px]
                            rounded-md
                            border border-gray-300
                            bg-white
                             py-1 px-1
                            text-sm text-gray-800
                            placeholder-gray-400
                            focus:border-blue-500
                            focus:outline-none
                            focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => {
                            const parrents=inputRef?.current.value;
                            if(parrents.length>0) {
                                const p=parrents.trim().split(",").map(a=>Number(a))
                                if(p.length===1&&p[0]) {

                                    changeParrents(user.id,{parentId1:p[0]});
                                }
                                if(p.length===2&&p[0]) {
                                    changeParrents(user.id,{parentId1:p[0],parentId2:p[1]});
                                }
                            }
                        }}
                        className="
                            rounded-md
                            bg-blue-500
                            px-1
                            w-[30px]
                            text-sm
                            text-white
                            hover:bg-blue-600
                            transition"
                    >
                        ➤
                    </button>
            </div>
            </td> : <td></td>}

            <td className="w-[150px] px-4 py-3 text-gray-800">
                <div className={"flex flex-row"}>

                    {user.typUzytkownika!=="DRUZYNOWY"&&<button onClick={() => {
                        setOpen(true);
                        setId(user.id)
                        setAction("delete")
                    }} className="text-red-500 hover:text-red-700 transition">
                        <FaTrash/>
                    </button>}

                    {user.typUzytkownika==="ZUCH"&&<button onClick={() => {
                        setOpen(true);
                        setId(user.id)
                        setAction("achievements")
                    }} className="text-red-500 hover:text-red-700 transition">
                        zarządzaj sprawnosciami
                    </button>}
                </div>
            </td>
        </tr>
    );
}

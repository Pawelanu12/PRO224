'use client'



import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

import User from "@/app/classes/User";

export default function Users(){
    const {users,getFromList,loading}=useContext(GlobalContext)
    useEffect(()=>{
        getFromList("Users")
    },[])
if(loading)return <p>loading...</p>
    if(!users)return <div></div>
    return(<div>
        {users.map(user=>(<div key={user.id}><User userq={user} key={user.id}></User><br/></div>))}
    </div>)
}


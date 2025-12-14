'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import EditPost from "@/app/forum/EditPost";
//menu opcji ktory uzytkownik moze robic z postem
export default function Opcji({autor,post}){
    const {user,replaceClick,setEdit}=useContext(GlobalContext);
    return (
        <div
            style={{position: "absolute", translate: "-230px",width:"230px",
                backgroundColor:"white",color:"black",paddingLeft:"5px"}}
        >
            {user.id!==autor&&<button>zgloś post</button>}
            {user.id!==autor&&<button>ukryj posty tego użytkownika</button>}
            {/*{user.id===autor&&<button onClick={(e) => {*/}
            {/*    setEdit(post)*/}
            {/*    replaceClick(e, `/forum/editPost/${post.id}`)*/}
            {/*}}>edytuj post</button>}*/}
            <EditPost post={post}/>
        </div>
    )
}
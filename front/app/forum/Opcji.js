'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import EditPost from "@/app/forum/dialogs/EditPost";
import {ForumContext} from "@/app/providers/ForumProvider";
//menu opcji ktory uzytkownik moze robic z postem
export default function Opcji({autor,post}){
    const {user,replaceClick,setEdit}=useContext(GlobalContext);
    const {deletePost}=useContext(ForumContext);
    return (
        <div
            style={{position: "absolute", translate: "-230px",width:"230px",
                backgroundColor:"white",color:"black",paddingLeft:"5px"}}
        >
            {user.login!==autor&&<button>zgloś post</button>}
            {user.login!==autor&&<button>ukryj posty tego użytkownika</button>}
            {user.login===autor&&<EditPost post={post}/>}
            {user.login===autor&& <button onClick={()=>{deletePost(post.id)}}>delete post</button>}
            {/*{user.id===autor&&<button onClick={(e) => {*/}
            {/*    setEdit(post)*/}
            {/*    replaceClick(e, `/forum/editPost/${post.id}`)*/}
            {/*}}>edytuj post</button>}*/}

        </div>
    )
}
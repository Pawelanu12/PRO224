'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import EditPost from "@/app/forum/dialogs/EditPost";
import {ForumContext} from "@/app/providers/ForumProvider";
import DeleteDialog from "@/app/functions/DeleteDialog";
//menu opcji ktory uzytkownik moze robic z postem
export default function Options({autor,post}){
    const {user}=useContext(GlobalContext);
    const {deletePost}=useContext(ForumContext);
    return (
        <div
            style={{position: "absolute", translate: "-230px",width:"230px",
                backgroundColor:"white",color:"black",paddingLeft:"5px"}}
        >
            {user.login===autor&&<EditPost post={post}/>}
            {(user.login===autor||user.typUzytkownika==="DRUZYNOWY")&& <DeleteDialog funkcjaDoUsunecia={deletePost} id={post.id}/>}
            {/*{user.login!==autor&&<button>zgloś post</button>}*/}
            {/*{user.login!==autor&&<button>ukryj posty tego użytkownika</button>}*/}

        </div>
    )
}
'use client'

import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import PostDialog from "@/app/forum/dialogs/PostDialog";
import {ForumContext} from "@/app/providers/ForumProvider";
import PostInformation from "@/app/forum/PostInformation";
//pokazuje jeden post

export default function Post({post}){
    const {changeLike,sharePost,setPosty} = useContext(ForumContext);
const {user}=useContext(GlobalContext)

    return (
        <div className={"mb-8 bg-[#4D644C] max-w-[500px] rounded-lg min-w-[250px]"}>
            <PostInformation post={post} />
                <div className={"flex flex-row flex-wrap justify-around mt-2 bg-[#3A4F39] rounded-lg"}>
                    <div>
                        <button onClick={(e) =>{e.preventDefault(); changeLike(post.id,user.id)}}>
                            ilosc polubeń {post.polubienia.length}</button>
                    </div>
                    <div>
                       <PostDialog post={post}/>
                    </div>
                    <div>
                        <button onClick={() => {
                            if (!post.share.includes(user.id)) {
                                sharePost(post.id, user.id)
                                setPosty(prev => prev
                                    .map(p => p.id !== post.id ? p
                                        : {...post, share: [...post.share, user.id]}))
                            }
                        }}
                        >ilosc udostepnien {post.share.length || 0}</button>
                    </div>
                </div>
        </div>
    )
}
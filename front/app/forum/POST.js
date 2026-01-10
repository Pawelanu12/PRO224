'use client'

import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Options from "@/app/forum/Options";
import PostDialog from "@/app/forum/dialogs/PostDialog";
import {ForumContext} from "@/app/providers/ForumProvider";
import PostInformation from "@/app/forum/PostInformation";
//pokazuje jeden post
const compare_dates=(data_posta)=> {
    const date1 = new Date(data_posta);
    const date2 = new Date();
    const millis=date2.getTime()-date1.getTime();
    const dni=millis/(1000*60*60*24)|0;
    const godziny=millis/(1000*60*60)|0;
    if(dni>=1)
        return dni+ ' dni temu'
    if(dni===0&&godziny>0)
        return godziny+ ' godzin temu'
    return "mniej niż godzina temu"
}

export default function Post({post,setShow}){
    const {changeLike} = useContext(ForumContext);
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
                        <button>ilosc udostepnien {post.udostepnienia||0}</button>
                    </div>
                </div>
            </div>
                )
            }
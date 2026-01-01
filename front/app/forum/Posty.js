'use client'

import {useContext, useEffect, useState} from "react";
import {ForumContext} from "@/app/providers/ForumProvider";
import Post from "@/app/forum/Post";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import DodawaniaPostu from "@/app/forum/dialogs/DodawaniaPostu";
import { Virtuoso } from "react-virtuoso";
import PostDialog from "@/app/forum/dialogs/PostDialog";



//pokazuje wiele postow
export default function Posty({wszystkie=true}){
    const {posty,loading,getPosty}=useContext(ForumContext)
    const {user}=useContext(GlobalContext)
    const [show,setShow]=useState(false)
    useEffect(()=>
    getPosty(),[user])
    if(loading)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>Loading...</p>
    let postyPokazywane=posty
    if(!wszystkie)
        postyPokazywane=posty.filter(p=>p.autorLogin===user.login)

    const reversed=[...postyPokazywane].reverse();




    return(
        <div className={"mt-20 md:mt-0 md:pl-[250px] w-full justify-items-center "} >
            <div className={"min-w-[341px] w-full max-w-[500px] items-center absolute p-5 z-2"}>

                <Virtuoso
                    components={{
                        Header: () => <DodawaniaPostu/>
                    }}
                    useWindowScroll
                    className={"h-[600px] rounded-lg"}
                    totalCount={reversed.length}
                    itemContent={(i) => <Post setShow={setShow} post={reversed[i]} />}
                />
            </div>
        </div>
    )
}

'use client'

import {useContext, useEffect} from "react";
import {ForumContext} from "@/app/providers/ForumProvider";
import Post from "@/app/forum/Post";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Posty({wszystkie=true}){
    const {posty,loading,getPosty}=useContext(ForumContext)
    const {user}=useContext(GlobalContext)
    useEffect(()=>
    getPosty(),[])
    if(loading)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>Loading...</p>
    if(!posty||posty.length===0)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>nie ma postów...</p>
    let postyPokazywane=posty
    if(!wszystkie)
        postyPokazywane=posty.filter(p=>p.autor===user.login)
    return(
        <div style={{paddingTop:"50px",paddingLeft:"250px", width:"100%",
           justifyItems:'center',height:"100vh"}}>
            <div className={"postyBackground"}>
            </div>
            <div className={"posty"}>
                {postyPokazywane.map((post,i)=><Post key={i} post={post}/>)}
            </div>
        </div>
    )
}
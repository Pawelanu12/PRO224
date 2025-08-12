'use client'

import {useContext} from "react";
import {ForumContext} from "@/app/providers/ForumProvider";
import POST from "@/app/forum/POST";

export default function WSZYSTKIEPOSTY(){
    const {posty,loading}=useContext(ForumContext)
    if(loading)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>Loading...</p>
    if(!posty||posty.length===0)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>nie ma postów...</p>
    return(
        <div style={{paddingTop:"50px",paddingLeft:"250px", width:"100%",
           justifyItems:'center',height:"100vh"}}>
            <div className={"postyBackground"}>
            </div>
            <div className={"posty"}>
                {posty.map((post,i)=><POST key={i} post={post}/>)}
            </div>
        </div>
    )
}
'use client'

import {useContext, useEffect} from "react";
import {ForumContext} from "@/app/providers/ForumProvider";
import Post from "@/app/forum/Post";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import DodawaniaPostu from "@/app/forum/dialogs/DodawaniaPostu";
import { Virtuoso } from "react-virtuoso";



//pokazuje wiele postow
export default function Posty({wszystkie=true}){
    const {posty,loading,getPosty}=useContext(ForumContext)
    const {user}=useContext(GlobalContext)
    useEffect(()=>
    getPosty(),[user])
    if(loading)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>Loading...</p>
    let postyPokazywane=posty
    if(!wszystkie)
        postyPokazywane=posty.filter(p=>p.autorLogin===user.login)

    const reversed=[...postyPokazywane].reverse();




    return(
        <div style={{paddingLeft:"250px", width:"100%",
           justifyItems:'center',height:"100vh"}}>
            <div className={"posty"}>

                <Virtuoso
                    components={{
                        Header: () => <DodawaniaPostu/>
                    }}
                    useWindowScroll
                    style={{ height: "600px",borderRadius:"10px" }}
                    totalCount={reversed.length}
                    itemContent={(i) => <Post post={reversed[i]} />}
                />
            </div>
        </div>
    )
}

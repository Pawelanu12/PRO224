'use client'

import {useContext, useEffect} from "react";
import {ForumContext} from "@/app/providers/ForumProvider";
import Post from "@/app/forum/Post";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import DodawaniaPostu from "@/app/forum/DodawaniaPostu";
//pokazuje wiele postow
export default function Posty({wszystkie=true}){
    const {posty,loading,getPosty}=useContext(ForumContext)
    const {user}=useContext(GlobalContext)
    useEffect(()=>
    getPosty(),[])
    if(loading)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>Loading...</p>
    if(!posty||posty.length===0)return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>nie ma postów...</p>
    let postyPokazywane=posty
    if(!wszystkie)
        postyPokazywane=posty.filter(p=>p.autorId===user.id)
    if(!postyPokazywane||postyPokazywane.length===0)
        return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>{"nie posiadasz postów"}</p>
    return(
        <div style={{paddingLeft:"250px", width:"100%",
           justifyItems:'center',height:"100vh"}}>
            {/*<div className={"postyBackground"}>*/}
            {/*</div>*/}
            <div className={"posty"}>
                <DodawaniaPostu/>
                <br/>
                {[...postyPokazywane].reverse().map((post,i)=><Post key={i} post={post}/>)}
            </div>
        </div>
    )
}

//    const rederRow=({index,style})=>(
//
//         <div style={{...style}}>
//
//             <Wydatek  key={listPofiltrowana[index].id}
//                      wydatek={listPofiltrowana[index]} />
//         </div>
//     )


// return (
//     <FixedSizeList
//         height={window.innerHeight}
//         width={window.innerWidth-20}
//         itemCount={listPofiltrowana.length}
//         itemSize={200}
//     >
//         {rederRow}
//     </FixedSizeList>
// )



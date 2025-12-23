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
    // if(!postyPokazywane||postyPokazywane.length===0)
    //     return <p style={{paddingTop:"75px",paddingLeft:"300px",textAlign:"center"}}>{"nie posiadasz postów"}</p>

    const reversed=[...postyPokazywane].reverse();
    //
    //    // const renderRow=({index,style})=>(
    //    //  <div style={{...style}}>
    //    //
    //    //      <Post
    //    //             post={reversed[index]} />
    //    //  </div>
    // )




    return(
        <div style={{paddingLeft:"250px", width:"100%",
           justifyItems:'center',height:"100vh"}}>
            {/*<div className={"postyBackground"}>*/}
            {/*</div>*/}
            <div className={"posty"}>
                {/*<DodawaniaPostu/>*/}
                {/*<br/>*/}

                <Virtuoso
                    components={{
                        Header: () => <DodawaniaPostu/>
                    }}
                    useWindowScroll
                    style={{ height: "600px",borderRadius:"10px" }}
                    totalCount={reversed.length}
                    itemContent={(i) => <Post post={reversed[i]} />}
                />
                {/*{[...postyPokazywane].reverse().map((post,i)=><Post key={i} post={post}/>)}*/}
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



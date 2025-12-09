'use client'

import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Opcji from "@/app/forum/Opcji";
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

export default function Post({post}){
const {user}=useContext(GlobalContext)
    const [pelnyOpis,setPelnyOpis] = useState(false)
    const [show,setShow]=useState(false)
    return (
        <div style={{marginBottom: "30px",
            backgroundColor: "#4D644C",
            maxWidth: "500px"
        }}>
            <div className={"flexRow"} style={{alignItems:"center"}}>
                <div style={{flex:60}}>
                    <div className={'flexRow'}>
                        <img src={post.ikona} alt="ikona" className={'ikona'} style={{margin: 0}}/>
                        <div>
                            <div className={"flexRow"}>
                                <p>autor:{post.autor}</p>
                                {post.autorId!==user.id&&<button style={{paddingLeft: "20px", color: "#88D79D"}}>Obserwuj</button>}
                            </div>
                            <p>{compare_dates(post.dataStworzenia)}</p>
                        </div>
                    </div>

                    <p style={
                        pelnyOpis?{wordBreak:"break-word",height:"auto"}:
                            {
                            wordBreak:"break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,       // ile linii pokazać
                            WebkitBoxOrient: "vertical" }}
                    >{post.tresc}</p>
                    <button style={{color:"grey"}}
                            onClick={()=>setPelnyOpis(!pelnyOpis)}>
                        { pelnyOpis?"pokaż mniej":"pokaż węcej"}</button>
                </div>
                <div style={{flex:20,textAlign:"right"}}>
                    {show&& <Opcji autor={post.autorId} post={post}/>}
                    <button onClick={()=>setShow(!show)} style={{fontSize:"50px"}}> . . .</button>
                </div>

            </div>
            {post.zdjecia&&<div>
                {post.zdjecia.map((z,i)=>
                    <img key={i} src={"http://localhost:8080/uploads/posts/"+z} alt={"cat"}/>
                )}
            </div>}
            <div className={"flexRow"}
                 style={{justifyContent: "space-around", marginTop: "10px", backgroundColor: "#3A4F39"}}>
                <div>
                    <button onClick={()=>console.log("like")}>
                        ilosc polubeń {post.iloscPolubien}</button>
                </div>
                <div>
                    <button>ilosc komentarzy {post.komentarze.length}</button>
                </div>
                <div>
                    <button>ilosc udostepnien {post.udostepnienia}</button>
                </div>
            </div>
        </div>
    )
}
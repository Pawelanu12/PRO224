'use client'

import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Opcji from "@/app/forum/Opcji";

export default function Post({post}){
const {user}=useContext(GlobalContext)
    const [pelnyOpis,setPelnyOpis] = useState(false)
    const [show,setShow]=useState(false)
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
    return (
        <div style={{marginBottom: "30px"}}>
            <div className={"flexRow"} style={{alignItems:"center"}}>
                <div style={{flex:60}}>
                    <div className={'flexRow'}>
                        <img src={post.ikona} alt="ikona" className={'ikona'} style={{margin: 0}}/>
                        <div>
                            <div className={"flexRow"}>
                                <p>{post.autor}</p>
                                {post.autor!==user.login&&<button style={{paddingLeft: "20px", color: "#88D79D"}}>Obserwuj</button>}
                            </div>
                            <p>{compare_dates(post.data)}</p>
                        </div>
                    </div>

                    <p style={
                        pelnyOpis?{height:"auto"}:
                            {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,       // ile linii pokazać
                            WebkitBoxOrient: "vertical" }}
                    >{post.opis}</p>
                    <button style={{color:"grey"}} onClick={()=>setPelnyOpis(!pelnyOpis)}>{ pelnyOpis?"pokaż mniej":"pokaż węcej"}</button>
                </div>
                <div style={{flex:20,textAlign:"right"}}>
                    {show&& <Opcji autor={post.autor}/>}
                    <button onClick={()=>setShow(!show)} style={{fontSize:"50px"}}> . . .</button>
                </div>

            </div>
            <img src={post.obraz} alt={"obraz"} width={"100%"}/>
            <div className={"flexRow"}
                 style={{justifyContent: "space-around", marginTop: "10px", backgroundColor: "#3A4F39"}}>
                <div>
                    <button>ilosc polubeń {post.polubienia}</button>
                </div>
                <div>
                    <button>ilosc komentarzy {post.komentarze}</button>
                </div>
                <div>
                    <button>ilosc udostepnien {post.udostepnienia}</button>
                </div>
            </div>
        </div>
    )
}
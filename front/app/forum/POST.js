'use client'

import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Opcji from "@/app/forum/Opcji";
import PostDialog from "@/app/forum/dialogs/PostDialog";
import {ForumContext} from "@/app/providers/ForumProvider";
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
    const {changeLike} = useContext(ForumContext);
const {user}=useContext(GlobalContext)
    const [pelnyOpis,setPelnyOpis] = useState(false)
    const [show,setShow]=useState(false)

    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

        const images=post.zdjecia.map((z,i)=>{
            return  {"key":i, "src":"http://localhost:8080/uploads/posts/"+z, "alt":z,"id":i}
        })

    // console.log(images.length)
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
                                <p>{post.autorLogin}</p>
                                {post.autorId!==user.id&&<button style={{paddingLeft: "20px", color: "#88D79D"}}>Obserwuj</button>}
                            </div>
                            <p>{compare_dates(post.dataStworzenia)}</p>
                        </div>
                    </div>

                    <p style={
                        pelnyOpis?{wordBreak:"break-word",height:"auto",marginLeft:"10px"}:
                            {
                            marginLeft:"10px",
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
                    {show&& <Opcji autor={post.autorLogin} post={post}/>}
                    <button onClick={()=>setShow(!show)} style={{fontSize:"50px"}}> . . .</button>
                </div>

            </div>
            {images.length>0&& <div style={{
                position: "relative",
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "10px"
            }}>
                <img
                    src={images[index].src}
                    alt={images[index].alt}
                    style={{width: "100%", height: "100%", objectFit: "contain",borderRadius:"20px"}}
                />
                {images.length>1&&<div><button
                    onClick={prev}
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                    ◀
                </button>

                    {/* RIGHT ARROW */}
                    <button
                        onClick={next}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0,0,0,0.4)",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        ▶
                    </button>
                </div>}
            </div>}
                <div className={"flexRow"}
                     style={{justifyContent: "space-around", marginTop: "10px", backgroundColor: "#3A4F39"}}>
                    <div>
                        <button onClick={(e) =>{e.preventDefault(); changeLike(post.id,user.id)}}>
                            ilosc polubeń {post.polubienia.length}</button>
                    </div>
                    <div>
                        <PostDialog post={post} compare_dates={compare_dates} />
                    </div>
                    <div>
                        <button>ilosc udostepnien {post.udostepnienia}</button>
                    </div>
                </div>
            </div>
                )
            }
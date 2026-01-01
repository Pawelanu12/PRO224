'use client'

import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Opcji from "@/app/forum/Opcji";
import PostDialog from "@/app/forum/dialogs/PostDialog";
import {ForumContext} from "@/app/providers/ForumProvider";
import PostInformacja from "@/app/forum/PostInformacja";
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
          <PostInformacja post={post} />
                <div className={"flexRow"}
                     style={{justifyContent: "space-around", marginTop: "10px", backgroundColor: "#3A4F39"}}>
                    <div>
                        <button onClick={(e) =>{e.preventDefault(); changeLike(post.id,user.id)}}>
                            ilosc polubeń {post.polubienia.length}</button>
                    </div>
                    <div>
                        <PostDialog post={post}/>
                    </div>
                    <div>
                        <button>ilosc udostepnien {post.udostepnienia}</button>
                    </div>
                </div>
            </div>
                )
            }
'use client'

import {useContext, useEffect, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Sprawnosc({sprawnosc}) {
    const {setEdit,replaceClick}=useContext(GlobalContext)
    const [show,setShow] = useState(false);
    const dialog=useRef(null)
    const imageSizeWithBordings=120
    // console.log(sprawnosc);
    useEffect(() => {

        if (show) {
            const scrollY = window.scrollY;
            const x = window.innerWidth;
            const y = window.innerHeight;

            // console.log("right-bottom corner:", x, y,"right-bottom div",
            //     dialog.current.offsetLeft+dialog.current.offsetWidth,
            //     dialog.current.offsetTop+dialog.current.offsetHeight
            //     );

            if( dialog.current.offsetLeft+dialog.current.offsetWidth>x) {
                dialog.current.style.right = 20+"px"
            }
            const transformY=dialog.current.offsetHeight
                +imageSizeWithBordings+scrollY
            if( dialog.current.offsetTop+dialog.current.offsetHeight>y+scrollY &&
                dialog.current.offsetTop-transformY>0) {
                dialog.current.style.top = (dialog.current.offsetTop-transformY)+"px";
            }
            else if(dialog.current.offsetTop+dialog.current.offsetHeight<=y+scrollY ){
                dialog.current.style.top = dialog.current.offsetTop-scrollY+"px";
            }
            else{
                dialog.current.style.position = "absolute";
                // dialog.current.style.top = dialog.current.offsetTop+75  +"px";

                // dialog.current.style.left=0
                // dialog.current.style.height =y- dialog.current.offsetTop+scrollY+"px";
                // console.log( dialog.current.style.height)
                // dialog.current.style.overflow ="auto";
            }
        }
    }, [show]);

// console.log(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/ikona/${sprawnosc.ikona}`);
    return (
        <div className={"sprawnosc"}>
            {/*<p style={{margin: "25px"}}*/}
            {/*   onMouseMove={() => setShow(true)}*/}
            {/*   onMouseLeave={() => setShow(false)}>sadas</p>*/}

            <div
                onMouseMove={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                style={{ width:"150px",display: "flex",
                    flexDirection: "column",
                    alignItems: "center",  }}>
            <img className={"sprawnosc-img"} src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/${sprawnosc.ikona}`}
                 loading={"lazy"}
                 onClick={(e) => {
                     setEdit(sprawnosc);
                     replaceClick(e, "/admin/edit/sprawnosc")
                 }}
                alt={"sprawnosc"}


            />

                <p style={{wordWrap:"break-word",textAlign:"center",overflow: "hidden",width:"100%",height:"25px",margin:0}}>{sprawnosc.nazwa}</p>

            </div>
            {/*<img src={sprawnosc.obraz}></img>*/}
            {show &&
                <div className={"sprawnosc-dialog"} ref={dialog}>
                    <h1 className={"sprawnosc-nazwa"}>{sprawnosc.nazwa}</h1>
                    <div className={"sprawnosc-opis"}>
                        {sprawnosc.opis}
                    </div>

                </div>}
        </div>
    )
}
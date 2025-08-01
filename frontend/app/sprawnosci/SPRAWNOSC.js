'use client'

import {useEffect, useRef, useState} from "react";

export default function SPRAWNOSC({sprawnosc}) {
    const [show,setShow] = useState(false);
    const dialog=useRef(null)
    const imageSizeWithBordings=120
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


    return (
        <div>
            {/*<p style={{margin: "25px"}}*/}
            {/*   onMouseMove={() => setShow(true)}*/}
            {/*   onMouseLeave={() => setShow(false)}>sadas</p>*/}

            <img src={sprawnosc.obraz} style={{margin: "25px"}} loading={"lazy"}
                 onMouseMove={() => setShow(true)}
                 onMouseLeave={() => setShow(false)} alt={"sprawnosc"}


            />
            {/*<img src={sprawnosc.obraz}></img>*/}
            {show &&
                <div className={"dialog"} ref={dialog}>
                    <h1>{sprawnosc.nazwa}</h1>
                    <div>
                        {sprawnosc.opis}
                    </div>

                </div>}
        </div>
    )
}
'use client'
import Image from "next/image";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useRouter} from "next/navigation";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function Home() {
  const {cat,setCat,router}=useContext(GlobalContext)
    const [currentIndex,setCurrentIndex] = useState(0);
    const carouselInner = useRef(null);
    const items = [
        {src:"/images/strona_glowna1.png",alt:"obraz 1",id:1},
        {src:"/images/strona_glowna2.png",alt:"obraz 2",id:2},
        {src:"/images/strona_glowna3.png",alt:"obraz 3",id:3},
        {src:"/images/strona_glowna3.png",alt:"obraz 4",id:4},
        {src:"/images/strona_glowna2.png",alt:"obraz 5",id:5},
        {src:"/images/strona_glowna1.png",alt:"obraz 6",id:6}
    ];
    const text= [
        {"linia": "1. Gdyńska Gromada Zuchów „Rycerze z Kamiennej Góry” jest jednostką organizacyjną Zwiazku Harcerstwa Rzeczypospolitej."},
        {"linia": ' Gromada działa od 11 października 2008 r. Należy do Gdyńskiego Hufca Harcerzy „Pasieka”.'},
        {"linia": "Do gromady należą zuchy w wieku od 7 do 11 lat."},
        {"linia": "Każdego roku na przełomie września i października przyjmujemy kilku nowych kandydatów na zuchów."},
        {"linia": "Z kolei najstarszym i najdzielniejszym proponujemy wstąpienie do drużyny harcerzy. "},
        {"linia": "Nasze zuchy najczęściej wstępują do 36. Gdyńskiej Drużyny Harcerzy"},
        {"linia": "Naszym zuchowym sąsiadem jest 3. Gdyńska Gromada Zuchów „Witomici”.\n" +
                "                  uaktualniono 2025-02-28"},

    ]

    useEffect(()=>{

        const timeout=setTimeout(()=>{

            updateCarousel()}, 5000);
        return()=>{
            clearTimeout(timeout);
        }
        },[currentIndex])

    function updateCarousel() {
        const offset = -(currentIndex+1)%(items.length-1) * 50;
        console.log(offset)

        setCurrentIndex(currentIndex+1)
        carouselInner.current.style.transform = `translateX(${offset}%)`;
    }
    return (
        <div>
            <NAVBARUNREGISTED/>
            <div className={"gromada"} style={{paddingTop: "50px"}}>
                <div className="carousel">
                    <div className="carousel-inner" ref={carouselInner}>
                        {items.map(item =>
                           <img key={item.id} src={item.src} alt={item.alt}/>

                        )}
                    </div>

                </div>

                <div className={"centrowanyText"}>

                    <p style={{fontSize: 30, backgroundColor: "#1A1919"}}>O gromadzie</p>
                    {text && text.map((l, i) => (<p key={i}>{l.linia}</p>))}
                </div>
            </div>
        </div>
    );
}

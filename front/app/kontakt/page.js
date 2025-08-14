'use client'


import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";

export default function Kontakt(){

    return (
    <div >
        <NavbarZarejestrowana/>
    <div className={"kontakt"} style={{paddingTop:"50px"}}>
        <div style={{backgroundColor:"#3A4F39",height:"200px",width:"400px",maxHeight:"80%",overflow:"auto"}}>
            <p>Telefon +66666666666</p>
            <p>adress mailowy: qwerty@gmail.com</p>
            <p>adress mailowy: qwertyu@gmail.com</p>
            <p>w czacie drużyna</p>
        </div>
    </div>
    </div>

    )
}
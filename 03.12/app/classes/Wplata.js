'use client'

export default function Wplata({wplata}){
    if(!wplata)return (<div>Nie ma wplaty</div>)
    return (<div>
        <p>data:{wplata.date}</p>
        <p>kwota:{wplata.kwota}</p>
    <br/><br/></div>)
}
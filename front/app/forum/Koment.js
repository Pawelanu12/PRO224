'use client'

export default function Koment({koment}){
    return(<div>
        <b>{koment.autorId}: </b><span className={" whitespace-pre-wrap break-all"}>{koment.tresc}</span>
    </div>)
}
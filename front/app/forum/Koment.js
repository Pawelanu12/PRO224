'use client'

export default function Koment({koment}){
    return(<div>
        <b>{koment.autorId}</b><span>{koment.tresc}</span>
    </div>)
}
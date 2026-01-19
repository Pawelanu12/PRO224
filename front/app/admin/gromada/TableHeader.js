'use client'

export default function TableHeader({id, nazwa, handleSort, malejace, sortBy, size = 150}) {

    return (<th className={`w-[${size}px] px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer`}
        id={id} onClick={handleSort}>{nazwa}{sortBy === id && <span>{malejace ? "▼" : "▲"}</span>}</th>)

}
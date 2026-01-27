'use client'

export default function TableField({data}) {

    return (
        <td className="w-[150px] px-4 py-3 text-gray-800 ">
            <div className="relative group">
                    <span className="block truncate">
                        {data}
                    </span>
                <div className="absolute bottom-full left-0 z-10 mb-2 hidden max-w-xs
                 rounded-md bg-gray-800 px-3 py-2 text-xs text-white
                 shadow-lg group-hover:block">
                    {data}
                </div>
            </div>
        </td>
    )
}
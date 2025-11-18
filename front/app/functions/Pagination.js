'use client'

import {useRef} from "react";
import {hidden} from "next/dist/lib/picocolors";

export default function Pagination ({liczbaStron,page,setPage,inputRef}){

    if(liczbaStron<=1)
        return <ul/>

    return(
        <ul className={"pagination"} style={{display: 'flex', flexDirection: 'row', width: "100%", justifyContent: "center"}}>
            <li>
                <button onClick={() => {
                    inputRef.current.value=page-1;
                    setPage(page - 1)
                }}
                        style={page<=1?{visibility:"hidden",marginRight: "10px"}:{marginRight: "10px"}}>poprzednia strona
                </button>
            </li>
            {/*{page <= 1 && <li  >poprzednia strona</li>}*/}
            <li><label><input type={"number"} ref={inputRef}
                              onChange={(e) => {
                                  if(e.target.value>liczbaStron){
                                      setPage(liczbaStron)
                                      e.target.value=liczbaStron;
                                  }
                                  else if (e.target.value && e.target.value > 0) setPage(e.target.value)
                              }} style={{width: "50px"}} defaultValue={page}/></label></li>
                <li>
                    <button onClick={() => {
                        setPage(page + 1)
                        inputRef.current.value=page+1;
                    }
                        }
                            style={page >= liczbaStron ?{visibility:"hidden",marginLeft: "10px"}:{marginLeft: "10px"}}>następna strona
                    </button>
                </li>
            {page >= liczbaStron&&<li></li>}
        </ul>
    )
}
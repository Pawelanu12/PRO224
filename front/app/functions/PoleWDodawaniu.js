'use client'

import {hidden} from "next/dist/lib/picocolors";

export default function PoleWDodawaniu({nazwaPola,state,setState}) {

    return(<div>
        {state &&  <p >{nazwaPola}</p>}
        {!state &&  <p style={{height:"24px"}}></p>}
       <label> <input name={nazwaPola}  placeholder={nazwaPola}
                      onChange={(e)=>setState(e.target.value)}
                      style={{backgroundColor:"black",color:"white"}}></input>
       </label></div>)
}
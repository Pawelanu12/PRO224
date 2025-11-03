'use state'

import { useRef} from "react";

export default function DeleteDialog({id,funkcjaDoUsunecia}) {
    const dialog=useRef(null);
    console.log(funkcjaDoUsunecia)
    return(
        <div>
            <button style={{color:"red"}} onClick={()=>{dialog.current.showModal();
                console.log(dialog.current.div)}}>delete</button>
            <dialog style={{position:"fixed",left:"30vw",top:"30vh",height:"300px"}} ref={dialog}>
                <p>Czy potwerdzasz usunięcie</p>
                <div id="div" style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
                    <button onClick={()=>{dialog.current.close();funkcjaDoUsunecia(id)}}>tak</button>
                    <button onClick={()=>dialog.current.close()}>nie</button>
                </div>
            </dialog>

        </div>
    )
}
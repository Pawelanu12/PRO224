'use state'

import { useRef} from "react";

export default function DeleteDialog({id}) {
    const dialog=useRef(null);
    return(
        <div>
            <button style={{color:"black"}} onClick={()=>{dialog.current.showModal();
                console.log(dialog.current.div)}}>odoaj sprawnosc do uzytkownika</button>
            <dialog style={{position:"fixed",left:"30vw",top:"30vh",height:"300px"}} ref={dialog}>
                <p>napisz loginy uzytkowników przez przecinek sprawnosci </p>
                <div id="div" style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
                    <button onClick={()=>{dialog.current.close();}}>tak</button>
                    <button onClick={()=>dialog.current.close()}>nie</button>
                </div>
            </dialog>

        </div>
    )
}
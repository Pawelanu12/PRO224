'use client'

import {FaEdit, FaTrash} from "react-icons/fa";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import {FaPencil} from "react-icons/fa6";

export default function Comment({koment, setComments}) {
    const {deleteComment, editComment} = useContext(ForumContext);
    const [show, setShow] = useState(false);
    const {user}=useContext(GlobalContext);
    const [edit, setEdit] = useState(false);
    const [value,setValue] = useState("");
    const tekst=useRef(null)
    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if(!edit||!tekst)return
        tekst.current.focus();
        tekst.current.value = koment.tresc;
        tekst.current.style.height = "auto";
        tekst.current.style.height = `${tekst.current.scrollHeight}px`;
    }, [edit]);

    const Wyslij=()=>{
        setEdit(false);
        editComment(koment.id, {tresc:value});
        setComments(prev => prev.map(k => k.id === koment.id ? {...koment, tresc: value} : k)
        )
    }

    return (<div className="w-full justify-between bg-gray-700  rounded-2xl  text-sm text-white my-2 "
                 onMouseMove={() => setShow(true)}
                 onMouseLeave={() => setShow(false)}>

        {!edit && show && user && user.login === koment.autorLogin &&
            <div
                className={"-mt-[10px] right-10  absolute flex flex-row "}>
                <div className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}
                     onClick={() => {
                         setEdit(true);
                         setValue(koment.tresc)
                     }}>
                    <FaPencil/></div>
                <div onClick={() => {
                    deleteComment(koment.id);
                    // setPosty(prev=>prev.map(p=>p.id===koment.postId?{...p,komentarze:p.komentarze.filter(k=>k!==koment)}:p));
                    setComments(prev => prev.filter(comment => comment.id !== koment.id));
                }}
                     className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}>
                    <FaTrash/>
                </div>
            </div>
        }
        {!edit && (
            <div
                className="
            px-3 py-2
            whitespace-pre-wrap
            break-all
            overflow-hidden
        "
            >

                <b>{koment.autorLogin}: </b>
                <span>{koment.tresc}</span>
            </div>
        )}

        {edit && (
            <div>
                <textarea ref={tekst}
                          onInput={handleInput}
                          rows={1}
                          className="max-h-[120px] flex-1 resize-none rounded-2xl
                        bg-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400
                        outline-none w-full"

                          onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  Wyslij()
                              }

                          }}
                          onChange={(e) => setValue(e.target.value)}
                />
                <div className={"bg-[#ffffff] flex flex-row text-[blue]"}>
                    <button onClick={()=>setEdit(false)} className={"hover:underline"}>odwolaj</button>
                    <button onClick={Wyslij} className={"ml-4 hover:underline"}>Wyślij</button>

                </div>
            </div>
        )}</div>);
}


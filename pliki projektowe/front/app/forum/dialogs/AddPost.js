'use client'

import { useContext, useRef, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { ForumContext } from "@/app/providers/ForumProvider";
import { FaImages } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function AddPost() {
    const { user } = useContext(GlobalContext);
    const { addPosty } = useContext(ForumContext);

    const [files, setFiles] = useState([]);
    const [isTresc, setIsTresc] = useState(false);
    const tresc = useRef(null);
    const dialog = useRef(null);

    const dodajPost = () => {
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));
        formData.append("tresc", tresc.current.value);
        formData.append("autorId", user.id);

        addPosty(formData);
        dialog.current.close();
        document.body.style.overflow = "auto";
    };

    const onChange = (e) => {
        setIsTresc(e.target.value.length > 0);
        tresc.current.style.height = "auto";
        tresc.current.style.height = tresc.current.scrollHeight + "px";
    };

    return (
        <div >
            {/* Nagłówek i przycisk */}
            <div className="bg-[#4D644C] flex items-center px-4 py-3 mb-8 rounded-md">
                <img src={user?.profilePicture
                    ? `${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/ProfilePictures/${user.profilePicture}`
                    : "/images/user_logo.png"} alt="logo" className="h-14 w-14 mr-5 rounded-full object-cover" />
                <button
                    className="text-white z-20 px-4 py-2 rounded-full bg-[#336250] hover:bg-[#2b5140]"
                    onClick={() => {
                        dialog.current.showModal();
                        document.body.style.overflow = "hidden";
                    }}
                >
                    Chcesz dodać post?
                </button>
            </div>

            {/* Dialog */}
            <dialog
                ref={dialog}
                className="fixed  "
                onClose={() => (document.body.style.overflow = "auto")}
                onCancel={() => (document.body.style.overflow = "auto")}
            >
                <div  className="fixed w-screen h-screen flex justify-center items-center bg-black/80">
                {/* Wewnętrzny div */}

                    <div className="bg-white rounded-lg w-[500px] h-[500px] max-w-3xl flex flex-col">
                    {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <div></div>
                            <p className="text-lg font-semibold text-center flex-1">Utwórz post</p>
                            <button
                                className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
                                onClick={() => {
                                    dialog.current.close();
                                    document.body.style.overflow = "auto";
                                }}
                            >
                                <FaX />
                            </button>
                        </div>

                        {/* Treść i pliki */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <textarea
                    ref={tresc}
                    placeholder="Treść posta"
                    className="w-full resize-none border-none outline-none p-2 rounded-md shadow-sm"
                    rows={1}
                    onChange={onChange}
                />

                            {/* Lista nowych plików */}
                            {files.length > 0 && (
                                <div>
                                    <div className="flex flex-wrap gap-4 justify-center mt-2">
                                        {files.map((file, i) => (
                                            <div key={i} className="relative w-40 flex items-center">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                                <button
                                                    className="absolute top-0 right-0 bg-gray-400 p-1 rounded-full hover:bg-gray-500"
                                                    onClick={() => setFiles((prev) => prev.filter((v) => v !== file))}
                                                >
                                                    <FaX />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dodawanie plików i przycisk opublikuj */}
                        <div className="px-4 py-2 border-t space-y-2">
                            <label className="flex justify-between items-center cursor-pointer">
                                <span>Dodaj do posta</span>
                                <FaImages className="text-2xl" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files)])}
                                />
                            </label>

                            <button
                                className={`w-full py-2 rounded-md text-white ${
                                    isTresc ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 pointer-events-none"
                                }`}
                                onClick={dodajPost}
                            >
                                Opublikuj
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

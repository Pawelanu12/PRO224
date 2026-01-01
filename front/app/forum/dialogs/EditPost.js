'use client'

import { useContext, useRef, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { ForumContext } from "@/app/providers/ForumProvider";
import { FaImages } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function EditPost({ post }) {
    const { user } = useContext(GlobalContext);
    const { editPost } = useContext(ForumContext);

    const [oldFiles, setOldFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [picturesToBeRemoved, setPicturesToBeRemoved] = useState([]);
    const [isTresc, setIsTresc] = useState(true);

    const tresc = useRef("");
    const dialog = useRef(null);

    const edit = () => {
        const formData = new FormData();
        files.forEach((f) => formData.append("newPictures", f));
        picturesToBeRemoved.forEach((p) => formData.append("picturesToBeRemoved", p));
        formData.append("tresc", tresc.current.value);

        editPost(post.id, formData);
        dialog.current.close();
        document.body.style.overflow = "auto";
    };

    const onChange = (e) => {
        setIsTresc(e.target.value.length > 0);
        tresc.current.style.height = "auto";
        tresc.current.style.height = tresc.current.scrollHeight + "px";
    };

    return (
        <div>
            {/* Przycisk otwierający dialog */}
            <button
                className="text-red-600 z-20 px-4 py-2 rounded-lg border border-red-600 hover:bg-red-100"
                onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                    tresc.current.value = post.tresc;
                    tresc.current.style.height = "auto";
                    tresc.current.style.height = tresc.current.scrollHeight + "px";
                    setOldFiles(post.zdjecia.map((z, i) => ({ index: i, src: z })));
                }}
            >
                Edytuj post
            </button>

            {/* Dialog */}
            <dialog
                ref={dialog}
                className="fixed left-[20vw] top-[80px]
             h-[500px] w-[500px]"
                onClose={() => (document.body.style.overflow = "auto")}
                onCancel={() => (document.body.style.overflow = "auto")}
            >
                {/* Wewnętrzny div z flexami */}
                <div className="bg-white rounded-lg w-[500px] h-[500px] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <div></div>
                        <p className="text-lg font-semibold">Edytuj post</p>
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

                    {/* Treść i zdjęcia */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <textarea
                ref={tresc}
                placeholder="Treść posta"
                className="w-full resize-none border-none outline-none p-2 rounded-md shadow-sm"
                rows={1}
                onChange={onChange}
            />

                        {/* Stare zdjęcia */}
                        {oldFiles.length > 0 && (
                            <div className="flex flex-wrap gap-4 justify-center">
                                {post.zdjecia
                                    .filter((z) => !picturesToBeRemoved.includes(z))
                                    .map((img, i) => (
                                        <div key={i} className="relative w-40 flex items-center">
                                            <img
                                                src={"http://localhost:8080/uploads/posts/" + img}
                                                alt={img}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                            <button
                                                className="absolute top-0 right-0 bg-gray-400 p-1 rounded-full hover:bg-gray-500"
                                                onClick={() => setPicturesToBeRemoved((prev) => [...prev, img])}
                                            >
                                                <FaX />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* Nowe pliki */}
                        {files.length > 0 && (
                            <div>
                                <p className="text-center text-red-500 font-semibold">Nowe pliki</p>
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

                    {/* Dodawanie nowych zdjęć i przycisk */}
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
                            onClick={edit}
                        >
                            Edytuj
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

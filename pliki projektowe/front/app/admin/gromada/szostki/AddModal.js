import {useRef, useState} from "react";

export default function AddModal({  funkcjaDoDodania,typ="szostka",id=null }) {
    const dialog = useRef(null);
    const [input, setInput] = useState("");
    return (
        <div className={"m-1"}>
            {/* Przycisk otwierający modal */}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full p-1 my-1"
                onClick={() => dialog.current.showModal()}
            >
                {typ==="szostka"?"Dodaj nową szóstkę":"Dodaj zucha do szóstki"}
            </button>

            {/* Modal */}
            <dialog
                ref={dialog}
                className="p-6 rounded-lg shadow-lg border border-gray-300 w-96 max-w-full"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <p className="text-lg font-semibold mb-4">
                    {typ==="szostka"?"Dodawanie szóstki":"Dodawanie zucha do szóstki"}
                </p>
                <input className={"w-full px-2 border-black border mb-2 rounded-sm"}
                       value={input}
                onInput={e=>setInput(e.target.value)}/>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => {
                            dialog.current.close();
                            funkcjaDoDodania(input,id);
                        }}
                    >
                        Dodaj
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => dialog.current.close()}
                    >
                        Anuluj
                    </button>
                </div>
            </dialog>
        </div>
    );
}

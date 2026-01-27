import { useRef } from "react";
import {FaTrash} from "react-icons/fa";

export default function DeleteDialog({ id, funkcjaDoUsunecia,isTrash=false }) {
    const dialog = useRef(null);

    return (
        <div>
            {/* Przycisk otwierający modal */}
            {!isTrash&&<button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => dialog.current.showModal()}
            >
                Delete
            </button>}
            {isTrash&&<button
                onClick={() => dialog.current.showModal()}
                className="hover:text-red-500 mt-2"
            ><FaTrash/></button>}

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
                    Czy potwierdzasz usunięcie?
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            dialog.current.close();
                            funkcjaDoUsunecia(id);
                        }}
                    >
                        Tak
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => dialog.current.close()}
                    >
                        Nie
                    </button>
                </div>
            </dialog>
        </div>
    );
}

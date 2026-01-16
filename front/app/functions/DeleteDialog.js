import { useRef } from "react";

export default function DeleteDialog({ id, funkcjaDoUsunecia }) {
    const dialog = useRef(null);

    return (
        <div>
            {/* Przycisk otwierający modal */}
            <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => dialog.current.showModal()}
            >
                Delete
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

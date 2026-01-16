'use client'

import { useContext, useEffect } from "react";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";
import Achievement from "@/app/achievements/Achievement";
import { GlobalContext } from "@/app/providers/GlobalProvider";

export default function Achievements({sprawnosciPosortowane}) {

    if (!sprawnosciPosortowane.length) {
        return (
            <div className="flex justify-center pt-20 text-white">
                nie ma sprawności
            </div>
        );
    }

    const typy = [
        { value: "RED", label: "CZERWONE" },
        { value: "YELLOW", label: "ŻÓŁTE" },
        { value: "GREEN", label: "ZIELONE" },
        { value: "BLUE", label: "NIEBIESKIE" },
        { value: "PURPLE", label: "FIOLETOWE" },
    ];
    return (
        <div className="flex flex-col">
            {typy.map((typ) => (
                <div key={typ.label} className="mb-10">
                    {/* TYTUŁ TYPU */}
                    <h1 className="ml-6 mt-6 text-2xl font-bold text-white text-center">
                        {typ.label}
                    </h1>

                    {/* LISTA SPRAWNOŚCI */}
                    <div className="mt-4 ml-6 flex flex-wrap gap-6">
                        {sprawnosciPosortowane
                            .filter(
                                (sprawnosc) =>
                                    (sprawnosc.typSprawnosci || "undefined").toUpperCase() ===
                                    typ.value
                            )
                            .map((sprawnosc, id) => (
                                <div key={typ.value + id}>
                                    <Achievement sprawnosc={sprawnosc} />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

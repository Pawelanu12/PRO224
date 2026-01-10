'use client'

import { useContext, useEffect } from "react";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";
import Achievement from "@/app/achievements/Achievement";
import { GlobalContext } from "@/app/providers/GlobalProvider";

export default function ShowAchievements() {
    const { sprawnosciPosortowane, getSprawnosci } =
        useContext(SprawnoscContext);
    const { loading, user } = useContext(GlobalContext);

    useEffect(() => {
        getSprawnosci();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center pt-20 text-white">
                loading...
            </div>
        );
    }

    if (!sprawnosciPosortowane.length) {
        return (
            <div className="flex justify-center pt-20 text-white">
                nie ma sprawności
            </div>
        );
    }

    const typy = Array.from(
        new Set(
            sprawnosciPosortowane.map(
                (s) => (s.typ || "undefined").toUpperCase()
            )
        )
    );

    return (
        <div className="flex flex-col">
            {typy.map((typ) => (
                <div key={typ} className="mb-10">
                    {/* TYTUŁ TYPU */}
                    <h1 className="ml-6 mt-6 text-2xl font-bold text-white">
                        {typ}
                    </h1>

                    {/* LISTA SPRAWNOŚCI */}
                    <div className="mt-4 ml-6 flex flex-wrap gap-6">
                        {sprawnosciPosortowane
                            .filter(
                                (sprawnosc) =>
                                    (sprawnosc.typ || "undefined").toUpperCase() ===
                                    typ
                            )
                            .map((sprawnosc, id) => (
                                <div key={typ + id}>
                                    <Achievement sprawnosc={sprawnosc} />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

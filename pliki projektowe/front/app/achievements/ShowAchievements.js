'use client'

import {useContext, useEffect, useState} from "react";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import Achievements from "@/app/achievements/Achivements";

export default function ShowAchievements() {
    const { sprawnosciPosortowane, getSprawnosci } =
        useContext(SprawnoscContext);
    const { user } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getSprawnosci();
        setLoading(false);
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

    return (<Achievements sprawnosciPosortowane={sprawnosciPosortowane}/>);
}

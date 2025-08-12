'use client'


import {createContext, useState} from "react";

import pos from "/app/data/posty.json"
export const ForumContext = createContext();

export default function ForumProvider({ children }) {
const [posty, setPosty] = useState(pos);
const [loading, setLoading] = useState(false);
    return (
        <ForumContext.Provider value={{
            posty,loading
        }}>{children}</ForumContext.Provider>
    )
};
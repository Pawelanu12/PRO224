'use client'


import {createContext, useState} from "react";

import pos from "/app/data/posty.json"
export const ForumContext = createContext();

export default function ForumProvider({ children }) {
const [posty, setPosty] = useState([]);
const [loading, setLoading] = useState(false);

const getPosty = () => {
    setLoading(true);
    setPosty(pos);
    setLoading(false);
}
    return (
        <ForumContext.Provider value={{
            posty,loading,getPosty
        }}>{children}</ForumContext.Provider>
    )
};
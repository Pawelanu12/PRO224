'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import * as stompClient from "formik";

export default function WebSocket() {
    const [czat,setCzat] = useState([])
    const {user}=useContext(GlobalContext)
    stompClient.connect({}, () => {

        stompClient.subscribe("/topic/czaty/${userId}",
        (msg) => {
            const czat = JSON.parse(msg.body);
            addOrUpdateChat(czat);
        }
    );

    });
    // useEffect(() => {
    //
    //         const get=async ()=>{
    //             await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api`,{
    //                 method:"GET",
    //                 headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                     "Content-Type": "application/json"}
    //             })
    //                 .then(res=>res.json())
    //                 .then(res=> {
    //                     console.log(res)
    //                     // if(Array.isArray(res))
    //                     //     setWydarzenia(res)
    //                 })
    //                 .catch(err=>console.log(err))
    //         }
    //         // get()
    //
    // }, []);
    return(
        <div></div>
    )
}



//'use client'
//
// import {useContext, useEffect, useState} from "react";
// import {GlobalContext} from "@/app/providers/GlobalProvider";
// import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
// import * as stompClient from "formik";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// const containerStyle = {
//     width: "100%",
//     height: "400px",
// };
//
// export default function WebSocket() {
//
//     const latitude=54.3669742
//     const longitude=18.6709017
//         const center = {
//             lat: Number(latitude),
//             lng: Number(longitude),
//         };
//
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     });
//
//     return(
//         <div>
//             <GoogleMap
//                 style={containerStyle}
//                 center={center}
//                 zoom={14}
//             >
//                 <Marker position={center} title={"address"} />
//             </GoogleMap>
//         </div>
//     )
// }


// app/providers/ColorProvider.js
"use client";

import React, {createContext, useContext, useState} from "react";
import forEvent from "../data/forEvent.json";
import forGlobalInfo from "../data/forGlobalInfo.json";
import forUser from "../data/forUser.json";
import forKwoty from "../data/forKwoty.json";
import forSprawnosc from "../data/forSprawnosc.json"


export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [globalInfo, setGlobalInfo] = useState(forGlobalInfo);
    const [pokazywanie,setPokazywanie]=useState("User")
    const [pokazywanieUsera,setPokazywanieUsera]=useState(1)
    const [users,setUsers]=useState([])
    const [sprawnosci,setSprawnosci]=useState([])
    const [user,setUser]=useState(
    {
        id:53,
        typUzytkownikaId:1
    })
    const [achivementUserId,setAchivementUserId]=useState(null)
    const [kwoty,setKwoty]=useState(forKwoty)
    const[edit,setEdit]=useState(null)
const [loading,setLoading]=useState(false)
    //new globalInfo
    const zmienLoading=(loading)=>setLoading(loading)
    const zmienEdycje=(ed)=>{
        setEdit(ed)
    }
    const logIn=(values)=>{
        //const logUser= users.filter(u=>u.login===values.login&&u.haslo===values.password)

        const zaloguj=async (values) => {
            console.log(values)
            const logUser = await fetch(`http://localhost:8080/login?login=${values.login}&&password=${values.password}`,
                {
                    method: "POST",
                })
                .then(res => res.json())
                .then(r => {
                    console.log(r);
                    setUser(r);
                    setPokazywanieUsera(r.id)
                    setUsers([r])
                    setPokazywanie("User")
                })
                .catch(err => {console.log(err);alert("logowanie nie udalo")})

        }
       zaloguj(values)
    }
    const getFromList=(list)=>{
        switch(list){
            case "Events":
                const getListEvents=async () => {
                    zmienLoading(true)
                    await fetch("http://localhost:8080/api/wydarzenia")
                        .then(res=>res.json())
                        .then(res=>{
                            //    console.log(res)
                            setList("Events",res)
                        })
                        .catch(err=>console.log(err))
                       .finally(setLoading(false))
                }
                getListEvents();
                break;
            case "Sprawnosci":
                const getListSprawnosci=async () => {
                    zmienLoading(true)
                    await fetch("http://localhost:8080/api/sprawnosci")
                        .then(res=>res.json())
                        .then(res=>{
                            //  console.log(res)
                            setList("Sprawnosci",res)
                        })
                        .catch(err=>{console.log(err);setSprawnosci([])})
                        .finally(zmienLoading(false))
                }
                getListSprawnosci()
                break;
            case "Attended Events":
                const getListAtendedEvents=async () => {
                    await fetch(`http://localhost:8080/api/uzytkownicy/${user.id}/wydarzenia`)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                            let list=[]
                            res.map(e=>list.push(e.event))
                            console.log(list)
                            setList("Events",list)
                        })
                        .catch(err=>{console.log(err);setList("Events",[])})

                }
                getListAtendedEvents()
                break;
            case "Users":
                const getListUsers=async () => {
                    zmienLoading(true)
                    await fetch("http://localhost:8080/api/uzytkownicy")
                        .then(res=>res.json())
                        .then(res=>{
                            // console.log(res)
                            setList("Users",res)
                        })
                        .catch(err=>console.log(err))
                        .finally(zmienLoading(false))
                }
                getListUsers()
                break;
            case "Gained Achivements" :
                if(!achivementUserId)
                    setAchivementUserId(user.id)
                const getAchievedListSprawnosci=async () => {
                    zmienLoading(true)
                    await fetch(`http://localhost:8080/api/uzytkownicy/${achivementUserId}/sprawnosci`)
                        .then(res=>res.json())
                        .then(res=>{
                 //             console.log(res)
                            setList("Sprawnosci",res)
                        })
                        .catch(err=>{console.log(err);setSprawnosci([])})
                        .finally(()=>{zmienLoading(false)})
                }
                getAchievedListSprawnosci()
                break;
        }
    }
    const setList=(list,data)=>{

        switch(list){
            case "User":
                setUser(data)
                break;
            case "Users":
                setUsers(data)
                break;
            case "Events":
                setEvents(data)
                break;
            case "globalInfo":
                setGlobalInfo(data)
                break;
            case "Sprawnosci":
                setSprawnosci(data)
                break;
            case "User Achivement":
                setAchivementUserId(data)

                break;
            default:
                console.log(list)
        }
    }
    const onPokazywanieChange=(cat,userId=1)=>{
        zmienEdycje(null)
        // console.log(cat)
        // console.log(cat)

        if(cat==="User") {///User...33 wszystkie usery=>1user
            console.log("qwer")
            setPokazywanie(cat)
        }
        else if(cat.target.value==="LogOut")
        {
            setUser(null)

            setPokazywanie("GlobalInfo")
        }
        else {
            // console.log(cat.target.value)
            setPokazywanie(cat.target.value)
            if (cat.target.value === "User")
                zmienPokazywanegoUsera(user.id)
        }
        // console.log(pokazywanie)
    }
    const zmienPokazywanegoUsera=id=>{
        setPokazywanieUsera(id)
    }
    const addDoListy= async (value,type)=>{
        console.log(value)
        switch (type){
            case "GlobalInformation":
                setGlobalInfo([...globalInfo,value]);
                break;
            case "Event":
              //  setEvents([...events,value]);
                await fetch("http://localhost:8080/api/wydarzenia",

                    {
                        method: "POST",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "Kwota":
                console.log(value)
                await fetch(`http://localhost:8080/api/uzytkownicy/${value.uzytkownikId}/skladki`,

                    {
                        method: "POST",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "Sprawnosc":
                await fetch("http://localhost:8080/api/sprawnosci",
                    {
                        method: "POST",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "newUserAttend":
                await fetch(`http://localhost:8080/api/uzytkownicy/${user.id}/wydarzenia/${value.id}?present=false`,
                    {
                        method: "POST",
                    })
                    .then(r=>console.log("udalo"))
                    .catch(err => console.log(err))
                break;
            case "newUserAchivement":
                await fetch(`http://localhost:8080/api/uzytkownicy/${value.userId}/sprawnosci/${value.sprawnoscId}?date=${value.date}`,
                    {
                        method: "POST",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                    .finally(() => {
                        onPokazywanieChange({target:{value:"Users"}})
                        setAchivementUserId(null)
                    });

                break;
            case "User":
                // setUsers([...users,value]);
                console.log(JSON.stringify(value));
                // await fetch("http://localhost:8081/api/uzytkownicy/add/zuch",
                await fetch("http://localhost:8080/signup",

                    {
                        method: "POST",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            default:
                alert(type)
        }
    }
    const editFromList=async (value,type)=>{
        let newValues
        switch (type){
            case "GlobalInformation":
                newValues=globalInfo.map(g=>g.id===value.id?value:g)
                setGlobalInfo(newValues);
                break;
            case "Event":
    //            console.log(value)
                await fetch(`http://localhost:8080/api/wydarzenia/${value.id}`,

                    {
                        method: "PUT",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "Kwota":
                await fetch(`http://localhost:8080/api/uzytkownicy/skladki/${value.id}`,

                    {
                        method: "PUT",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "Sprawnosc":
                await fetch(`http://localhost:8080/api/sprawnosci/${value.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            case "User":
                await fetch(`http://localhost:8080/api/uzytkownicy/${value.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(value),
                        headers: {"Content-Type": "application/json"}
                    })
                    .then(res => res.json())
                    .then(r=>console.log(r))
                    .catch(err => console.log(err))
                break;
            default:
                alert(type)
        }
    }
    const deleteFromList=async (id,type)=>{
        console.log(id)
        switch (type){
            case "GlobalInformation":
                setGlobalInfo(globalInfo.filter(clas=>clas.id!==id));
                break;
            case "Event":
                // setEvents(events.filter(clas=>clas.id!==id));

                await fetch(`http://localhost:8080/api/wydarzenia/${id}`,
                    {
                        method: "DELETE",
                    })
                    .then(()=>console.log("deleted"))
                    //.then(r=>console.log(r))
                    .catch(err => console.log(err))
                    .finally(() =>getFromList("Events"));
                break;
                case "Kwota":
                    await fetch(`http://localhost:8080/api/uzytkownicy/skladki/${id}`,
                        {
                            method: "DELETE",
                        })
                        .then(()=>console.log("deleted"))
                        .catch(err => console.log(err))
                        .finally(() =>getFromList("Platnosci"));
                    break;
            case "Sprawnosc":
                await fetch(`http://localhost:8080/api/sprawnosci/${id}`,
                    {
                        method: "DELETE",
                    })
                    .then(()=>console.log("deleted"))
                    .catch(err => console.log(err))
                    .finally(() =>getFromList("Sprawnosci"));

                break;
            case "notAttend":
                await fetch(`http://localhost:8080/api/uzytkownicy/${user.id}/wydarzenia/${id}`,
                    {
                        method: "DELETE",
                    })
                    .then(r=>console.log("udalo"))
                    .catch(err => console.log(err))
                    .finally(() =>getFromList("Events"));

                break;
            case "User":
                await fetch(`http://localhost:8080/api/uzytkownicy/${id}`,
                    {
                        method: "DELETE",
                    })
                    .then(()=>console.log("deleted"))
                    //.then(r=>console.log(r))
                    .catch(err => console.log(err))
                    .finally(() =>getFromList("Users"));

                break;
            case "Gained Achivement":
                await fetch(`http://localhost:8080/api/uzytkownicy/${achivementUserId}/sprawnosci/${id}`,
                    {
                        method: "DELETE",
                    })
                    .then(()=>console.log("deleted"))
                    //.then(r=>console.log(r))
                    .catch(err => console.log(err))
                    .finally(() =>getFromList("Gained Achivements"));

                break;
            default:
                alert(type)
        }
    }

    return (
        <GlobalContext.Provider value={{addDoListy,deleteFromList, events ,pokazywanie,onPokazywanieChange
            ,globalInfo,pokazywanieUsera,users,zmienPokazywanegoUsera,
            setPokazywanie,sprawnosci,achivementUserId,
            kwoty,user,setUser,logIn,zmienEdycje,edit,editFromList,setList,zmienLoading,loading,getFromList}}>
            {children}
        </GlobalContext.Provider>
    );
}

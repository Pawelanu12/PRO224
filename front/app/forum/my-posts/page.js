'use client'

import Navigation from "@/app/forum/Navigation";
import Posts from "@/app/forum/Posts";

export default function MOJEPOSTY()
{
    return(
        <div>
            <Navigation/>
            <div className={"md:pl-[250px] mt-20 md:mt-0  "}>
                <Posts wszystkie={false}/>
            </div>
            </div>

            )
            }
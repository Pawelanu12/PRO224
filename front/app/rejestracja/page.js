'use client'

import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function REJESTRACJA(){

    return <div>
        <NAVBARUNREGISTED/>
        <div className={'forma'}>
            <div>
                EMAIL*
                <label><input style={{width: "230px"}} type={'text'}/></label>
                <br/>
                PASSWORD*
                <label><input style={{width: "230px"}} type={'password'}/></label>
                <br/>
                PASSWORD*
                <label><input style={{width: "230px"}} type={'password'}/></label>
                <br/>
                <button> ZAREJESTRUJ</button>
            </div>
        </div>
    </div>
}
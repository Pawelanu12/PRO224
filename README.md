GlobalInformation.js

'use client'

export default function GlobalInformation({globalInfo}) {
    console.log(globalInfo)
    console.log(globalInfo.text)
    const date=globalInfo.date
    return(
        <div style={{margin: '10%'}}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: "yellow"
            }}>
                <h1>{globalInfo.id}</h1>
                <h1>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</h1>
            </div>
            <div style={{
                width: '100%',
               backgroundColor: 'red',
            }}>

            <text >{globalInfo.text}</text>
            </div>
        </div>
    )
}




page.js

import GlobalInformation from "@/app/Wyswetl/GlobalInformation";


export default function Home() {
console.log("cat")
  const globalInfo={
    id:1,
    date:new Date(),
    text:"fafsfdgmsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddqqqqqqqqqqqqqqqqqqqqqxxxxxxxxdvvvvokmgflgnlskmosfmvlsdafffffffffffffffffffffffffffffffffffffffffffffffffffffksvosmvl;vmvmdpv"
  }
  return (

      <div>
      <p>new</p>
        <GlobalInformation globalInfo={globalInfo}></GlobalInformation>
      </div>
  );
}

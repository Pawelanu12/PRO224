
'use client'

export default function GlobalInformation({globalInfo}) {

    const date=new Date(globalInfo.date)
    const data=`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return(
        <div style={{marginLeft: '10%',marginRight:'10%'}}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: "yellow"
            }}>
                <p>{globalInfo.id}</p>
                <p>{data}</p>
            </div>
            <div style={{width: '100%',
                height:'300px',
                overflow:"auto",
                overflowWrap:"break-word",
                backgroundColor: 'red',}}>
                <p >{globalInfo.text}</p>
            </div>
        </div>
    )
}
// style={{ overflow:"hidden auto"}}

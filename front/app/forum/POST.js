'use client'

export default function POST({post}){
    // const compare_dates=(data_posta)=>{
    //     const date1=new Date(data_posta);
    //     const date2=new Date();
    //     if(date2.getFullYear()-date1.getFullYear()>1||
    //         (date2.getFullYear()-date1.getFullYear()===1&&date2.getMonth()>=date1.getMonth())){
    //         return date2.getFullYear()-date1.getFullYear()+"rok temu"
    //     }
    //     if(date2.getFullYear()-date1.getFullYear()===1&&date2.getMonth()<date1.getMonth()){
    //         return date2.getMonth()-date1.getMonth()+12+"miesiąc temu"
    //     }
    //     if(date2.getMonth()-date1.getMonth()>1||
    //         (date2.getMonth()-date1.getMonth()===1&&date2.getDay()>=date1.getDay())){
    //         return date2.getMonth()-date1.getMonth()+"miesiac temu temu"
    //     }
    //     if(date2.getMonth()-date1.getMonth()===1&&date2.getDay()<date1.getDay()){
    //         return date2.getMonth()-date1.getMonth()+12+"miesiąc temu"
    //     }
    //
    // }
    const compare_dates=(data_posta)=> {
        const date1 = new Date(data_posta);
        const date2 = new Date();
        const millis=date2.getTime()-date1.getTime();
        const dni=millis/(1000*60*60*24)|0;
        const godziny=millis/(1000*60*60)|0;
        if(dni>=1)
            return dni+ ' dni temu'
        if(dni===0&&godziny>0)
            return godziny+ ' godzin temu'
        return "mniej niż godzina temu"
    }
    return (
        <div style={{marginBottom:"30px"}}>
            <div className={'flexRow'}>
                <img src={post.ikona} alt="ikona" className={'ikona'} style={{margin:0}}/>
                <div>
                    <p>{post.autor}</p>
                    <p>{compare_dates(post.data)}</p>
                </div>
            </div>
            <p>{post.opis}</p>
            <img src={post.obraz} alt={"obraz"} width={"100%"}/>
            <div className={"flexRow"} style={{justifyContent: "space-around",marginTop:"10px", backgroundColor: "#3A4F39"}}>
                <div>
                    <p>ilosc polubeń {post.polubienia}</p>
                </div>
                <div>
                    <p>ilosc komentarzy {post.komentarze}</p>
                </div>
                <div>
                    <p>ilosc udostepnien {post.udostepnienia}</p>
                </div>
            </div>
        </div>
    )
}
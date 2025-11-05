
export const dateToString=(data)=>{
    return data.getHours()+':'+data.getMinutes()+' '+data.getDate()+'/'+ (data.getMonth()+1)+'/'+data.getFullYear()
}

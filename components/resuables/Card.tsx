import style from '../../styles/card.module.css'


interface CardProp{
    data:{
        caption:string
        number:number
    }[]
}

export const Card =({data}:CardProp)=>{

    return(
        <ul className={style.card}>
        {data.map(e=><Card_item caption={e.caption} number={e.number}/>)}
        </ul>
    )
}


interface CardItemProp{
    caption:string;
    number:number
}
export const Card_item=({caption,number}:CardItemProp)=>{

    return(
        <li className={style.li}>
        <span className={style.caption}>{caption}</span>
        <span className={style.num}>{number}</span>
        {/* <span>12% in the last hour</span> */}
        </li>
    )
}
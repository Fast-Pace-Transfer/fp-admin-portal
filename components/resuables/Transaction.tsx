/*
0.icon
1.title
2.amount
3.date
*/ 
import style from '../../styles/transaction.module.css'
import Image from 'next/image'
import { shimmer,toBase64 } from '../../utils'




export type TransactionsProp ={
    icon?:string
    title:string
    amount:number
    date:string
}

const Transactions =({icon,title,amount,date}:TransactionsProp)=>{
    return(
        <li className={style.li}>
            <div className={style.icon}>
                <Image src={icon} width="25" height="25" layout='fill' placeholder='blur' blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} />
            </div>
            <span>
                <div className={style.title}>{title}</div>
                <sub className={style.time}>{date}</sub>
            </span>
            <span className={style.amount}>
                {amount}
            </span>
        </li>
    )

}

export default Transactions
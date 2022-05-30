/*
0.icon
1.title
2.amount
3.date
*/ 
import Image from 'next/image'

type TransactionsProp ={
    icon?:string
    title:string
    amount:number
    date:string
}

const Transactions =({icon,title,amount,date}:TransactionsProp)=>{
    return(
        <li>
            <Image src={icon} />
            <span>

            </span>
            <span>
                {amount}
            </span>
        </li>
    )

}

export default Transactions
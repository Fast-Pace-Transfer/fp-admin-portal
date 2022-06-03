
import Transactions from "../resuables/Transaction"
import style from '../../styles/dashboard/history.module.css'


let list =[
    {
        icon:'/../../public/vercel.svg',
        title:'Account Credited by Fast Pace ….',
        time:'Wednesday 30th April',
        amount:3000
    },
    {
        icon:'/../../public/vercel.svg',
        title:'Account Credited by Fast Pace ….',
        time:'Wednesday 30th April',
        amount:30000
    },
    {
        icon:'/../../public/vercel.svg',
        title:'Account Credited by Flex LLC',
        time:'Wednesday 30th April',
        amount:20000
    }
]

const History=()=>{

    return(
        <section>
            <div className="row" style={{borderBottom:'2px solid #00000030'}}>
                <div className="container">
                    <span className={style.title}>
                        Transaction History
                    </span>
                </div>
                <div className="container">
                    <span className={style.time}>Today</span>
                    <span className={style.time}>This week</span>

                </div>
            </div>

            <ul className={style.transactions}>
                {list.map(tr=>{
                    return(
                        <Transactions icon={tr.icon} title={tr.title} date={tr.time} amount={tr.amount}/>
                    )
                })}
            </ul>
        </section>
    )
}

export default History

import { useState } from 'react'
import style from '../styles/exchange.module.css'
import Select from './resuables/Select'

let selects = [
    {
        value:'USD-GHS',
        title:'USD-GHS'
    },
    {
        value:'GMD-GHS',
        title:'GMD-GHS'
    },
    {
        value:'CAD-GHS',
        title:'CAD-GHS'
    }
]

const ExchangeRate =()=>{

    const [rate,setRate]=useState<string>('')

    return(
        <div className={style.card}>
            <div className='title'>Exchange Rate</div>
            <div>
                <Select color={{color:"#fff",backgroundColor:"#4953B2"}} value={rate} options={selects} onChange={(e)=>setRate(e.target.value)}/>
            </div>
            <div className='title'>GHS 174.9</div>
        </div>
    )
}

export default ExchangeRate
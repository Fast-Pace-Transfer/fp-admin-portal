import { Card } from "../resuables/Card"

let data =[{
    caption:"Daily Transactions",
    number:200
},
{
    caption:"Monthly Transactions",
    number:500
}
]

const Analytic =()=>{

    return(
        <>
        <Card data={data}/>
        </>
    )
}

export default Analytic
import { Card } from "../resuables/Card"

let data =[{
    caption:"Daily Transactions",
    number:200
},
{
    caption:"Weekly Transactions",
    number:500
},
{
    caption:"Monthy Transactions",
    number:1500
},
{
    caption:"Annual Transactions",
    number:2300
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
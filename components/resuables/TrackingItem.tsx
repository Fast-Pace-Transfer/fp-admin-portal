/*
0.Period
1.Quantity
2.additional info
*/ 

type TrackingProp={
period:string
quantity:number|string
additional_info?:{
    percent:string
    goingUp:boolean
    period:string
}
}

const Tracking =({period,quantity,additional_info}:TrackingProp)=>{
    return(
        <li>
            <span>{period}</span>
            <span>{quantity}</span>
            {/* <sub>{additional_info}</sub> */}
        </li>
    )
}

export default Tracking
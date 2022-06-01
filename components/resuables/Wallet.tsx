
/*
0.get title
1.Amount
2.style
3.optional object
*/ 
type WalletProp ={
    title:string
    amount:number
    style?:object
    extra?:object
}

const Wallet = ({extra,title,amount,style}:WalletProp)=>{
    return(
        <div className="wallet" style={style?style:{}}>
            <div className="wallet_main">
                <span className="title">{title}</span>
                <span className="amount">{amount}</span>
            </div>
            {/* Extra */}
            <div className="wallet_extra">
                <>{extra}</>
            </div>
        </div>
    )
}

export default Wallet
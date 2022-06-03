import styles from '../../styles/wallet.module.css'
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
        <div className={styles.wallet} style={style?style:{backgroundColor:'#4953B2'}}>
            <div className={styles.wallet_main}>
                <span className={styles.title}>{title}</span>
                <span className={styles.amount}>${amount.toFixed(1)}</span>
            </div>
            {/* Extra */}
            <div className={styles.wallet_extra}>
                <>{extra}</>
            </div>
        </div>
    )
}

export default Wallet
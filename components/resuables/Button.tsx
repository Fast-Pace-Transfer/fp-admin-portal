import styles from '../../styles/button.module.css'
type ButtonProps ={
    title:string,
    action?:()=>void
}

const Button =( { title,action }: ButtonProps )=>{
    return(
        <div>
            <button className={ styles.base_button } onClick={action}>
                {title}
            </button>
        </div>
    )
}

export default Button
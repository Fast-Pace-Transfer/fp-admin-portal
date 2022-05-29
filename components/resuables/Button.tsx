
type ButtonProps ={
    title:string,
    style?:object,
    action:()=>void
}

const Button =({title,style,action}:ButtonProps)=>{
    return(
        <div>
            <button style={style} onClick={action}>
                {title}
            </button>

        </div>
    )
}

export default Button
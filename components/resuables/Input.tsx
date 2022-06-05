import styles from '../../styles/input.module.css'
/*
0.get label title
1.get input state
2.placeholder
3.onchange function
*/ 
type InputProp={
    label?:string,
    onChange:(e)=>void,
    placeholder:string,
    state:string,
    type:string
    required:boolean
}

const Input =( { label,onChange,placeholder,state,type,required }: InputProp )=>{
    return (
        <div className={styles.input}>
            { label&&<label>{label}</label> }
          <input 
            type={ type }
            value={ state } 
            onChange={ onChange } 
            placeholder={ placeholder ? placeholder: 'Input field' }
            required={required}
          />   
        </div>
       
    )
}

export default Input
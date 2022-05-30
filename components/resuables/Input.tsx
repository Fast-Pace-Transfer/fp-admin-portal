
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
}

const Input =({label,onChange,placeholder,state,type}:InputProp)=>{
    return (
        <div className="input_field">
            {label&&<label>{label}</label>}
          <input 
          type={type}
          value={state} 
          onChange={onChange} 
          placeholder={placeholder?placeholder:'Input field'}/>   
        </div>
       
    )
}

export default Input
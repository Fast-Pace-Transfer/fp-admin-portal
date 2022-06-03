import style from '../../styles/select.module.css'

interface SelectProp{
    label?:string;
    options:{
        value:string|number;
        title:string
    }[];
    onChange:(e)=>void,
    value:string
    color?:{
        color?:string
        backgroundColor?:string
        boxShadow?:string
    }
}


const Select =({label,options,onChange,value,color}:SelectProp)=>{
    return(
        <>
        <label htmlFor="">{label}</label>
        <div className={style.select}>
        <select value={value} onChange={onChange} style={color&&color}>
        {options.map(opt=><option value={opt.value}>{opt.title}</option>)}
        </select>
        </div>
        
        </>
    )

}

export default Select
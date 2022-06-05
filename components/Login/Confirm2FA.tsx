import Input from '../resuables/Input'
import Button from '../resuables/Button'
import style from '../../styles/login.module.css'


interface Confirm2FAProps{
    action:()=>void
    state:string
    setState:(e)=>void
}

const Confirm2FA=({action,state,setState}:Confirm2FAProps)=>{

    return(
        <>
        <section className="login-section">
            <div className={style.form_fields}>
        <p style={{
            textAlign: "center",
            fontSize:"18px",
            fontWeight:"normal",
            letterSpacing: "0px",
            color: "#4D4F5C"
        }}>Verify 2FA</p>
        <Input type="text" placeholder="Enter 2fa Code" state={state} onChange={setState} label="2fa Code" required={true} />
            </div>
            <div className="for_action">
                <Button action={action} title="Verify"/>
            </div>
       
        
    
    </section>
        </>
    )

}

export default Confirm2FA
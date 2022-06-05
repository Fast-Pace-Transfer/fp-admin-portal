import Input from '../resuables/Input'
import Button from '../resuables/Button'


interface Confirm2FAProps{
    action:()=>boolean
    state:string
    setState:(e)=>void
}

const Confirm2FA=({action,state,setState}:Confirm2FAProps)=>{

    return(
        <>
        <section className="login-section">
        <p className="register-text">Verify 2FA</p>
        <Input type="text" placeholder="Enter 2fa Code" state={state} onChange={setState} label="2fa" required={true} />
        {/* {renderErrorMessage("2fa")} */}
        <Button action={action} title="Verify"/>
    
    </section>
        </>
    )

}

export default Confirm2FA
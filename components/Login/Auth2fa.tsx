
import Button from '../resuables/Button'
import style from '../../styles/login.module.css'



interface Auth2FAProps{
    QRcode:string;
    action:()=>void
}


const Auth2FA =({QRcode,action}:Auth2FAProps)=>{

    return(
        <>
        <section className="login-section">
    {/* <div class="login-container"> */}
    <div className={style.form_fields}>
      <h2>Set up your Authenticator</h2>
      <p className="qrcode_text">Set up your 2FA by scanning the barcode below. Alternatively you can use the code below</p>
      <p className={style.authentication_code}>QR122ST234DAAS</p> 
      <div className={style.qr_scan_image} >

      </div>
      </div>
      <p className="qrcode_info">You must set up your 2FA before you can continue</p>
      <div className={style.form_action}>
        <Button action={action} title="Complete Registration" />
      </div>
      
         
        {/* </div> */}
    </section>
        </>
    )
}

export default Auth2FA
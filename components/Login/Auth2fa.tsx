// import Input from '../resuables/Input'
import Button from '../resuables/Button'


interface Auth2FAProps{
    QRcode:string;
    action:()=>void
}


const Auth2FA =({QRcode,action}:Auth2FAProps)=>{

    return(
        <>
        <section className="login-section">
    {/* <div class="login-container"> */}
      <h2>Set up your Authenticator</h2>
      <p className="qrcode_text">Set up your 2FA by scanning the barcode below. Alternatively you can code use below</p>
      <p className="authentication-code">QR122ST234DAAS</p> 
      <div className="qr_scan_image" v-if="setup2FA" v-html="setup2FA.qr_image">

      </div>
      <p className="qrcode_info">You must set up your 2FA before you can continue</p>
      <Button action={action} title="Complete Registration" />
         
        {/* </div> */}
    </section>
        </>
    )
}

export default Auth2FA
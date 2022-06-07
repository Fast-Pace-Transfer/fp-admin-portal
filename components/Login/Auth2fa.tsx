
import Button from '../resuables/Button'
import style from '../../styles/login.module.css'
import { useEffect, useState } from 'react';





interface Auth2FAProps{
    QRcode:string;
    secret:string
    action:()=>void
}


const Auth2FA =({QRcode,action,secret}:Auth2FAProps)=>{

    return(
        <>
        <section className="login-section">
    {/* <div class="login-container"> */}
    <div className={style.form_fields}>
      <h2>Set up your Authenticator</h2>
      <p className="qrcode_text">Set up your 2FA by scanning the barcode below. Alternatively you can use the code below</p>
      <p className={style.authentication_code}>{secret}</p> 
      <div className={style.qr_scan_image} >
      <svg dangerouslySetInnerHTML={{__html: QRcode }} style={{width:'100%',height:'100%'}}/>
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
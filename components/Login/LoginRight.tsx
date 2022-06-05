import React from 'react'
// import image2 from './df.png'
// import image1 from './df3.png'
// import coinEUR from './coinEUR_S.png'
// import coinUSD from './coinUSD_S.png'


const imageblogright=(
  <div className='imageblogleft'>
        {/* <img className='image1' src={image1} alt="" />
        <img className='coinUSD' src={coinUSD} alt="" /> */}
     

    </div>
)

const imageblogleft=(
    <div className='imageblogright'>
    {/* <img className='image2' src={image2} alt="" />
        <img className='coinEUR' src={coinEUR} alt="" /> */}
     

</div>
   
)


function LoginRight(){
    return (
       <div className='LoginRight'>
      {imageblogright}
      {imageblogleft}
     
       </div>
    )
}
export default LoginRight;
import jwt from 'jsonwebtoken'
import { NextApiRequest,NextApiResponse } from 'next'
import cookie from 'js-cookie'

let isSessionValid:boolean =false

const KEY ="abdibidbadasdnbiq"
const Login=(req:NextApiRequest,res:NextApiResponse)=>{

  const auth:string=cookie.get("auth");
  const role:string=cookie.get("role");

//   decode tokens
if(auth!==null){//no authentication
isSessionValid=true

}




  res.statusCode=200;
  res.json({
    isSessionValid
  })
 
  
}
export default Login
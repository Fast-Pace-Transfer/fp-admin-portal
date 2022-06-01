import jwt from 'jsonwebtoken'
import { NextApiRequest,NextApiResponse } from 'next'
import cookie from 'js-cookie'

const KEY ="abdibidbadasdnbiq"
const Login=(req:NextApiRequest,res:NextApiResponse)=>{

  console.log('old token',cookie.get("auth"))
  if(!req.body){
    res.statusCode=404
    res.end('Error')
    return
  }

const {username,password}=req.body

  res.statusCode=200;
  res.json({
    token:jwt.sign({
      username,
      admin:username==="admin" && password==="admin"
    },KEY),
    profile:'/profilepicture.jpg',
    role:jwt.sign({
      role:"Admin"
    },KEY)
  })
 
  
}
export default Login
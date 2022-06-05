/*
0.get encryption and decryption
1.create context
2. create function for login and logout
*/ 

import { useState,useEffect,createContext,useCallback, useContext } from "react";
// import Cookie from 'js-cookie'
import Router from "next/router";
import Pages from '../utils/Routes'
const base_url = process.env.Host_BASE_URL

interface person{
    name:string,
    image:string,
    role:string,
    id:string
}
interface contextType{
    pages:{}[]|null
}

export const AuthContext = createContext({} as contextType)

const AuthContextProvider=({children})=>{


          let thisRole;
          const res = fetch(`${base_url}/api/auth/user`)

          res.then((data)=>{
            return data.json()
          }).then((res)=>{
            thisRole= res.role
          }).catch((error)=>{
            console.error(error)
          })


          const [role,setRole]=useState<string>(thisRole)
          const [pages,setPages]=useState<{}[]>([])

          useEffect(() => {
          
            
              setPages(Pages(role))
            
            
          }, [role]);

   
    return(
        <AuthContext.Provider value={{pages}}>
            {children}
        </AuthContext.Provider>
    )
}


// const useAuth=()=>{
//     return useContext(AuthContext)
// }





export default AuthContextProvider
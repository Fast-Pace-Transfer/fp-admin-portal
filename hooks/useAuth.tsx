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

          const [pages,setPages]=useState<{}[]>([])

          useEffect(() => {
          
            
              setPages(Pages())
            
            
          }, [pages]);

   
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
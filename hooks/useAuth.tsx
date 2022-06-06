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
    validRoutes?:string[]
}

export const AuthContext = createContext({} as contextType)





const AuthContextProvider=({children})=>{

          const [pages,setPages]=useState<{}[]>([])
          const [validRoutes,setValidRoutes]=useState<string[]>([])

          useEffect(() => {
          
            let page= Pages()
            let valid:string[]=[]
            for(let vr of page){
              vr.sub.map(root=>{
                console.log('route',root.route)
                valid.push(root.route)
              })
            }

            setPages(page)
            setValidRoutes(valid)
            
            
          }, [pages]);

   
    return(
        <AuthContext.Provider value={{pages,validRoutes}}>
            {children}
        </AuthContext.Provider>
    )
}


// const useAuth=()=>{
//     return useContext(AuthContext)
// }





export default AuthContextProvider
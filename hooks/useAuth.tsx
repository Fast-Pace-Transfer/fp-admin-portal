/*
0.get encryption and decryption
1.create context
2. create function for login and logout
*/ 

import { useState,useEffect,createContext,useCallback, useContext } from "react";
import Cookie from 'js-cookie'
import Router from "next/router";
import Pages from '../utils/Routes'

interface person{
    name:string,
    image:string,
    role:string,
    id:string
}
interface contextType {
    pages:{}[]|null
    isAuthed:boolean
    logout:any
}

export const AuthContext = createContext({} as contextType)


// login function
function useProvideAuth() {
    const cookie:boolean = Cookie.get("auth");
  
    const [isAuthed, setIsAuthed] = useState<boolean|number>(cookie);
    const [pages,setPages]=useState<{}[]>([])

    const logout =useCallback(()=>{
      Cookie.remove("auth")
      Cookie.remove("user")
      Cookie.remove("dp")
      Cookie.set("role","none")

      Router.push('/login')
    },[])
  console.log('from context',isAuthed)
    useEffect(() => {
      if (!isAuthed) {
        Router.push("/login");
        Cookie.remove("auth");
      } else {
          // console.log(Pages())

        setPages(Pages())
        setIsAuthed(true)
      }
    }, [isAuthed]);
  
    return { isAuthed,pages,logout };
  }





export const AuthContextProvider=({children})=>{
    
    const value:contextType = useProvideAuth();
    console.log('from provider',value)
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth=()=>{
    return useContext(AuthContext)
}

export default useAuth
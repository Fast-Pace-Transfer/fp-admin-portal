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
    pages:{}[]
    isAuthed:boolean
}

export const AuthContext = createContext({} as contextType)


// login function
function useProvideAuth() {
    const cookie:boolean = Cookie.get("auth");
  
    const [isAuthed, setIsAuthed] = useState<boolean>(cookie);
    const [pages,setPages]=useState<{}[]>([])
  
  console.log('from context',isAuthed)
    useEffect(() => {
      if (!isAuthed) {
        Router.push("/login");
        Cookie.remove("auth");
      } else {
          console.log(Pages())
        setPages(Pages())
        Cookie.set("auth", true);
        setIsAuthed(true)
      }
    }, [isAuthed]);
  
    return { isAuthed,pages };
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
/*
0.get encryption and decryption
1.create context
2. create function for login and logout
*/ 

import { useState,useEffect,createContext } from "react";
import {codeEncrypt,codeDecrypt} from '../utils'
import Cookie from 'js-cookie'

import Pages from '../utils/Routes'

interface person{
    name:string,
    image:string,
    role:string,
    id:string
}
interface contextType {
    pages:{}[]
    IsRouteAllowed:any
    userID:string
}

export const AuthContext = createContext({} as contextType)


// login function
export const HasLoggedIn=({name,image,role,id}:person)=>{
        // save user details to localstorage
       
       try{
           let details = {name,image}
           console.log(name,image,role,id)

        localStorage.setItem('user',JSON.stringify(details))

        // encrypt role and ID
        const encrptedID = codeEncrypt(id)
        // console.log(JSON.stringify(encrptedID))
        localStorage.setItem('userID',JSON.stringify(encrptedID));

        // encrypt role
        const encryptedRole = codeEncrypt(role);
        localStorage.setItem('userRole',JSON.stringify(encryptedRole));
       } 
       catch(error){
           throw error
       }
}

export const HasLoggedOut = ()=>{
    try{
        let props:string[]=['user','userID','userRole']

        for(let data of props){
            localStorage.removeItem(data)
        }

        return true

    }
    catch(error){
        throw error
    }
}






const AuthContextProvider=({children})=>{
    let user:{id:string,role:string} = {id:'',role:undefined}

    // let cookie = Cookie.get('userID')
    // const [isAuthed,setIsAuthed]=useState(cookie)
    const [userID,setUserID] = useState(user.id)
    const [userRole,setUserRole] = useState(user.role?user.role:'Admin')

    const [pages,setPages]=useState(()=>Pages(userRole))

        useEffect(()=>{
                if(JSON.parse(localStorage.getItem('userID'))){

                setUserID(codeDecrypt(JSON.parse(localStorage.getItem('userID'))));
                setUserRole(codeDecrypt(JSON.parse(localStorage.getItem('userRole'))));  
            }
            else{
                HasLoggedOut()
            }  
            
            setPages(Pages(userRole))


        },[userID])
       

    //check if current route is valid 
    const IsRouteAllowed =(rout)=>{
        let bigValid=[]

        for(let r of pages){
            bigValid = r.sub.map(rt=>rt.route)
        }

        if(bigValid.includes(rout)){
            return true
        }
        else{
            false
        }

        
    }

    const values:contextType={
        pages:pages,
        IsRouteAllowed:IsRouteAllowed,
        userID:userID
    }
    



    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
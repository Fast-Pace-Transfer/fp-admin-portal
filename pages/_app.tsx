import { useContext,useEffect, useState } from 'react'
import cookie from 'js-cookie'
import '../styles/globals.css'
import Layout from '../layout/Layout'
import SettingsLayout from '../layout/SettingsLayout'
import Router,{useRouter} from 'next/router'
import {AuthContextProvider} from '../hooks/useAuth'







function MyApp({ Component, pageProps }) {
  const settings =['/login'];
  
  const router = useRouter();
  const [isAuthed,setIsAuthed] = useState<boolean>(cookie.get('auth')==='true'?true:false)
 
  useEffect(()=>{
console.log('authenticatd',isAuthed);

    if(!isAuthed||undefined){
      
    if(!settings.includes(router.pathname)){
      Router.push('/login')
    }
    cookie.set("auth",false)
    setIsAuthed(false)
  }
  if(isAuthed){
    Router.push('/')
  }
  
  },[isAuthed])
  


  if(settings.includes(router.pathname)){
    return (
      <AuthContextProvider>
  <SettingsLayout>
    <Component {...pageProps} />
  </SettingsLayout>
      </AuthContextProvider>

  )
  }

 return (
   <AuthContextProvider>
     <Layout>
    <Component {...pageProps} />
  </Layout>
   </AuthContextProvider>
 
  )
  
}

export default MyApp

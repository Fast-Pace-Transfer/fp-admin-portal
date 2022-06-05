import { useContext,useEffect, useState } from 'react'
import '../styles/globals.css'
import Layout from '../layout/Layout'
import SettingsLayout from '../layout/SettingsLayout'
import Router,{useRouter} from 'next/router'
import AuthContextProvider from '../hooks/useAuth'







function MyApp({ Component, pageProps,loggedIn }) {
  const settings =['/login'];

  const router = useRouter();
 
 
  useEffect(()=>{

    
  
  },[])
  


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

import { useContext,useEffect } from 'react'

import '../styles/globals.css'
import Layout from '../layout/Layout'
import SettingsLayout from '../layout/SettingsLayout'
import {useRouter} from 'next/router'
import AuthContextProvider,{AuthContext,HasLoggedIn} from '../hooks/useAuth'

function MyApp({ Component, pageProps }) {
  const settings =['/login'];
  
  const router = useRouter();
  
  const {IsRouteAllowed,userID}= useContext(AuthContext)
  console.log('functioning',typeof IsRouteAllowed)

  

  useEffect(()=>{
    console.log('user',userID)
    HasLoggedIn({name:"Emmanuel",image:"/",role:"Admin",id:"123456789d"});
    // console.log(HasLoggedIn)
// const isIt = IsRouteAllowed(router.pathname)
// console.log('thisRoute',isIt)
    if(userID==null){
    if(!settings.includes(router.pathname)){
      router.push('/login')
    }
    else{
      router.push('/')
    }
  }

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

import { useContext,useEffect, useState } from 'react'
import cookie from 'js-cookie'
import '../styles/globals.css'
import Layout from '../layout/Layout'
import SettingsLayout from '../layout/SettingsLayout'
import Router,{useRouter} from 'next/router'
import {AuthContextProvider} from '../hooks/useAuth'
import Cookie from 'js-cookie'







function MyApp({ Component, pageProps,loggedIn }) {
  const settings =['/login'];
  
  console.log('check log',loggedIn)

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

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
 
  // const loggedIn = (await res.json()).isLoggedIn
  console.log('logged',Cookie.get('auth'))
  if(!Cookie.get("auth")){
  Router.push('/login')
  }
  else{
    Router.push('/')
  }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      loggedIn:Cookie.get('user')
    },
  }
}


export default MyApp

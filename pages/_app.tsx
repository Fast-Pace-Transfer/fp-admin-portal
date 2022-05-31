import '../styles/globals.css'
import Layout from '../layout/Layout'
import SettingsLayout from '../layout/SettingsLayout'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const settings:string[] =['/login']

  if(settings.includes(router.pathname)){
    return (
 <SettingsLayout>
    <Component {...pageProps} />
  </SettingsLayout>
  )
  }

 return (
 <Layout>
    <Component {...pageProps} />
  </Layout>
  )
  
}

export default MyApp

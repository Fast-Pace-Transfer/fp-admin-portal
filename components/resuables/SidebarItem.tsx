/*
0.get item name and link
1.import Link component from next
*/ 
import {useRouter} from 'next/router'
import style from '../../styles/sidebar.module.css'
export type SidebarItemProp ={
    icon:object,
    title:string,
    route:string
}

const SidebarItem =({icon,title,route}:SidebarItemProp)=>{

    const router = useRouter()


    const handleClick = (e)=>{
        e.preventDefault()
    router.push(route)
    }


    return(
        <div style={{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            marginTop:'5%'
        }}>
        <li className={router.pathname == route ? style.active : ""}>
        <a className="anchorTag" href={route} onClick={handleClick}>
        <>{icon} </> 
        <span>{title}</span>
        </a>
        </li>
        </div>
        
       
    )

}

export default SidebarItem